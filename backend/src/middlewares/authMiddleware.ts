import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserById } from "../services/userService";

dotenv.config();
const jwtSecret: string = process.env.JWT_SECRET || "secret";

export const authenticate = (req: any, res: any, next: any) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    getUserById(decoded.id)
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ message: "Unauthorized: User not found" });
        }
        req.user = user;
        next();
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  });
};
