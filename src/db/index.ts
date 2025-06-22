import { drizzle, MySql2DrizzleConfig } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
});

const config: MySql2DrizzleConfig<typeof schema> = {
  schema,
  mode: "default",
};

const db = drizzle(pool, config);

export { db };
