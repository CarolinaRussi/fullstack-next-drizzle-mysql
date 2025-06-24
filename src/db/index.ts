import { drizzle, MySql2DrizzleConfig } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const isProduction = process.env.NODE_ENV === "production";

const pool = isProduction
  ? mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  : mysql.createPool({
      uri: process.env.DATABASE_URL,
    });

const config: MySql2DrizzleConfig<typeof schema> = {
  schema,
  mode: "default",
};

const db = drizzle(pool, config);

export { db };
