import { mysqlTable as table } from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";
import { AnyMySqlColumn } from "drizzle-orm/mysql-core";

export const company = table("company", {
  id: t.int("id").primaryKey().autoincrement(),
  corporateName: t.varchar("corporate_name", { length: 255 }).notNull(),
  cnpj: t.varchar("cnpj", { length: 20 }).notNull(),
  zipCode: t.varchar("zip_code", { length: 20 }).notNull(),
  city: t.varchar("city", { length: 100 }).notNull(),
  state: t.varchar("state", { length: 50 }).notNull(),
  district: t.varchar("district", { length: 100 }).notNull(),
  complement: t.varchar("complement", { length: 255 }).notNull(),
});

export const license = table("license", {
  id: t.int("id").primaryKey().autoincrement(),
  companyId: t
    .int("company_id")
    .notNull()
    .references((): AnyMySqlColumn => company.id),
  number: t.varchar("number", { length: 100 }).notNull(),
  environmentalAgency: t
    .varchar("environmental_agency", { length: 255 })
    .notNull(),
  issuedAt: t.date("issued_at").notNull(),
  expiresAt: t.date("expires_at").notNull(),
});
