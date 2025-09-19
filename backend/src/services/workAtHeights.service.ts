import poolConection from "../libs/postgres.pool.js";
import Boom from "@hapi/boom";
import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";
import { config } from "../config/config.js";

// Cloudinary configuration
cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

type Sequence = number;

interface ConsecutiveResponse {
  sequence: Sequence;
}

interface ShortPermissionsResponse {
  id: number;
  sequence: Sequence;
  description: string;
  customer: string;
}

interface Signatures {
  name: string;
  document: string;
  role: string;
  signature: string;
}
interface CompletePermissionsResponse {
  id: number;
  permissionStartDate: string;
  permissionEndDate: string;
  description: string;
  status: string;
  customer: string;
  sequence: number;
  criticalTasks: string[];
  documentsSupport: string[];
  maxHeightAuthorized: number;
  maxLoadAuthorized: number;
  fallElements: string[];
  personalProtectionElements: string[];
  accessElements: string[];
  answersCheckPermission: string[];
  signaturesPermission: Signatures[];
}

interface CriticalTaskResponse {
  id: number;
  name: string;
}

interface ProvidersResponse {
  id: number;
  name: string;
  tax_id: string;
  phone: number;
  email: string;
  address: string;
}

interface DocumentsSupportResponse {
  id: number;
  name: string;
}

interface ProtectionElementsResponse {
  id: number;
  name: string;
  type: string;
}

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

const uploadSignatureToCloudinary = async (
  signature: string,
  identifier: string
): Promise<UploadApiResponse> => {
  try {
    const uploadResult = await cloudinary.uploader.upload(signature, {
      folder: "signatures",
      public_id: `signature_${identifier}_${Date.now()}`,
      resource_type: "image",
    });
    return uploadResult;
  } catch (error) {
    console.error(`Error uploading signature for ${identifier}:`, error);
    throw new Error(`Failed to upload signature for ${identifier}`);
  }
};

export const getSequence = async (): Promise<ConsecutiveResponse[]> => {
  try {
    const query =
      "SELECT COALESCE(MAX(sequence), 0) + 1 as next_sequence FROM work_at_heights_permits";
    const result = await poolConection.query(query);
    const data = result.rows[0].next_sequence;
    console.log(data);
    return data;
  } catch (err) {
    throw Boom.internal("Error getting sequence");
  }
};

export const getCriticalTasks = async (): Promise<CriticalTaskResponse[]> => {
  try {
    const query = "SELECT * FROM critical_tasks_catalog";
    const result = await poolConection.query(query);
    const data = result.rows;
    return data;
  } catch (err) {
    throw Boom.internal("Error getting critical tasks");
  }
};

export const getCustomers = async (): Promise<ProvidersResponse[]> => {
  const query = `SELECT * FROM customers;`;
  const result = await poolConection.query(query);
  const data = result.rows;
  return data;
};

export const getDocumentsSupport = async (): Promise<
  DocumentsSupportResponse[]
> => {
  const query = `SELECT * FROM supporting_documents_catalog`;
  const result = await poolConection.query(query);
  const data = result.rows;
  return data;
};

export const getFallProtectionSystems = async (): Promise<
  ProtectionElementsResponse[]
> => {
  const query = `SELECT * FROM safety_equipment_catalog WHERE type='caidas'`;
  const result = await poolConection.query(query);
  const data = result.rows;
  return data;
};

export const getPersonalProtectionElements = async (): Promise<
  ProtectionElementsResponse[]
> => {
  const query = `SELECT * FROM safety_equipment_catalog WHERE type='EPP'`;
  const result = await poolConection.query(query);
  const data = result.rows;
  return data;
};

export const getAccessSystems = async (): Promise<
  ProtectionElementsResponse[]
> => {
  const query = `SELECT * FROM safety_equipment_catalog WHERE type='acceso'`;
  const result = await poolConection.query(query);
  const data = result.rows;
  return data;
};

export const createPermission = async (
  permissionData: InputsPermissionResponse
): Promise<void> => {
  const {
    customer,
    description,
    criticalTasks,
    maxHeightAuthorized,
    maxLoadAuthorized,
    documentsSupport,
    fallElements,
    personalProtectionElements,
    accessElements,
    permissionElaborationDate,
    permissionStartDate,
    permissionEndDate,
    siteIsolated,
    barriersInstalled,
    instructionsReceived,
    knowledgeVerified,
    simultaneousWork,
    socialSecurityVerified,
    medicalCertificateVerified,
    executors,
    authorizerName,
    authorizerId,
    authorizerSignature,
    coordinatorName,
    coordinatorId,
    coordinatorSignature,
  } = permissionData;
  const client = await poolConection.connect();
  try {
    await client.query("BEGIN");
    console.log("Creating permission with data:", permissionData);
    // Implement the logic to insert the permission data into the database

    const createPermissionQuery = `INSERT INTO work_at_heights_permits (start_date, end_date,
description, max_height, max_load, status, created_at) VALUES 
($1, $2, $3, $4, $5, $6, $7) RETURNING id;`;
    const FindCustomerIdQuery = `SELECT id FROM customers WHERE name = $1`;
    const FindCriticaltasksIdsQuery = `SELECT id FROM critical_tasks_catalog WHERE name = $1`;
    const FindDocumentsSupportIdsQuery = `SELECT id FROM supporting_documents_catalog WHERE name = $1`;
    const FindFallElementsIdsQuery = `SELECT id FROM safety_equipment_catalog WHERE name = $1`;
    const FindPersonalProtectionElementsIdsQuery = `SELECT id FROM safety_equipment_catalog WHERE name = $1`;
    const FindAccessElementsIdsQuery = `SELECT id FROM safety_equipment_catalog WHERE name = $1`;
    const checkListAnswersQuery = `INSERT INTO checklist_responses (permit_id, item_id, response) VALUES
    ($1, $2, $3), ($4, $5, $6), ($7, $8, $9), ($10, $11, $12), ($13, $14, $15), ($16, $17, $18), ($19, $20, $21);`;
    const createCustomerPermissionQuery = `INSERT INTO customers_permit (permit_id, customer_id) VALUES
    ($1, $2);`;
    const createCriticalTasksPermissionQuery = `INSERT INTO critical_tasks_permit (permit_id, task_id, applies) VALUES
    ($1, $2, $3);`;
    const createDocumentsPermissionQuery = `INSERT INTO documents_permit (permit_id, document_id, response) VALUES
    ($1, $2, $3);`;
    const createElementsPermissionQuery = `INSERT INTO permit_equipment (permit_id, equipment_id, applies) VALUES
    ($1, $2, $3);`;
    const createSignaturesPermissionQuery = `INSERT INTO permit_signatures (permit_id, name, identification, role, signature, signed_at) VALUES
    ($1, $2, $3, $4, $5, $6);`;

    const valuesPermission = [
      permissionStartDate,
      permissionEndDate,
      description,
      maxHeightAuthorized,
      maxLoadAuthorized,
      "pendiente",
      new Date().toISOString(),
    ];
    const permisionResult = await client.query(
      createPermissionQuery,
      valuesPermission
    );

    const idFoundCustomer = await client.query(FindCustomerIdQuery, [customer]);

    const permissionId = permisionResult.rows[0].id;
    const customerId = idFoundCustomer.rows[0].id;

    const tasksIds = await Promise.all(
      criticalTasks.map(async (task) => {
        const result = await client.query(FindCriticaltasksIdsQuery, [
          task.value,
        ]);
        console.log("Result critical Tasks: ", result.rows[0].id);
        return result.rows[0].id;
      })
    );

    const documentsSupportIds = await Promise.all(
      documentsSupport.map(async (document) => {
        const result = await client.query(FindDocumentsSupportIdsQuery, [
          document.value,
        ]);
        return result.rows[0].id;
      })
    );

    const fallElementsIds = await Promise.all(
      fallElements.map(async (fallElement) => {
        const result = await client.query(FindFallElementsIdsQuery, [
          fallElement.value,
        ]);
        return result.rows[0].id;
      })
    );

    const personalProtectionElementsIds = await Promise.all(
      personalProtectionElements.map(async (personalProtectionElement) => {
        const result = await client.query(
          FindPersonalProtectionElementsIdsQuery,
          [personalProtectionElement.value]
        );
        return result.rows[0].id;
      })
    );

    const accessElementsIds = await Promise.all(
      accessElements.map(async (findAccessElement) => {
        const result = await client.query(FindAccessElementsIdsQuery, [
          findAccessElement.value,
        ]);
        return result.rows[0].id;
      })
    );

    const executorSignatureResults = await Promise.all(
      executors.map(async (executor) => {
        if (executor.signature) {
          try {
            const uploadResult = await uploadSignatureToCloudinary(
              executor.signature,
              executor.identification
            );
            return {
              name: executor.name,
              identification: executor.identification,
              cloudinaryUrl: uploadResult.secure_url,
              publicId: uploadResult.public_id,
            };
          } catch (error) {
            console.error(
              `Error uploading signature for ${executor.identification}:`,
              error
            );
            throw Boom.internal(
              `Error uploading signature for ${executor.identification}`
            );
          }
        }
        return {
          identification: executor.identification,
          cloudinaryUrl: null,
          publicId: null,
        };
      })
    );

    // Upload authorizer signature if exist
    let authorizerSignatureResult: {
      cloudinaryUrl: string | null;
      publicId: string | null;
    } = {
      cloudinaryUrl: null,
      publicId: null,
    };

    if (authorizerSignature) {
      try {
        const uploadResult = await uploadSignatureToCloudinary(
          authorizerSignature,
          authorizerId
        );
        authorizerSignatureResult = {
          cloudinaryUrl: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        };
      } catch (error) {
        console.error("Error uploading authorizer signature:", error);
      }
    }

    // Upload coordinator signature if exist
    let coordinatorSignatureResult: {
      cloudinaryUrl: string | null;
      publicId: string | null;
    } = {
      cloudinaryUrl: null,
      publicId: null,
    };

    if (coordinatorSignature) {
      try {
        const uploadResult = await uploadSignatureToCloudinary(
          coordinatorSignature,
          coordinatorId
        );
        coordinatorSignatureResult = {
          cloudinaryUrl: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        };
      } catch (error) {
        console.error("Error uploading coordinator signature:", error);
      }
    }

    // Filling the permission asociative tables
    // filling customer permission
    const valuesCustomerPermission = [permissionId, customerId];
    const createCustomerPermissionResult = await client.query(
      createCustomerPermissionQuery,
      valuesCustomerPermission
    );

    // Filling the critical tasks
    const completeIdsCriticalTasks = [1, 2, 3];
    Promise.all(
      completeIdsCriticalTasks.map(async (taskId) => {
        try {
          if (tasksIds.includes(taskId)) {
            await client.query(createCriticalTasksPermissionQuery, [
              permissionId,
              taskId,
              true,
            ]);
          }
        } catch (error) {
          console.error("Error creating critical tasks of the permit:", error);
          throw Boom.internal("Error creating critical tasks of the permit");
        }
      })
    );
    // Filling the documents support
    let CompleteidsDocumentsSupport = [1, 2, 3, 4, 5, 6, 7, 8];
    Promise.all(
      CompleteidsDocumentsSupport.map(async (documentId) => {
        try {
          if (documentsSupportIds.includes(documentId)) {
            await client.query(createDocumentsPermissionQuery, [
              permissionId,
              documentId,
              "SI",
            ]);
          } else {
            await client.query(createDocumentsPermissionQuery, [
              permissionId,
              documentId,
              "NA",
            ]);
          }
        } catch (error) {
          console.error("Error creating documents of the permit:", error);
          throw Boom.internal("Error creating documents of the permit");
        }
      })
    );
    // Filling the fall elements
    const completeIdsFallElements = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    ];
    Promise.all(
      completeIdsFallElements.map(async (fallElementId) => {
        try {
          if (fallElementsIds.includes(fallElementId)) {
            await client.query(createElementsPermissionQuery, [
              permissionId,
              fallElementId,
              true,
            ]);
          }
        } catch (error) {
          console.error("Error creating fall elements of the permit:", error);
          throw Boom.internal("Error creating fall elements of the permit");
        }
      })
    );
    // Filling the personal protection elements
    const completeIdsPersonalProtectionElements = [
      17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ];
    Promise.all(
      completeIdsPersonalProtectionElements.map(
        async (personalProtectionElementId) => {
          try {
            if (
              personalProtectionElementsIds.includes(
                personalProtectionElementId
              )
            ) {
              await client.query(createElementsPermissionQuery, [
                permissionId,
                personalProtectionElementId,
                true,
              ]);
            }
          } catch (error) {
            console.error(
              "Error creating personal protection elements of the permit:",
              error
            );
            throw Boom.internal(
              "Error creating personal protection elements of the permit"
            );
          }
        }
      )
    );
    // Filling the access elements
    const completeIdsAccessElements = [
      32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
    ];
    Promise.all(
      completeIdsAccessElements.map(async (accessElementId) => {
        try {
          if (accessElementsIds.includes(accessElementId)) {
            await client.query(createElementsPermissionQuery, [
              permissionId,
              accessElementId,
              true,
            ]);
          }
        } catch (error) {
          console.error(
            "Error creating personal protection elements of the permit:",
            error
          );
          throw Boom.internal(
            "Error creating personal protection elements of the permit"
          );
        }
      })
    );
    // Filling the checklist answers
    const checkListAnswers = [
      permissionId,
      1,
      siteIsolated,
      permissionId,
      2,
      barriersInstalled,
      permissionId,
      3,
      instructionsReceived,
      permissionId,
      4,
      knowledgeVerified,
      permissionId,
      5,
      simultaneousWork,
      permissionId,
      6,
      socialSecurityVerified,
      permissionId,
      7,
      medicalCertificateVerified,
    ];
    const checkListAnswersResult = await client.query(
      checkListAnswersQuery,
      checkListAnswers
    );
    // Filling the signatures
    Promise.all(
      executorSignatureResults.map(async (executor) => {
        await client.query(createSignaturesPermissionQuery, [
          permissionId,
          executor.name,
          executor.identification,
          "ejecutor",
          executor.cloudinaryUrl,
          new Date().toISOString(),
        ]);
      })
    );
    await client.query(createSignaturesPermissionQuery, [
      permissionId,
      authorizerName,
      authorizerId,
      "autorizador",
      authorizerSignatureResult.cloudinaryUrl,
      new Date().toISOString(),
    ]);
    await client.query(createSignaturesPermissionQuery, [
      permissionId,
      coordinatorName,
      coordinatorId,
      "coordinador",
      coordinatorSignatureResult.cloudinaryUrl,
      new Date().toISOString(),
    ]);

    await client.query("COMMIT");
    console.log("Permit created successfully and associated data saved.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating permission:", error);
    throw Boom.internal("Error creating permit, operation is rolled back.");
  } finally {
    console.log("Releasing  connection.");
    await client.release();
  }
};

export const getPendingShortPermissions = async (): Promise<
  ShortPermissionsResponse[]
> => {
  const query = `SELECT wahp.id, wahp.sequence, wahp.description, c.name AS customer, wahp.status  
FROM work_at_heights_permits wahp JOIN customers_permit cp ON wahp.id = cp.permit_id JOIN
customers c ON cp.customer_id = c.id WHERE wahp.status='pendiente';`;
  const result = await poolConection.query(query);
  const data = result.rows;
  return data;
};

export const getFinishedShortPermissions = async (): Promise<
  ShortPermissionsResponse[]
> => {
  const query = `SELECT wahp.id, wahp.sequence, wahp.description, c.name AS customer, wahp.status  
FROM work_at_heights_permits wahp JOIN customers_permit cp ON wahp.id = cp.permit_id JOIN
customers c ON cp.customer_id = c.id WHERE wahp.status='finalizado';`;
  const result = await poolConection.query(query);
  const data = result.rows;
  return data;
};

export const getPendingCompletePermissions = async (
  permissionId: number
): Promise<CompletePermissionsResponse[]> => {
  const client = await poolConection.connect();
  try {
    await client.query("BEGIN");
    console.log("Getting permission data:");

    const permissionQuery = `SELECT * FROM work_at_heights_permits WHERE id= $1;`;
    const customerQuery = `SELECT c.name AS customer 
      FROM work_at_heights_permits wahp JOIN customers_permit cp ON wahp.id = cp.permit_id JOIN
      customers c ON cp.customer_id = c.id WHERE wahp.id = $1`;
    const criticalQuery = `SELECT ctc.name FROM critical_tasks_permit ctp
      INNER JOIN critical_tasks_catalog ctc ON ctp.task_id = ctc.id
      WHERE ctp.permit_id = $1 AND ctp.applies = TRUE;`;
    const documentsQuery = `SELECT dp.permit_id, sdc.name, dp.response FROM documents_permit dp INNER JOIN supporting_documents_catalog sdc ON dp.document_id = sdc.id WHERE dp.permit_id = $1;`;
    const fallElementsQuery = `SELECT sec.name FROM safety_equipment_catalog sec
      INNER JOIN permit_equipment pe ON pe.equipment_id = sec.id
      WHERE pe.permit_id = $1 AND pe.applies = TRUE and type = 'caidas';`;
    const personalProtectionElementsQuery = `SELECT sec.name FROM safety_equipment_catalog sec
      INNER JOIN permit_equipment pe ON pe.equipment_id = sec.id
      WHERE pe.permit_id = $1 AND pe.applies = TRUE and type = 'EPP';`;
    const accessElementsQuery = `SELECT sec.name FROM safety_equipment_catalog sec
      INNER JOIN permit_equipment pe ON pe.equipment_id = sec.id
      WHERE pe.permit_id = $1 AND pe.applies = TRUE and type = 'acceso';`;
    const answersCheckPermissionQuery = `SELECT cic.*, cr.response FROM checklist_items_catalog cic INNER JOIN
      checklist_responses cr ON cr.item_id = cic.id WHERE cr.permit_id = $1;`;
    const signaturesQuery = `SELECT name, identification, role, signature FROM permit_signatures WHERE permit_id = $1;`;

    const permissionResult = await client.query(permissionQuery, [
      permissionId,
    ]);
    const customerResult = await client.query(customerQuery, [permissionId]);
    const criticalResult = await client.query(criticalQuery, [permissionId]);
    const documentsResult = await client.query(documentsQuery, [permissionId]);
    const fallElementsResult = await client.query(fallElementsQuery, [
      permissionId,
    ]);
    const personalProtectionElementsResult = await client.query(
      personalProtectionElementsQuery,
      [permissionId]
    );

    const accessElementsResult = await client.query(accessElementsQuery, [
      permissionId,
    ]);

    const answersCheckPermissionResult = await client.query(
      answersCheckPermissionQuery,
      [permissionId]
    );

    const signaturesResult = await client.query(signaturesQuery, [
      permissionId,
    ]);

    const permissionData = permissionResult.rows;
    const customerData = customerResult.rows;
    const criticalData = criticalResult.rows;
    const documentsData = documentsResult.rows;
    const fallElementsData = fallElementsResult.rows;
    const personalProtectionElementsData =
      personalProtectionElementsResult.rows;
    const accessElementsData = accessElementsResult.rows;
    const answersCheckPermissionData = answersCheckPermissionResult.rows;
    const signaturesData = signaturesResult.rows;

    const [
      {
        id,
        start_date: permissionStartDate,
        end_date: permissionEndDate,
        description: description,
        sequence: sequence,
        status: status,
        max_load: maxLoadAuthorized,
        max_height: maxHeightAuthorized,
      },
    ] = permissionData;
    const [{ customer }] = customerData;
    const criticalTasks = criticalData.map((critical) => critical.name);
    const documentsSupport = documentsData;
    const fallElements = fallElementsData.map(
      (fallElement) => fallElement.name
    );
    const personalProtectionElements = personalProtectionElementsData.map(
      (personalProtectionElement) => personalProtectionElement.name
    );
    const accessElements = accessElementsData.map(
      (accessElement) => accessElement.name
    );

    const answersCheckPermission = answersCheckPermissionData;
    const signaturesPermission = signaturesData;

    await client.query("COMMIT");
    console.log("Permit created successfully and associated data saved.");
    return [
      {
        id,
        permissionStartDate,
        permissionEndDate,
        description,
        status,
        customer,
        sequence,
        criticalTasks,
        documentsSupport,
        maxLoadAuthorized,
        maxHeightAuthorized,
        fallElements,
        personalProtectionElements,
        accessElements,
        answersCheckPermission,
        signaturesPermission,
      },
    ];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error getting permit:", error);
    throw Boom.internal("Error getting permit, operation is rolled back.");
  } finally {
    console.log("Releasing connection.");
    await client.release();
  }
};

export const updatePermissionState = async (sequence: Sequence) => {
  try {
    console.log("Sequence: ", sequence);
    const query = `UPDATE work_at_heights_permits SET status = 'finalizado' WHERE sequence = $1`;
    const result = await poolConection.query(query, [sequence]);
  } catch (error) {
    console.error("Error updating permission:", error);
    throw Boom.internal("Error updating the permit");
  }
};

export const deletePermission = async (sequence: Sequence) => {
  const client = await poolConection.connect();
  try {
    await client.query("BEGIN");
    const queryGetId = `SELECT id FROM work_at_heights_permits WHERE sequence = $1`;
    const deletePermissionQuery = `DELETE FROM work_at_heights_permits WHERE id = $1`;
    console.log("Sequence: ", sequence);
    const getIdResult = await client.query(queryGetId, [sequence]);
    const getIdData = getIdResult.rows;
    const { id } = getIdData[0];
    const deletePermissionResult = await client.query(deletePermissionQuery, [
      id,
    ]);
    const deletePermissionData = deletePermissionResult.rowCount;
    console.log("Delete result: ", deletePermissionData);
    await client.query("COMMIT");
    return {
      success: true,
      eliminado: deletePermissionData,
      mensaje: "The permit and all its dependencies deleted successfully",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error deleting the permit:", error);
    throw Boom.internal("Error deleting the permit");
  } finally {
    await client.release();
  }
};
