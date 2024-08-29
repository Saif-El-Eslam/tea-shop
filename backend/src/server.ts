import app from "./app";
import dotenv from "dotenv";
import sequelize from "./config/database";
import { User } from "./models/User";
import { Tea } from "./models/Tea";
import { Order } from "./models/Order";

dotenv.config();

const port = process.env.PORT || 5000;

const startServer = () => {
  // Initialize models
  User.initialize(sequelize);
  Tea.initialize(sequelize);
  Order.initialize(sequelize);

  // Establish associations
  //   User.associate();
  //   Tea.associate();
  //   Order.associate();

  sequelize
    .sync()
    .then(() => {
      console.log("Database connected");

      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
};

startServer();
