import * as schema from "./schemaLogin";

import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

export const db = drizzle(sql, { schema });
