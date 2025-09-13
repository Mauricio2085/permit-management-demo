import { Pool } from "pg";
import { config } from "../config/config.js";
import Boom from "@hapi/boom";

if (!config.dbUrl) {
  throw Boom.internal("Faltan url de conexión a la base de datos");
}

const UrlDatabase = config.dbUrl;

const pool = new Pool({
  connectionString: UrlDatabase,
  ssl: { rejectUnauthorized: false },
});

export default pool;
