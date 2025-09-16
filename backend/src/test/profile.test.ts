import request from "supertest";
import app from "../index.js";
import pool from "../libs/postgres.pool.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const testUser = {
  name: "Profile-Test-User",
  email: "profile@example.com",
  password: "$2b$10$5H5mkTvE1QQKuEWYRv.zmu45Mboo4Jw6JA605qagucsgogWX3KjEy", // hash "123456"
  role_id: 1,
};

let userId: number;

beforeAll(async () => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role_id)
     VALUES ($1, $2, $3, $4)
     RETURNING user_id`,
    [testUser.name, testUser.email, testUser.password, testUser.role_id]
  );
  userId = result.rows[0].user_id;
  console.log("Test user created successfully:", testUser.name);
});

afterAll(async () => {
  await pool.query("DELETE FROM users WHERE email=$1", [testUser.email]);
  await pool.end();
});

describe("GET /profile", () => {
  it("should return user data with valid token", async () => {
    const token = jwt.sign(
      {
        user_id: userId,
        name: testUser.name,
        email: testUser.email,
        role_id: testUser.role_id,
      },
      config.jwtSecret!,
      { expiresIn: "1h" }
    );

    const res = await request(app)
      .get("/api/v1/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toMatchObject({
      email: testUser.email,
      name: testUser.name,
      role_id: testUser.role_id,
    });
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/api/v1/profile");

    expect(res.status).toBe(401);
  });

  it("should return 403 if token is invalid", async () => {
    const res = await request(app)
      .get("/api/v1/profile")
      .set("Authorization", "Bearer invalidtoken");

    expect(res.status).toBe(403);
  });
});
