import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdminMiddleware";
import teaRoutes from "../controllers/teaController";
import teaValidation from "../validations/teaValidations";

const router = express.Router();

router.get(
  "/",
  authenticate,
  teaValidation.getTeas,
  teaRoutes.getTeasController
);
router.get(
  "/:id",
  authenticate,
  teaValidation.getTeaById,
  teaRoutes.getTeaByIdController
);
router.post(
  "/",
  authenticate,
  isAdmin,
  teaValidation.createTea,
  teaRoutes.createTeaController
);
router.put(
  "/:id",
  authenticate,
  isAdmin,
  teaValidation.updateTea,
  teaRoutes.updateTeaController
);
router.delete(
  "/:id",
  authenticate,
  isAdmin,
  teaValidation.deleteTea,
  teaRoutes.deleteTeaController
);

export default router;
