import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./User";
import { OrderItems } from "./OrderItems";

export class Order extends Model {
  public id!: string;
  public user_id!: string;
  public total_price!: number;
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
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: User,
            key: "id",
          },
        },
        total_price: {
          type: DataTypes.DECIMAL,
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
    Order.belongsTo(User, {
      foreignKey: "user_id",
      as: "users",
      onDelete: "CASCADE",
    });
  }
}
