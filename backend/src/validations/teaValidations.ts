import { body, param, check } from "express-validator";

const createTea: any[] = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),
  body("price_per_unit")
    .notEmpty()
    .withMessage("Price per unit is required")
    .isNumeric()
    .withMessage("Price per unit must be a number"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt()
    .withMessage("Quantity must be an integer"),
];

const getTeas: any[] = [];

const getTeaById: any[] = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isString()
    .withMessage("ID must be a string"),
];

const updateTea: any[] = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isString()
    .withMessage("ID must be a string"),
  body("name").optional().isString().withMessage("Name must be a string"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("price_per_unit")
    .optional()
    .isNumeric()
    .withMessage("Price per unit must be a number"),
  body("quantity")
    .optional()
    .isInt()
    .withMessage("Quantity must be an integer"),
];

const deleteTea: any[] = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isString()
    .withMessage("ID must be a string"),
];

export default {
  createTea,
  getTeas,
  getTeaById,
  updateTea,
  deleteTea,
};
