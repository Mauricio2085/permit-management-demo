import request from "supertest";
import app from "../index.js";
import { Pool } from "pg";
import { config } from "../config/config.js";

const pool = new Pool({
  connectionString: config.dbUrl,
});

let createdPermitId: number; // Para almacenar el ID del permiso
let sequencePermit: number; // Para almacenar el sequence del permiso
const permitData = {
  customer: "Customer 1",
  description: "Trabajo de mantenimiento con testing",
  criticalTasks: [
    {
      value: "Trabajo en caliente",
    },
  ],
  maxHeightAuthorized: 12,
  maxLoadAuthorized: 23,
  documentsSupport: [
    {
      value: "ATS",
    },
  ],
  fallElements: [
    {
      value: "Puntos de anclaje",
    },
    {
      value: "Arnes integral de seguridad",
    },
  ],
  personalProtectionElements: [
    {
      value: "Botas de seguridad",
    },
    {
      value: "Casco con barbuquejo de 3 puntos",
    },
  ],
  accessElements: [
    {
      value: "Elementos de señalizacion",
    },
    {
      value: "Escalera extensibles",
    },
  ],
  permissionElaborationDate: "2023-10-27T10:00:00.000Z",
  permissionStartDate: "2023-10-27T10:30:00.000Z",
  permissionEndDate: "2023-10-27T17:00:00.000Z",
  siteIsolated: "SI",
  barriersInstalled: "NO",
  instructionsReceived: "SI",
  knowledgeVerified: "NO",
  simultaneousWork: "SI",
  socialSecurityVerified: "SI",
  medicalCertificateVerified: "SI",
  executors: [
    {
      name: "Juan Perez",
      identification: "123456789",
      signature:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    },
    {
      name: "Maria Garcia",
      identification: "987654321",
      signature: null,
    },
  ],
  authorizerName: "Carlos Rodriguez",
  authorizerId: "1122334455",
  authorizerSignature:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  coordinatorName: "Ana Lopez",
  coordinatorId: "6677889900",
  coordinatorSignature: null,
};

beforeAll(async () => {
  try {
    // Limpieza previa
    await pool.query(`DELETE FROM work_at_heights_permits;`);

    // Crear el permiso y obtener la respuesta
    const createResponse = await request(app)
      .post("/api/v1/work-at-heights/permission")
      .send(permitData);

    console.log("Create response:", createResponse.body);

    // Verificar que la creación fue exitosa
    if (createResponse.status !== 201) {
      throw new Error(
        `Failed to create permit: ${JSON.stringify(createResponse.body)}`
      );
    }

    // Consultar el sequence del permiso creado
    const result = await pool.query(
      `SELECT sequence, id FROM work_at_heights_permits ORDER BY id DESC LIMIT 1;`
    );

    if (!result.rows[0]) {
      throw new Error("No permit found after creation");
    }

    createdPermitId = result.rows[0].id;
    sequencePermit = result.rows[0].sequence;
    console.log(
      "Created permit ID:",
      createdPermitId,
      "sequence: ",
      sequencePermit
    );

    // Verificar que el sequence existe
    const verifyResult = await pool.query(
      `SELECT sequence FROM work_at_heights_permits WHERE sequence = $1;`,
      [sequencePermit]
    );

    if (!verifyResult.rows[0]) {
      throw new Error(`Could not verify permit with ID ${createdPermitId}`);
    }
  } catch (error) {
    console.error("Error in test setup:", error);
    throw error;
  }
});

afterAll(async () => {
  await pool.query(`DELETE FROM work_at_heights_permits;`);
  await pool.end();
});

describe("Work at Heights API", () => {
  it("POST /work-at-heights/permission → should create a new permit", async () => {
    const res = await request(app)
      .post("/api/v1/work-at-heights/permission")
      .send(permitData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty(
      "message",
      "Permission created successfully"
    );
  });

  it("GET /work-at-heights/pending-permissions-resume → should return a list of pending permits", async () => {
    const res = await request(app).get(
      "/api/v1/work-at-heights/pending-permissions-resume"
    );

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "Pending permissions fetched successfully"
    );
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("GET /work-at-heights/finished-permissions-resume → should return a list of finished permits", async () => {
    const res = await request(app).get(
      "/api/v1/work-at-heights/finished-permissions-resume"
    );

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "Finished permissions fetched successfully"
    );
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(0);
  });

  it("GET /work-at-heights/pending-complete-permissions/:id → should return a specific permit", async () => {
    console.log("Id returned: ", createdPermitId);
    const res = await request(app).get(
      `/api/v1/work-at-heights/pending-complete-permissions/${createdPermitId}`
    );

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "Finished permissions fetched successfully"
    );
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0]).toHaveProperty("sequence", createdPermitId);
  });

  it("PUT /work-at-heights/permission → should update the permit", async () => {
    console.log("Attempting to update permit with ID:", createdPermitId);
    const res = await request(app)
      .put(`/api/v1/work-at-heights/permission`)
      .send({ sequence: createdPermitId });

    console.log("Update response:", res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "Permission updated succesfully"
    );
  });

  it("DELETE /work-at-heights/permission → should delete the permit", async () => {
    console.log("Attempting to delete permit with ID:", createdPermitId);
    const res = await request(app)
      .delete(`/api/v1/work-at-heights/permission/`)
      .send({ sequence: createdPermitId });

    console.log("Delete response:", res.body);
    expect(res.status).toBe(200);
    expect(res.body.result).toHaveProperty("success", true);
    expect(res.body.result).toHaveProperty(
      "mensaje",
      "The permit and all its dependencies deleted successfully"
    );
    expect(res.body.result).toHaveProperty("eliminado", 1);
  });

  it("GET /work-at-heights/:id → should confirm permit no longer exists after deletion", async () => {
    console.log(
      "Verificando que el permiso fue eliminado, ID:",
      createdPermitId
    );

    const res = await request(app)
      .get(
        `/api/v1/work-at-heights/pending-complete-permissions/${createdPermitId}`
      )
      .expect(404);

    expect(res.body).toHaveProperty("error", "Not Found");
    expect(res.body).toHaveProperty(
      "message",
      `Permit with ID ${createdPermitId} not found`
    );
  });
});
