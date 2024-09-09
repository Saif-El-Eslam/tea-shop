import { Tea } from "../models/Tea";

const getTeas = async () => {
  const teas = await Tea.findAll();
  return teas;
};

const getTeaById = async (id: string) => {
  const tea = await Tea.findByPk(id);
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

  return updatedTea;
};

const deleteTea = async (id: string) => {
  const deletedTea = await Tea.destroy({ where: { id } });

  if (deletedTea < 1) {
    throw new Error("Tea not found");
  }

  return deletedTea;
};

export { getTeas, getTeaById, createTea, updateTea, deleteTea };
