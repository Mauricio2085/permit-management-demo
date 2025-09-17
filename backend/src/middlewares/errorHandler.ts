import type { Request, Response, NextFunction } from "express";
import Boom from "@hapi/boom";

// Boom errors
export const boomErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};

// Handler server general errors
export const generalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({
    statusCode: 500,
    error: "Internal Server Error",
    message: "Something went wrong on the server.",
  });
};

// Handler 404 errors (Not Found)
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = Boom.notFound("Route not found");
  next(error);
};
