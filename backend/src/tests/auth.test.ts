import { setupDatabase, teardownDatabase } from "./testSetup";
import request from "supertest";
import app from "../app";
import { User } from "../models/User";
import bcrypt from "bcrypt";

beforeAll(async () => {
  await setupDatabase();
}, 30000);

afterAll(async () => {
  await teardownDatabase();
});

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const toBeCreatedUser = {
      phone_number: "1234567890",
      password: "password123",
      verify_password: "password123",
      name: "John Doe",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(toBeCreatedUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", toBeCreatedUser.name);
    expect(response.body).toHaveProperty(
      "phone_number",
      toBeCreatedUser.phone_number
    );

    // ensure user is saved in the database
    const user = await User.findOne({
      where: { phone_number: toBeCreatedUser.phone_number },
    });
    expect(user).toBeTruthy();

    // ensure password is hashed
    expect(user?.password_hash).not.toBe(toBeCreatedUser.password);

    // ensure password is hashed correctly
    const password_match = await bcrypt.compare(
      toBeCreatedUser.password,
      user!.password_hash
    );
    expect(password_match).toBe(true);
  });

  it("should not register a new user with invalid data", async () => {
    const toBeCreatedUser = {
      phone_number: "1234567890",
      password: "password123",
      verify_password: "password123",
      name: "John Doe",
    };

    // missing phone_number
    const response1 = await request(app)
      .post("/api/auth/register")
      .send({ ...toBeCreatedUser, phone_number: "" });
    expect(response1.status).toBe(400);
    expect(response1.body).toHaveProperty("errors");

    // missing password
    const response2 = await request(app)
      .post("/api/auth/register")
      .send({ ...toBeCreatedUser, password: "" });
    expect(response2.status).toBe(400);
    expect(response2.body).toHaveProperty("errors");

    // missing name
    const response3 = await request(app)
      .post("/api/auth/register")
      .send({ ...toBeCreatedUser, name: "" });
    expect(response3.status).toBe(400);
    expect(response3.body).toHaveProperty("errors");

    // missing verify_password
    const response4 = await request(app)
      .post("/api/auth/register")
      .send({ ...toBeCreatedUser, verify_password: "" });
    expect(response4.status).toBe(400);
    expect(response4.body).toHaveProperty("errors");

    // invalid phone_number
    const response5 = await request(app)
      .post("/api/auth/register")
      .send({ ...toBeCreatedUser, phone_number: "123" });
    expect(response5.status).toBe(400);
    expect(response5.body).toHaveProperty("errors");

    // passwords do not match
    const response6 = await request(app)
      .post("/api/auth/register")
      .send({ ...toBeCreatedUser, verify_password: "password" });
    expect(response6.status).toBe(400);
    expect(response6.body).toHaveProperty("errors");

    // user already exists
    const response7 = await request(app)
      .post("/api/auth/register")
      .send(toBeCreatedUser);
    expect(response7.status).toBe(409);
  });

  it("should login a user", async () => {
    const toBeLoggedInUser = {
      phone_number: "987654321",
      password: "admin123",
    };

    const response = await request(app)
      .post("/api/auth/login")
      .send(toBeLoggedInUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");

    // ensure token is saved in the database
    const user = await User.findOne({
      where: { phone_number: toBeLoggedInUser.phone_number },
    });
    expect(user).toBeTruthy();
    expect(user?.token).toBe(response.body.token);
  });

  it("should not login a user with invalid data", async () => {
    const toBeLoggedInUser = {
      phone_number: "123456789",
      password: "user1234",
    };

    // missing phone_number
    const response1 = await request(app)
      .post("/api/auth/login")
      .send({ ...toBeLoggedInUser, phone_number: "" });
    expect(response1.status).toBe(400);
    expect(response1.body).toHaveProperty("errors");

    // missing password
    const response2 = await request(app)
      .post("/api/auth/login")
      .send({ ...toBeLoggedInUser, password: "" });
    expect(response2.status).toBe(400);
    expect(response2.body).toHaveProperty("errors");

    // invalid phone_number
    const response3 = await request(app)
      .post("/api/auth/login")
      .send({ ...toBeLoggedInUser, phone_number: "123" });
    expect(response3.status).toBe(400);
    expect(response3.body).toHaveProperty("errors");

    // incorrect credentials
    const response4 = await request(app)
      .post("/api/auth/login")
      .send({ ...toBeLoggedInUser, password: "invalid_password" });
    expect(response4.status).toBe(500);
    expect(response4.body).toHaveProperty("error");

    // user does not exist
    const response5 = await request(app)
      .post("/api/auth/login")
      .send({ ...toBeLoggedInUser, phone_number: "1234567980" });
    expect(response5.status).toBe(500);
    expect(response5.body).toHaveProperty("error");
  });

  it("should logout a user", async () => {
    const user = await User.findOne({ where: { phone_number: "123456789" } });

    const response = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${user?.token}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});

    // ensure token is removed from the database
    const updated = await User.findOne({
      where: { phone_number: "123456789" },
    });
    expect(updated?.token).toBeNull();
  });

  it("should not logout a user with invalid token", async () => {
    const response = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer invalid_token`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Unauthorized: Invalid token");

    // user not found
    const user = await User.findOne({ where: { phone_number: "987654321" } });
    await user?.destroy();
    const response2 = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${user?.token}`);
    expect(response2.status).toBe(401);
    expect(response2.body).toHaveProperty("error");
    expect(response2.body.error).toBe("Unauthorized: User not found");
  });

  it("should not logout a user without token", async () => {
    const response = await request(app).post("/api/auth/logout");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Unauthorized: No token provided");
  });
});
