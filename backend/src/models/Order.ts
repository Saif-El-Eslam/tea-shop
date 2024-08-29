// src/models/Order.ts
import { DataTypes, Model, Sequelize } from "sequelize";
import { Tea } from "./Tea";
import { User } from "./User";

export class Order extends Model {
  public id!: string;
  public tea_id!: string;
  public user_id!: string;
  public quantity!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public static initialize(sequelize: Sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        tea_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: Tea,
            key: "id",
          },
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: User,
            key: "id",
          },
        },
        action: {
          type: DataTypes.ENUM("add", "subtract"),
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "orders",
        timestamps: true,
      }
    );
  }

  public static associate() {
    Order.belongsTo(Tea, {
      foreignKey: "tea_id",
      as: "tea",
    });
    Order.belongsTo(User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}
