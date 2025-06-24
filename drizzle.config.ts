import { defineConfig } from "drizzle-kit";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  out: "drizzle",
  schema: "src/db/schema.ts",
  dialect: "mysql",
  dbCredentials: isProduction
    ? {
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT!),
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        url: process.env.DATABASE_URL!,
      },
});
