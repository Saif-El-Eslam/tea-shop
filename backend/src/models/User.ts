// src/models/User.ts
import { DataTypes, Model, Sequelize } from "sequelize";
import { Tea } from "./Tea";
import { Order } from "./Order";

export class User extends Model {
  public id!: string;
  public phone_number!: string;
  public password_hash!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone_number: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        password_hash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "users",
        timestamps: true,
        // schema: "public",
        indexes: [
          {
            unique: true,
            fields: ["phone_number"],
          },
        ],
      }
    );
  }

  public static associate() {
    User.hasMany(Order, {
      foreignKey: "user_id",
      as: "orders",
      onDelete: "CASCADE",
    });

    User.hasMany(Tea, {
      foreignKey: "user_id",
      as: "teas",
      onDelete: "CASCADE",
    });
  }
}
