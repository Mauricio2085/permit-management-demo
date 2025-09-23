type InputsPermissionResponse = {
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
  executors: {
    name: string;
    identification: string;
    signature: string | null;
  }[];
  authorizerName: string;
  authorizerId: string;
  authorizerSignature: string | null;
  coordinatorName: string;
  coordinatorId: string;
  coordinatorSignature: string | null;
};

const count = process.argv[2] ? Number(process.argv[2]) : 1;
console.log(`Creating ${count} permits...`);

const inputsPermission: InputsPermissionResponse = {
  customer: "Customer 1",
  description: "Actividades de trabajo en alturas con 5 permisos",
  criticalTasks: [
    { value: "Trabajo en caliente" },
    { value: "Izaje de cargas" },
  ],
  maxHeightAuthorized: 20,
  maxLoadAuthorized: 30,
  documentsSupport: [{ value: "ATS" }],
  fallElements: [
    { value: "Puntos de anclaje" },
    { value: "Mecanismos de anclaje" },
  ],
  personalProtectionElements: [
    { value: "Casco con barbuquejo de 3 puntos" },
    { value: "Botas de seguridad" },
  ],
  accessElements: [{ value: "Extintores" }, { value: "Andamios" }],
  //Dates
  permissionElaborationDate: "2023-10-27T17:00:00.000Z",
  permissionStartDate: "2023-10-27T17:00:00.000Z",
  permissionEndDate: "2023-10-27T17:00:00.000Z",
  //Checklist
  siteIsolated: "SI",
  barriersInstalled: "SI",
  instructionsReceived: "SI",
  knowledgeVerified: "SI",
  simultaneousWork: "SI",
  socialSecurityVerified: "SI",
  medicalCertificateVerified: "SI",
  //Signatures
  executors: [
    {
      name: "Jhonny Zapata",
      identification: "14567896",
      signature: null,
    },
  ],
  authorizerName: "Autorizador 1",
  authorizerId: "34567812",
  authorizerSignature: null,
  coordinatorName: "Juan García",
  coordinatorId: "1088262478",
  coordinatorSignature: null,
};
const URL_API = "http://localhost:5000/api/v1";

const createPermitTool = async () => {
  for (let i = 1; i <= count; i++) {
    const permit = {
      ...inputsPermission,
      description: `Actividades de trabajo en alturas, permiso #${i}`,
    };
    const response = await fetch(`${URL_API}/work-at-heights/permission`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(permit),
    });
    const result = await response.json();
    console.log(`Permit ${i}`, result);
  }
};

createPermitTool();
