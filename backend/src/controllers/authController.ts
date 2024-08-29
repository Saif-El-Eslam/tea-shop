import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import {
  createUser,
  getUserByPhoneNumber,
  getUserById,
  updateUser,
} from "../services/userService";
import dotenv from "dotenv";

dotenv.config();

const jwt_secret = process.env.JWT_SECRET || "secret";

const register = async (req: any, res: any) => {
  const validation_result = validationResult(req);
  if (!validation_result.isEmpty()) {
    return res.status(400).json({ errors: validation_result.array() });
  }

  const { name, phone_number, password, verify_password } = req.body;

  const existingUser = await getUserByPhoneNumber(phone_number);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const password_hash = await bcrypt.hash(password, 10);

  createUser({
    name,
    phone_number,
    password_hash,
  })
    .then((user) => {
      return res.status(201).json(user);
    })
    .catch((error) => {
      return res.send(error.message).status(500);
    });
};

const login = async (req: any, res: any) => {
  const validation_result = validationResult(req);
  if (!validation_result.isEmpty()) {
    return res.status(400).json({ errors: validation_result.array() });
  }

  const { phone_number, password } = req.body;

  const user: any = await getUserByPhoneNumber(phone_number);
  if (!user) {
    return res.status(404).json({ message: "Incorrect credentials" });
  }

  const password_match = await bcrypt.compare(password, user.password_hash);
  if (!password_match) {
    return res.status(401).json({ message: "Incorrect credentials" });
  }

  const token = jwt.sign({ id: user.id, phone_number }, jwt_secret, {
    //   expiresIn: "1h",
  });

  updateUser(user.id, { token })
    .then(() => {
      return res.status(200).json({ token });
    })
    .catch((error) => {
      return res.status(500).send(error.message);
    });
};

const logout = async (req: any, res: any) => {
  const { user } = req;

  updateUser(user.id, { token: null })
    .then(() => {
      return res.status(204).send();
    })
    .catch((error) => {
      return res.status(500).send(error.message);
    });
};

export default {
  register,
  login,
  logout,
};
