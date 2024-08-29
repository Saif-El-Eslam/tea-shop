import { body, check } from "express-validator";

const register: any[] = [
  body("name")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string"),
  check("phone_number")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("any")
    .withMessage("Phone number is invalid"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({
      min: 8,
    })
    .withMessage("Password must be at least 8 characters"),
  body("verify_password")
    .notEmpty()
    .withMessage("Verify password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      } else {
        return value;
      }
    })
    .withMessage("Passwords do not match"),
];

const login: any[] = [
  body("phone_number")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("any")
    .withMessage("Phone number is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
];

const logout: any[] = [];

export default {
  register,
  login,
  logout,
};
