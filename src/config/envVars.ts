import { configDotenv } from "dotenv";

configDotenv({ path: ".env" });

export const ENV_VARS = {
  DatabaseUrl: process.env.DATABASE_URL,
};
