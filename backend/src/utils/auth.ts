import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/Config";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers;
  const autorization = headers.authorization;
  if (!autorization) return res.sendStatus(401);
  try {
    const accessToken = autorization.split(" ")[1];
    jwt.verify(accessToken, config.jwtSecret);
    next();
  } catch (error) {
    console.log("error", error);
    return res.sendStatus(401);
  }
};
