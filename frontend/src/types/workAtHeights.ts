import type { Dispatch, SetStateAction } from "react";

interface Providers {
  id: number;
  nombre: string;
  nit: string;
  telefono: number;
  correo: string;
  direccion: string;
}
export interface ProvidersResponse {
  data: Providers[];
}

export interface ConsecutiveResponse {
  data: number;
}

export interface CriticalTask {
  id: number;
  nombre: string;
}
export interface CriticalTaskResponse {
  data: CriticalTask[];
}
export interface DocumentSupport {
  id: number;
  nombre: string;
}
export interface DocumentSupportResponse {
  data: DocumentSupport[];
}

export interface ProtectionElements {
  id: number;
  nombre: string;
  tipo: string;
}
export interface ProtectionElementsResponse {
  data: ProtectionElements[];
}

export interface InputsForm {
  customer: string;
  description: string;
  criticalTasks: { value: string }[];
  maxHeightAuthorized: number;
  maxLoadAuthorized: number;
  documentsSupport: { value: string }[];
  fallElements: { value: string }[];
  personalProtectionElements: { value: string }[];
  accessElements: { value: string }[];
  //Dates
  permissionElaborationDate: string;
  permissionStartDate: string;
  permissionEndDate: string;
  //Checklist
  siteIsolated: "SI" | "NO" | "NA";
  barriersInstalled: "SI" | "NO" | "NA";
  instructionsReceived: "SI" | "NO" | "NA";
  knowledgeVerified: "SI" | "NO" | "NA";
  simultaneousWork: "SI" | "NO" | "NA";
  socialSecurityVerified: "SI" | "NO" | "NA";
  medicalCertificateVerified: "SI" | "NO" | "NA";
  //Signatures
  executors: { nombre: string; cedula: string; signature: string | null }[];
  authorizerName: string;
  authorizerId: string;
  authorizerSignature: string | null;
  coordinatorName: string;
  coordinatorId: string;
  coordinatorSignature: string | null;
}

export interface Permissions {
  id: number;
  sequence: number;
  description: string;
  customer: string;
  status: string;
}

export interface PermissionsResponse {
  data: Permissions[];
}

export interface PermissionDownload {
  id: number;
  consecutive: number;
  permissionStartDate: string;
  permissionEndDate: string;
  description: string;
  state: string;
  customer: string;
  criticalTasks: string[];
  documentsSupport: {
    id_documento: number;
    nombre: string;
    respuesta: string;
  }[];
  maxHeightAuthorized: string;
  maxLoadAuthorized: string;
  fallElements: string[];
  personalProtectionElements: string[];
  accessElements: string[];
  answersCheckPermission: {
    id: number;
    verificacion: string;
    aspecto: string;
    respuesta: string;
  }[];
  signaturesPermission: {
    nombre: string;
    cedula: string;
    rol: string;
    firma: string;
  }[];
}
export interface PermissionDownloadResponse {
  data: PermissionDownload[];
}
export interface CloseEliminateModalProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
  permissionConsecutive: number | string;
}
