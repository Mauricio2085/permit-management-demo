import { Router } from "express";
import {
  getSequenceController,
  getCriticalTasksController,
  getCustomersController,
  getDocumentsSupportController,
  getFallProtectionSystemsController,
  getPersonalProtectionElementsController,
  getAccessSystemsController,
  createPermissionController,
  getPendingShortPermissionsController,
  getFinishedShortPermissionsController,
  getPendingCompletePermissionsController,
  updatePermissionStateController,
  deletePermissionStateController,
} from "../controllers/workAtHeights.controller.js";

const router = Router();

router.get("/sequence", getSequenceController);
router.get("/providers", getCustomersController);
router.get("/critical-tasks", getCriticalTasksController);
router.get("/documents-support", getDocumentsSupportController);
router.get("/fall-protection-systems", getFallProtectionSystemsController);
router.get(
  "/personal-protection-elements",
  getPersonalProtectionElementsController
);
router.get("/access-systems", getAccessSystemsController);
router.post("/permission", createPermissionController);
router.put("/permission", updatePermissionStateController);
router.delete("/permission", deletePermissionStateController);
router.get("/pending-permissions-resume", getPendingShortPermissionsController);
router.get(
  "/finished-permissions-resume",
  getFinishedShortPermissionsController
);
router.get(
  "/pending-complete-permissions/:permissionId",
  getPendingCompletePermissionsController
);

export default router;
