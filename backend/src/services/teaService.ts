import { Tea } from "../models/Tea";
import redisClient from "../config/redis";

const getTeas = async () => {
  const teas = await Tea.findAll();

  await redisClient.set("teas", JSON.stringify(teas));

  return teas;
};

const getTeaById = async (id: string) => {
  const tea = await Tea.findByPk(id);

  if (!tea) {
    throw new Error("Tea not found");
  }

  return tea;
};

const createTea = async ({
  name,
  description,
  price_per_unit,
  quantity,
}: {
  name: string;
  description: string;
  price_per_unit: number;
  quantity: number;
}) => {
  const newTea = await Tea.create({
    name,
    type: name,
    description,
    price_per_unit,
    quantity,
  });

  await redisClient.del("teas");

  return newTea;
};

const updateTea = async ({
  id,
  name,
  description,
  price_per_unit,
  quantity,
}: {
  id: string;
  name: string;
  description: string;
  price_per_unit: number;
  quantity: number;
}) => {
  const [rowsUpdated, [updatedTea]] = await Tea.update(
    { name, description, price_per_unit, quantity, type: name },
    { where: { id }, returning: true }
  );

  if (rowsUpdated < 1) {
    throw new Error("Tea not found");
  }

  await redisClient.del("teas");

  return updatedTea;
};

const deleteTea = async (id: string) => {
  const deletedTea = await Tea.destroy({ where: { id } });

  if (deletedTea < 1) {
    throw new Error("Tea not found");
  }

  await redisClient.del("teas");

  return deletedTea;
};

export { getTeas, getTeaById, createTea, updateTea, deleteTea };
