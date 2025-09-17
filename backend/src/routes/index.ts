import express from "express";
import type { Application, Request, Response } from "express";
import authRouter from "./auth.route.js";
import profileRouter from "./profile.route.js";
import workAtHeightsRouter from "./workAtHeights.route.js";

const router = express.Router();

const routersApi = (app: Application) => {
  app.use("/api/v1", router);

  router.use("/auth", authRouter);
  router.use("/profile", profileRouter);
  router.use("/work-at-heights", workAtHeightsRouter);
  router.use("/", (req: Request, res: Response) => {
    res.send("Root");
  });
};

export { routersApi };
