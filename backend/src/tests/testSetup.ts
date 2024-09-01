import { Sequelize } from "sequelize";
import { User } from "../models/User";
import { Tea } from "../models/Tea";
import { Order } from "../models/Order";
import { OrderItems } from "../models/OrderItems";
import dotenv from "dotenv";

dotenv.config();
let sequelize: Sequelize;

export const setupDatabase = async () => {
  sequelize = new Sequelize(process.env.TEST_DATABASE_URL!, {
    dialect: "postgres",
    logging: false,
  });

  // Initialize models
  User.initialize(sequelize);
  Tea.initialize(sequelize);
  Order.initialize(sequelize);
  OrderItems.initialize(sequelize);

  // Establish associations
  User.associate();
  Tea.associate();
  Order.associate();
  OrderItems.associate();

  await User.create({
    id: "ffe3260f-9c36-49b4-84bc-b03408704138",
    name: "user",
    phone_number: "123456789",
    password_hash:
      "$2b$10$XAAkdlpTwqsaFaVHTsKn6uAkEGfCB1vEtm9niiUIf4CVHF1vkm.De",
    role: "user",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmZTMyNjBmLTljMzYtNDliNC04NGJjLWIwMzQwODcwNDEzOCIsInBob25lX251bWJlciI6IjEyMzQ1Njc4OSIsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiZGVmYXVsdCJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6ImZmZTMyNjBmLTljMzYtNDliNC04NGJjLWIwMzQwODcwNDEzOCJ9LCJpYXQiOjE3MjUxNjU2MjR9.T_QntBov-XI0gSjXwkheR_FDjv3sEfHoS4k0JkVy8I0",
  });

  await User.create({
    id: "ef8894f0-c4ac-42dc-821d-cbd51fce8f20",
    name: "admin",
    phone_number: "987654321",
    password_hash:
      "$2b$10$ZStv0Wf.Mv87OjsIBzEOkOr/yBaw2TJQrHMmfDjmPG.4qPFtT6QN6",
    role: "admin",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVmODg5NGYwLWM0YWMtNDJkYy04MjFkLWNiZDUxZmNlOGYyMCIsInBob25lX251bWJlciI6Ijk4NzY1NDMyMSIsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJhZG1pbiIsImRlZmF1bHQiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiYWRtaW4iLCJ4LWhhc3VyYS11c2VyLWlkIjoiZWY4ODk0ZjAtYzRhYy00MmRjLTgyMWQtY2JkNTFmY2U4ZjIwIn0sImlhdCI6MTcyNTE2NTY4MX0.o4ZAbj78RbFc5Ck1ixUlUSQbUBf4HsvdOpWlzRYYNyg",
  });

  await sequelize.sync();
};

export const teardownDatabase = async () => {
  await User.destroy({ where: {} });
  await Tea.destroy({ where: {} });
  await Order.destroy({ where: {} });
  await OrderItems.destroy({ where: {} });
  await sequelize.close();
};
