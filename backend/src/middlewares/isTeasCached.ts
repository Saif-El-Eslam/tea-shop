import { Request, Response } from "express";
import redisClient from "../config/redis";

export const isTeasCached = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const data = await redisClient.get("teas");

    if (data) {
      return res.status(200).json(JSON.parse(data));
    }

    next();
  } catch (err) {
    console.error("Error checking Redis cache", err);
    next();
  }
};

export const isTeaInCash = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const { id } = req.params;
    const data = await redisClient.get(`teas`);

    if (data) {
      const teas = JSON.parse(data);
      const tea = teas.find((t: any) => t.id === id);

      if (tea) {
        return res.status(200).json(tea);
      }
    }

    next();
  } catch (err) {
    console.error("Error checking Redis cache", err);
    next();
  }
};
