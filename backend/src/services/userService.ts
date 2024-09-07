import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwt_secret = process.env.JWT_SECRET as string;

export const register = async ({
  phone_number,
  password,
  name,
}: {
  phone_number: string;
  password: string;
  name: string;
}) => {
  const existingUser = await getUserByPhoneNumber(phone_number);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const password_hash: string = await bcrypt.hash(password, 10);

  const newUser: any = await createUser({
    name,
    phone_number,
    password_hash,
  });

  return {
    id: newUser.id,
    name: newUser.name,
    phone_number: newUser.phone_number,
  };
};

export const login = async (phone_number: string, password: string) => {
  const user: any = await getUserByPhoneNumber(phone_number);
  if (!user) {
    throw new Error("Incorrect credentials");
  }

  const password_match = await bcrypt.compare(password, user.password_hash);
  if (!password_match) {
    throw new Error("Incorrect credentials");
  }
  const token = jwt.sign(
    {
      id: user.id,
      phone_number,
      role: user.role,
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": [user.role, "default"],
        "x-hasura-default-role": user.role,
        "x-hasura-user-id": user.id,
      },
    },
    jwt_secret,
    {
      //   expiresIn: "1h",
    }
  );

  await updateUser(user.id, { token });
  return {
    token,
    role: user.role,
  };
};

export const logout = async (id: string) => {
  await updateUser(id, { token: null })
    .then(() => {
      return true;
    })
    .catch((error: any) => {
      throw new Error(error.message);
    });
};

const createUser = async (user: any) => {
  try {
    const newUser = new User(user);
    return await User.create(user);
  } catch (error) {
    return error;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    return error;
  }
};

const getUserByPhoneNumber = async (phone_number: string) => {
  try {
    return await User.findOne({ where: { phone_number } });
  } catch (error) {
    return error;
  }
};

const updateUser = async (id: string, user: any) => {
  try {
    return await User.update(user, { where: { id } });
  } catch (error) {
    return error;
  }
};

const deleteUser = async (id: string) => {
  try {
    return await User.destroy({ where: { id } });
  } catch (error) {
    return error;
  }
};
