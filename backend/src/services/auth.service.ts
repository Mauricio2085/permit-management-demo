import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import poolConnection from "../libs/postgres.pool.js";
import Boom from "@hapi/boom";
interface AuthSuccessResponse {
  token?: string;
  user?: {
    user_id: number;
    name: string;
    role_id: number;
    email: string;
  };
  error?: string;
  status?: number;
}

export const authenticateUser = async (
  email: string,
  password: string
): Promise<AuthSuccessResponse> => {
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const userResult = await poolConnection.query(query, [email]);
    console.log("Query result: ", userResult.rows);
    if (userResult.rows.length === 0) {
      console.log("No user found with the provided credentials");
      throw Boom.unauthorized("Incorrect credentials");
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw Boom.unauthorized("Incorrect credentials");
    }

    if (!config.jwtSecret) {
      throw Boom.internal("JWT_SECRET is not defined in .env file");
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
      },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    return {
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        role_id: user.role_id,
        email: user.email,
      },
    };
  } catch (err: any) {
    if (err.isBoom) {
      throw err;
    }
    console.error(err);
    throw Boom.internal("Internal server error during authentication");
  }
};
