import request from "supertest";
import app from "../index.js";
import pool from "../libs/postgres.pool.js";

beforeAll(async () => {
  try {
    await pool.query(`DELETE FROM users WHERE email='test@example.com';`);

    const resultInsert = await pool.query(`
      INSERT INTO users (name, email, password, role_id)
      VALUES ('Test-User', 'test@example.com', '$2b$10$5H5mkTvE1QQKuEWYRv.zmu45Mboo4Jw6JA605qagucsgogWX3KjEy', 1) 
      RETURNING *;
    `);

    if (!resultInsert.rows[0]) {
      throw new Error("Failed to insert test user");
    }

    console.log("Test user created successfully:", resultInsert.rows[0].name);
  } catch (error) {
    console.error("Error in test setup:", error);
    throw error;
  }
});

afterAll(async () => {
  await pool.query(`
    DELETE FROM users WHERE name='Test-User';`);
  await pool.end();
});

describe("POST /auth/login", () => {
  it("should return token and user with valid credentials", async () => {
    const checkUser = await pool.query("SELECT * FROM users WHERE email = $1", [
      "test@example.com",
    ]);

    const rootUrl = "/api/v1";
    console.log("Intentando login con:", {
      email: "test@example.com",
      password: "123456",
    });

    const res = await request(app)
      .post(`${rootUrl}/auth/login`)
      .send({ email: "test@example.com", password: "123456" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toMatchObject({
      email: "test@example.com",
      name: "Test-User",
      role_id: 1,
    });
  });

  it("should return 401 for invalid email", async () => {
    const rootUrl = "/api/v1";
    const res = await request(app)
      .post(`${rootUrl}/auth/login`)
      .send({ email: "wrong@example.com", password: "123456" });

    expect(res.status).toBe(401);
  });

  it("should return 401 for invalid password", async () => {
    const rootUrl = "/api/v1";
    const res = await request(app)
      .post(`${rootUrl}/auth/login`)
      .send({ email: "test@example.com", password: "wrongpass" });

    expect(res.status).toBe(401);
  });
});
