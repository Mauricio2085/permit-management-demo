import type { Request, Response, NextFunction } from "express";
import Boom from "@hapi/boom";

// Middleware para manejar errores de Boom
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
    next(err); // Pasa el error a la siguiente capa si no es un error de Boom
  }
};

// Middleware para manejar errores generales del servidor
export const generalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Imprime el error para depuración
  res.status(500).json({
    statusCode: 500,
    error: "Internal Server Error",
    message: "Something went wrong on the server.",
  });
};

// Middleware para manejar errores 404 (Not Found)
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = Boom.notFound("Route not found"); // Crea un error 404 con Boom
  next(error); // Pasa el error a los manejadores de errores
};
