import dotEnv from "dotenv";
import type { DotenvPopulateInput } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Boom from "@hapi/boom";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const customObjetEnv: DotenvPopulateInput = {};
const env = process.env.NODE_ENV || "development";
const envPath = path.resolve(__dirname, `../../.env.${env}.local`);
dotEnv.config({
  path: envPath,
  processEnv: customObjetEnv,
});

if (!customObjetEnv.JWT_SECRET) {
  throw Boom.internal("JWT_SECRET environment variable is not defined.");
}
if (!customObjetEnv.DATABASE_URL) {
  throw Boom.internal("DATABASE_URL environment variable is not defined.");
}

const config = {
  env: customObjetEnv.NODE_ENV || "development",
  port: customObjetEnv.PORT || 5000,
  dbUrl: customObjetEnv.DATABASE_URL,
  jwtSecret: customObjetEnv.JWT_SECRET,
  cloudinaryCloudName: customObjetEnv.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: customObjetEnv.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: customObjetEnv.CLOUDINARY_API_SECRET,
};

export { config };
