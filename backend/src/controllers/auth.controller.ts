import type { Request, Response, NextFunction } from "express";
import { authenticateUser } from "../services/auth.service.js";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const result = await authenticateUser(email, password);
    res.json({
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};
