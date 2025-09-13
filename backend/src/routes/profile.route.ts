import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { getProfileController } from "../controllers/profile.controller.js";

const router = Router();

router.get("/", authenticateToken, getProfileController);

export default router;
