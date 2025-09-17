import type { Request, Response, NextFunction } from "express";
import {
  getSequence,
  getCriticalTasks,
  getCustomers,
  getDocumentsSupport,
  getFallProtectionSystems,
  getPersonalProtectionElements,
  getAccessSystems,
  createPermission,
  getPendingShortPermissions,
  getFinishedShortPermissions,
  getPendingCompletePermissions,
  updatePermissionState,
  deletePermission,
} from "../services/workAtHeights.service.js";

export const getSequenceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getSequence();
    res.status(200).json({
      message: "Consecutive fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getCriticalTasksController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getCriticalTasks();
    res.status(200).json({
      message: "Critical tasks fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getCustomers();
    res.status(200).json({
      message: "Suppliers fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getDocumentsSupportController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getDocumentsSupport();
    res.status(200).json({
      message: "Documents fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getFallProtectionSystemsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getFallProtectionSystems();
    res.status(200).json({
      message: "FPS fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getPersonalProtectionElementsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getPersonalProtectionElements();
    res.status(200).json({
      message: "FPS fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAccessSystemsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAccessSystems();
    res.status(200).json({
      message: "FPS fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const createPermissionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permissionData = req.body;
    await createPermission(permissionData);
    res.status(201).json({
      message: "Permission created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getPendingShortPermissionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getPendingShortPermissions();
    res.status(200).json({
      message: "Pending permissions fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getFinishedShortPermissionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getFinishedShortPermissions();
    res.status(200).json({
      message: "Finished permissions fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getPendingCompletePermissionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { permissionId } = req.params;
    const result = await getPendingCompletePermissions(Number(permissionId));
    res.status(200).json({
      message: "Finished permissions fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePermissionStateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sequence } = req.body;
    const result = await updatePermissionState(sequence);
    res.status(200).json({
      message: "Permission updated succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deletePermissionStateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sequence = req.body.sequence;
    const result = await deletePermission(sequence);
    res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};
