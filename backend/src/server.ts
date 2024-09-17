import app from "./app";
import dotenv from "dotenv";
import sequelize from "./config/database";
import redisClient from "./config/redis";
import { User } from "./models/User";
import { Tea } from "./models/Tea";
import { Order } from "./models/Order";
import { OrderItems } from "./models/OrderItems";

dotenv.config();

const port = process.env.PORT || 5000;

const startServer = async () => {
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

  await redisClient.connect();

  try {
    await sequelize.sync();
    console.log("Database connected");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
