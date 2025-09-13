import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import type { JwtPayload } from "../types/index.js";
import Boom from "@hapi/boom";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw Boom.unauthorized("Token not provided or wrong format");
  }

  const token = authHeader.split(" ")[1]!;

  if (!config.jwtSecret) {
    throw Boom.internal("JWT_SECRET is not defined in .env file");
  }

  try {
    const decoded = jwt.verify(
      token,
      config.jwtSecret
    ) as unknown as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    throw Boom.forbidden("Invalid or expired token");
  }
};
