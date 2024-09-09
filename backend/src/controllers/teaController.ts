import { validationResult } from "express-validator";
import {
  createTea,
  getTeas,
  getTeaById,
  updateTea,
  deleteTea,
} from "../services/teaService";

const getTeasController = async (req: any, res: any) => {
  try {
    const teas = await getTeas();
    return res.status(200).json(teas);
  } catch (error: any) {
    return res.status(500).send({ error: error.message });
  }
};

const getTeaByIdController = async (req: any, res: any) => {
  const validation_result = validationResult(req);
  if (!validation_result.isEmpty()) {
    return res.status(400).json({ errors: validation_result.array() });
  }

  const { id } = req.params;
  try {
    const tea = await getTeaById(id);
    return res.status(200).json(tea);
  } catch (error: any) {
    return res.status(500).send({ error: error.message });
  }
};

const createTeaController = async (req: any, res: any) => {
  const validation_result = validationResult(req);
  if (!validation_result.isEmpty()) {
    return res.status(400).json({ errors: validation_result.array() });
  }

  const { name, description, price_per_unit, quantity, user_id } = req.body;

  try {
    const newTea = await createTea({
      name,
      description,
      price_per_unit,
      quantity,
    });

    return res.status(201).json(newTea);
  } catch (error: any) {
    return res.status(409).send({ error: error.message });
  }
};

const updateTeaController = async (req: any, res: any) => {
  const validation_result = validationResult(req);
  if (!validation_result.isEmpty()) {
    return res.status(400).json({ errors: validation_result.array() });
  }

  const { name, description, price_per_unit, quantity } = req.body;
  const { id } = req.params;

  try {
    const updatedTea = await updateTea({
      id,
      name,
      description,
      price_per_unit,
      quantity,
    });

    return res.status(200).json(updatedTea);
  } catch (error: any) {
    return res.status(409).send({ error: error.message });
  }
};

const deleteTeaController = async (req: any, res: any) => {
  const validation_result = validationResult(req);
  if (!validation_result.isEmpty()) {
    return res.status(400).json({ errors: validation_result.array() });
  }

  const { id } = req.params;

  try {
    await deleteTea(id);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(500).send({ error: error.message });
  }
};

export default {
  getTeasController,
  getTeaByIdController,
  createTeaController,
  updateTeaController,
  deleteTeaController,
};
