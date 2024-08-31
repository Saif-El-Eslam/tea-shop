import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import authRoutes from "../controllers/authController";
import authValidation from "../validations/authValidations";

const router = express.Router();

router.post(
  "/register",
  authValidation.register,
  authRoutes.registerController
);
router.post("/login", authValidation.login, authRoutes.loginController);
router.post("/logout", authenticate, authRoutes.logoutController);

export default router;
