/**
 * Tests unitarios para workAtHeights.service.
 * Cubre: getSequence, getCriticalTasks, getters de catálogos,
 * getPendingShortPermissions, getFinishedShortPermissions,
 * getPendingCompletePermissions (badRequest, notFound, éxito),
 * updatePermissionState, deletePermission.
 */

import { jest } from "@jest/globals";
import Boom from "@hapi/boom";

type QueryResult = { rows?: unknown[]; rowCount?: number };
const mockQuery = jest.fn<() => Promise<QueryResult>>();
const mockClientQuery = jest.fn<() => Promise<QueryResult>>();
const mockRelease = jest.fn<() => void>();
const mockConnect = jest.fn<() => Promise<{ query: jest.Mock; release: jest.Mock }>>();

jest.unstable_mockModule("../libs/postgres.pool.js", () => ({
  default: {
    query: mockQuery,
    connect: mockConnect,
  },
}));

jest.unstable_mockModule("../config/config.js", () => ({
  config: {
    cloudinaryCloudName: "test",
    cloudinaryApiKey: "test",
    cloudinaryApiSecret: "test",
  },
}));

jest.unstable_mockModule("cloudinary", () => ({
  v2: {
    config: jest.fn(),
    uploader: { upload: jest.fn() },
  },
}));

const workAtHeightsService = await import("../services/workAtHeights.service.js");

describe("workAtHeights.service - getSequence", () => {
  beforeEach(() => jest.clearAllMocks());

  it("debe retornar next_sequence cuando hay datos", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ next_sequence: 5 }] });

    const result = await workAtHeightsService.getSequence();

    expect(result).toBe(5);
    expect(mockQuery).toHaveBeenCalledWith(
      "SELECT COALESCE(MAX(sequence), 0) + 1 as next_sequence FROM work_at_heights_permits"
    );
  });

  it("debe lanzar Boom.internal cuando la query falla", async () => {
    mockQuery.mockRejectedValueOnce(new Error("DB error"));

    await expect(workAtHeightsService.getSequence()).rejects.toThrow(
      Boom.internal("Error getting sequence")
    );
  });
});

describe("workAtHeights.service - getCriticalTasks", () => {
  beforeEach(() => jest.clearAllMocks());

  it("debe retornar lista de tareas críticas", async () => {
    const rows = [{ id: 1, name: "Tarea 1" }, { id: 2, name: "Tarea 2" }];
    mockQuery.mockResolvedValueOnce({ rows });

    const result = await workAtHeightsService.getCriticalTasks();

    expect(result).toEqual(rows);
    expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM critical_tasks_catalog");
  });

  it("debe lanzar Boom.internal cuando la query falla", async () => {
    mockQuery.mockRejectedValueOnce(new Error("DB error"));

    await expect(workAtHeightsService.getCriticalTasks()).rejects.toThrow(
      Boom.internal("Error getting critical tasks")
    );
  });
});

describe("workAtHeights.service - getCustomers", () => {
  beforeEach(() => jest.clearAllMocks());

  it("debe retornar lista de clientes", async () => {
    const rows = [{ id: 1, name: "Cliente A", tax_id: "1", phone: 1, email: "a@b.com", address: "Calle 1" }];
    mockQuery.mockResolvedValueOnce({ rows });

    const result = await workAtHeightsService.getCustomers();

    expect(result).toEqual(rows);
    expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM customers;");
  });
});

describe("workAtHeights.service - getPendingShortPermissions", () => {
  beforeEach(() => jest.clearAllMocks());

  it("debe retornar lista de permisos pendientes", async () => {
    const rows = [{ id: 1, sequence: 1, description: "Permiso 1", customer: "Cliente", status: "pendiente" }];
    mockQuery.mockResolvedValueOnce({ rows });

    const result = await workAtHeightsService.getPendingShortPermissions();

    expect(result).toEqual(rows);
    expect(mockQuery).toHaveBeenCalled();
  });
});

describe("workAtHeights.service - getFinishedShortPermissions", () => {
  beforeEach(() => jest.clearAllMocks());

  it("debe retornar lista de permisos finalizados", async () => {
    const rows = [{ id: 1, sequence: 1, description: "Permiso 1", customer: "Cliente", status: "finalizado" }];
    mockQuery.mockResolvedValueOnce({ rows });

    const result = await workAtHeightsService.getFinishedShortPermissions();

    expect(result).toEqual(rows);
    expect(mockQuery).toHaveBeenCalled();
  });
});

describe("workAtHeights.service - getPendingCompletePermissions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnect.mockResolvedValue({
      query: mockClientQuery,
      release: mockRelease,
    });
  });

  it("debe lanzar Boom.badRequest cuando permissionId es falsy", async () => {
    await expect(
      workAtHeightsService.getPendingCompletePermissions(0)
    ).rejects.toThrow(Boom.badRequest("Permission ID is required"));

    await expect(
      workAtHeightsService.getPendingCompletePermissions(undefined as any)
    ).rejects.toThrow(Boom.badRequest("Permission ID is required"));
  });

  it("debe lanzar Boom.notFound cuando el permiso no existe", async () => {
    mockClientQuery.mockResolvedValueOnce({ rows: [] }); // checkPermitQuery

    await expect(
      workAtHeightsService.getPendingCompletePermissions(999)
    ).rejects.toThrow(Boom.notFound("Permit with ID 999 not found"));
  });

  it("debe retornar datos completos del permiso cuando existe", async () => {
    mockClientQuery
      .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // checkPermitQuery
      .mockResolvedValueOnce({}) // BEGIN
      .mockResolvedValueOnce({
        rows: [{
          id: 1,
          start_date: "2023-10-27",
          end_date: "2023-10-27",
          description: "Desc",
          sequence: 1,
          status: "pendiente",
          max_load: 10,
          max_height: 5,
        }],
      })
      .mockResolvedValueOnce({ rows: [{ customer: "Cliente" }] })
      .mockResolvedValueOnce({ rows: [{ name: "Tarea" }] })
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [{ name: "Caida" }] })
      .mockResolvedValueOnce({ rows: [{ name: "EPP" }] })
      .mockResolvedValueOnce({ rows: [{ name: "Acceso" }] })
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({}); // COMMIT

    const result = await workAtHeightsService.getPendingCompletePermissions(1);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0]).toMatchObject({
      id: 1,
      description: "Desc",
      status: "pendiente",
      customer: "Cliente",
      sequence: 1,
    });
    expect(mockRelease).toHaveBeenCalled();
  });
});

describe("workAtHeights.service - updatePermissionState", () => {
  beforeEach(() => jest.clearAllMocks());

  it("debe ejecutar UPDATE por sequence", async () => {
    mockQuery.mockResolvedValueOnce({ rowCount: 1 });

    await workAtHeightsService.updatePermissionState(3);

    expect(mockQuery).toHaveBeenCalledWith(
      "UPDATE work_at_heights_permits SET status = 'finalizado' WHERE sequence = $1",
      [3]
    );
  });

  it("debe lanzar Boom.internal cuando la query falla", async () => {
    mockQuery.mockRejectedValueOnce(new Error("DB error"));

    await expect(workAtHeightsService.updatePermissionState(1)).rejects.toThrow(
      Boom.internal("Error updating the permit")
    );
  });
});

describe("workAtHeights.service - deletePermission", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnect.mockResolvedValue({
      query: mockClientQuery,
      release: mockRelease,
    });
  });

  it("debe eliminar permiso por sequence y retornar éxito", async () => {
    const client = {
      query: jest.fn<() => Promise<QueryResult>>(),
      release: jest.fn<() => void>(),
    };
    client.query
      .mockResolvedValueOnce({}) // BEGIN
      .mockResolvedValueOnce({ rows: [{ id: 42 }] })
      .mockResolvedValueOnce({ rowCount: 1 })
      .mockResolvedValueOnce({}); // COMMIT
    mockConnect.mockResolvedValueOnce(client);

    const result = await workAtHeightsService.deletePermission(1);

    expect(result).toEqual({
      success: true,
      eliminado: 1,
      mensaje: "The permit and all its dependencies deleted successfully",
    });
    expect(client.release).toHaveBeenCalled();
  });

  it("debe lanzar Boom.internal cuando falla la operación", async () => {
    const client = {
      query: jest.fn<() => Promise<QueryResult>>(),
      release: jest.fn<() => void>(),
    };
    client.query.mockRejectedValueOnce(new Error("DB error"));
    mockConnect.mockResolvedValueOnce(client);

    await expect(workAtHeightsService.deletePermission(1)).rejects.toThrow(
      Boom.internal("Error deleting the permit")
    );
    expect(client.release).toHaveBeenCalled();
  });
});
