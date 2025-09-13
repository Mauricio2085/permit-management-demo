import express from "express";
import type { Application, NextFunction, Request, Response } from "express";
import Boom from "@hapi/boom";
import poolConnection from "../libs/postgres.pool.js";

interface CriticalTaskResponse {
  id: number;
  name: string;
}

export const getCriticalTasks = async (): Promise<CriticalTaskResponse[]> => {
  try {
    const query = "SELECT * FROM critical_tasks_catalog";
    const result = await poolConnection.query(query);
    console.log("Resultado de la consulta:", result.rows);
    const data = result.rows;
    return data;
  } catch (err) {
    throw Boom.internal("Error al obtener las tareas críticas");
  }
};

const router = express.Router();

const routersApi = (app: Application) => {
  app.use("/api/v1", router);

  router.use("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getCriticalTasks();
      res.status(200).json({
        message: "Critical tasks fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  });
};

export { routersApi };
