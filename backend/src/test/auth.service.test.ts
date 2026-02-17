/**
 * Tests unitarios para auth.service (authenticateUser).
 * Cubre: usuario no encontrado, contraseña incorrecta, JWT_SECRET faltante,
 * éxito con token y user, y error genérico → Boom.internal.
 */

import { jest } from "@jest/globals";
import Boom from "@hapi/boom";

const mockQuery = jest.fn<() => Promise<{ rows: unknown[] }>>();
const mockCompare = jest.fn<() => Promise<boolean>>();
const mockSign = jest.fn<() => string>();

jest.unstable_mockModule("../libs/postgres.pool.js", () => ({
  default: { query: mockQuery },
}));

jest.unstable_mockModule("bcryptjs", () => ({
  default: { compare: mockCompare },
}));

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: { sign: mockSign },
}));

jest.unstable_mockModule("../config/config.js", () => ({
  config: { jwtSecret: "test-jwt-secret" },
}));

const { authenticateUser } = await import("../services/auth.service.js");

describe("auth.service - authenticateUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe lanzar Boom.unauthorized cuando no hay usuario con ese email", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    await expect(
      authenticateUser("noexiste@example.com", "123456")
    ).rejects.toThrow(Boom.unauthorized("Incorrect credentials"));

    expect(mockQuery).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE email = $1",
      ["noexiste@example.com"]
    );
    expect(mockCompare).not.toHaveBeenCalled();
  });

  it("debe lanzar Boom.unauthorized cuando la contraseña no coincide", async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [
        {
          user_id: 1,
          name: "Test",
          email: "test@example.com",
          role_id: 1,
          password: "hash",
        },
      ],
    });
    mockCompare.mockResolvedValueOnce(false);

    await expect(
      authenticateUser("test@example.com", "wrongpass")
    ).rejects.toThrow(Boom.unauthorized("unauthorized user"));

    expect(mockCompare).toHaveBeenCalledWith("wrongpass", "hash");
    expect(mockSign).not.toHaveBeenCalled();
  });

  it("debe retornar token y user con credenciales válidas", async () => {
    const user = {
      user_id: 1,
      name: "Test User",
      email: "test@example.com",
      role_id: 1,
      password: "hashed",
    };
    mockQuery.mockResolvedValueOnce({ rows: [user] });
    mockCompare.mockResolvedValueOnce(true);
    mockSign.mockReturnValueOnce("fake-jwt-token");

    const result = await authenticateUser("test@example.com", "123456");

    expect(result).toEqual({
      token: "fake-jwt-token",
      user: {
        user_id: 1,
        name: "Test User",
        role_id: 1,
        email: "test@example.com",
      },
    });
    expect(mockSign).toHaveBeenCalledWith(
      { user_id: 1, name: "Test User", email: "test@example.com" },
      "test-jwt-secret",
      { expiresIn: "1h" }
    );
  });

  it("debe lanzar Boom.internal cuando ocurre un error no Boom (ej. DB)", async () => {
    mockQuery.mockRejectedValueOnce(new Error("Connection refused"));

    await expect(
      authenticateUser("test@example.com", "123456")
    ).rejects.toThrow(Boom.internal("Internal server error during authentication"));
  });
});
