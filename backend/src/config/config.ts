import dotEnv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Boom from "@hapi/boom";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";

// Solo intentar cargar archivo .env en desarrollo
if (env === "development") {
  const envPath = path.resolve(__dirname, `../../.env.${env}.local`);
  dotEnv.config({ path: envPath });
}

if (env === "test") {
  const envPath = path.resolve(__dirname, `../../.env.${env}.local`);
  dotEnv.config({ path: envPath });
}

// Validaciones tempranas para asegurar que las variables existen
if (!process.env.JWT_SECRET) {
  throw Boom.internal("JWT_SECRET environment variable is not defined.");
}

if (!process.env.DATABASE_URL) {
  throw Boom.internal("DATABASE_URL environment variable is not defined.");
}

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw Boom.internal("Missing Cloudinary environment variables");
}

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};

export { config };
