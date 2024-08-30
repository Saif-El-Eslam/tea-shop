import { DataTypes, Model, Sequelize } from "sequelize";
import { Tea } from "./Tea";
import { Order } from "./Order";

export class OrderItems extends Model {
  public id!: string;
  public order_id!: string;
  public tea_id!: string;
  public quantity!: number;
  public price_per_unit!: number;
  public total_price!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public static initialize(sequelize: Sequelize) {
    OrderItems.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        order_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: Order,
            key: "id",
          },
        },
        tea_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: Tea,
            key: "id",
          },
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price_per_unit: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        total_price: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "orderitems",
        timestamps: true,
      }
    );
  }

  public static associate() {
    OrderItems.belongsTo(Order, {
      foreignKey: "order_id",
      as: "orders",
      onDelete: "CASCADE",
    });
    OrderItems.belongsTo(Tea, {
      foreignKey: "tea_id",
      as: "teas",
      onDelete: "CASCADE",
    });
  }
}
