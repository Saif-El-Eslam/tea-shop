import { DataTypes, Model, Sequelize } from "sequelize";
import { Order } from "./Order";
import { OrderItems } from "./OrderItems";
import { User } from "./User";

export class Tea extends Model {
  public id!: string;
  public name!: string;
  public type!: string;
  public description!: string;
  public price_per_unit!: number;
  public total_quantity!: number;
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
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM("Green", "Black", "Herbal", "Oolong", "White"),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        price_per_unit: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        quantity: {
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
            fields: ["type"],
          },
        ],
      }
    );
  }

  public static associate() {}
}
