import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { ENV_VARS } from "../config/envVars";

const sql = neon(ENV_VARS.DatabaseUrl);

export const db = drizzle({ client: sql });
