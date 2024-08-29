// src/models/Tea.ts
import { DataTypes, Model, Sequelize } from "sequelize";
import { Order } from "./Order";
import { User } from "./User";

export class Tea extends Model {
  public id!: string;
  public name!: string;
  public type!: string;
  public price_per_unit!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public static initialize(sequelize: Sequelize) {
    Tea.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: User,
            key: "id",
          },
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM("Green", "Black", "Herbal", "Oolong", "White"),
          allowNull: false,
        },
        price_per_unit: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        total_quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: "teas",
        timestamps: true,
        indexes: [
          {
            unique: true,
            fields: ["user_id", "type"],
          },
        ],
      }
    );
  }

  public static associate() {
    Tea.hasMany(Order, {
      foreignKey: "tea_id",
      as: "orders",
      onDelete: "CASCADE",
    });

    Tea.belongsTo(User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });
  }
}
