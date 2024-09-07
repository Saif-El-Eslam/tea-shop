import { validationResult } from "express-validator";
import { register, login, logout } from "../services/userService";

const registerController = async (req: any, res: any) => {
  const validation_result = validationResult(req);
  if (!validation_result.isEmpty()) {
    return res.status(400).json({ errors: validation_result.array() });
  }

  const { name, phone_number, password, verify_password } = req.body;

  try {
    const user = await register({
      name,
      phone_number,
      password,
    });

    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(409).send({ error: error.message });
  }
};

const loginController = async (req: any, res: any) => {
  const validation_result = validationResult(req);
  if (!validation_result.isEmpty()) {
    return res.status(400).json({ errors: validation_result.array() });
  }

  const { phone_number, password } = req.body;

  try {
    const token = await login(phone_number, password);
    return res.status(200).json(token);
  } catch (error: any) {
    return res.status(500).send({ error: error.message });
  }
};

const logoutController = async (req: any, res: any) => {
  const { user } = req;

  try {
    await logout(user.id);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(500).send({ error: error.message });
  }
};

export default {
  registerController,
  loginController,
  logoutController,
};
