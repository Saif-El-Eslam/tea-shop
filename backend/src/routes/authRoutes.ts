import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import authRoutes from "../controllers/authController";
import authValidation from "../validations/authValidations";

const router = express.Router();

router.post("/register", authValidation.register, authRoutes.register);
router.post("/login", authValidation.login, authRoutes.login);
router.post("/logout", authenticate, authRoutes.logout);

export default router;
