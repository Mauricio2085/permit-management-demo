import type { Request, Response, NextFunction } from "express";

export const getProfileController = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
};
