import * as yup from "yup";
import type { InputsForm } from "@/types/workAtHeights";

const workHeightsSchema: yup.ObjectSchema<InputsForm> = yup.object({
  customer: yup.string().required("El contratista es requerido"),
  description: yup.string().required("La descripción es requerida"),

  criticalTasks: yup
    .array(
      yup.object({
        value: yup.string().required("Seleccione una tarea crítica"),
      })
    )
    .min(1, "Debe seleccionar al menos una tarea crítica")
    .required("Las tareas críticas son requeridas"),

  maxHeightAuthorized: yup
    .number()
    .typeError("La altura debe ser un número")
    .positive("La altura debe ser un número positivo")
    .required("La altura máxima es requerida"),

  maxLoadAuthorized: yup
    .number()
    .typeError("La carga debe ser un número")
    .positive("La carga debe ser un número positivo")
    .required("La carga máxima es requerida"),

  documentsSupport: yup
    .array(
      yup.object({
        value: yup.string().required("Seleccione un documento soporte"),
      })
    )
    .min(1, "Debe seleccionar al menos un documento soporte")
    .required("Los documentos de soporte son requeridos"),

  fallElements: yup
    .array(
      yup.object({
        value: yup
          .string()
          .required("Seleccione un elemento de protección contra caída"),
      })
    )
    .min(1, "Debe seleccionar al menos un elemento de protección")
    .required("Los elementos de protección son requeridos"),

  personalProtectionElements: yup
    .array(
      yup.object({
        value: yup
          .string()
          .required("Seleccione un elemento de protección personal"),
      })
    )
    .min(1, "Debe seleccionar al menos un elemento de protección personal")
    .required("Los elementos de protección personal son requeridos"),

  accessElements: yup
    .array(
      yup.object({
        value: yup.string().required("Seleccione un elemento de acceso"),
      })
    )
    .min(1, "Debe seleccionar al menos un elemento de acceso")
    .required("Los elementos de acceso son requeridos"),

  permissionElaborationDate: yup
    .string()
    .required("La fecha de elaboración es requerida"),
  permissionStartDate: yup.string().required("La fecha de inicio es requerida"),
  permissionEndDate: yup
    .string()
    .required("La fecha de finalización es requerida"),

  siteIsolated: yup
    .string()
    .oneOf(["SI", "NO", "NA"], "Seleccione una opción")
    .required("Este campo es requerido"),
  barriersInstalled: yup
    .string()
    .oneOf(["SI", "NO", "NA"], "Seleccione una opción")
    .required("Este campo es requerido"),
  instructionsReceived: yup
    .string()
    .oneOf(["SI", "NO", "NA"], "Seleccione una opción")
    .required("Este campo es requerido"),
  knowledgeVerified: yup
    .string()
    .oneOf(["SI", "NO", "NA"], "Seleccione una opción")
    .required("Este campo es requerido"),
  simultaneousWork: yup
    .string()
    .oneOf(["SI", "NO", "NA"], "Seleccione una opción")
    .required("Este campo es requerido"),
  socialSecurityVerified: yup
    .string()
    .oneOf(["SI", "NO", "NA"], "Seleccione una opción")
    .required("Este campo es requerido"),
  medicalCertificateVerified: yup
    .string()
    .oneOf(["SI", "NO", "NA"], "Seleccione una opción")
    .required("Este campo es requerido"),

  executors: yup
    .array(
      yup.object({
        nombre: yup.string().required("El nombre del ejecutor es requerido"),
        cedula: yup.string().required("La cédula del ejecutor es requerida"),
        signature: yup
          .string()
          .nullable()
          .required("La firma del ejecutor es requerida"),
      })
    )
    .min(1, "Debe agregar al menos un ejecutor")
    .required("Los ejecutores son requeridos"),

  authorizerName: yup
    .string()
    .required("El nombre del autorizador es requerido"),
  authorizerId: yup.string().required("La cédula del autorizador es requerida"),
  authorizerSignature: yup
    .string()
    .nullable()
    .required("La firma del autorizador es requerida"),

  coordinatorName: yup
    .string()
    .required("El nombre del coordinador es requerido"),
  coordinatorId: yup
    .string()
    .required("La cédula del coordinador es requerida"),
  coordinatorSignature: yup
    .string()
    .nullable()
    .required("La firma del coordinador es requerida"),
});

export default workHeightsSchema;
