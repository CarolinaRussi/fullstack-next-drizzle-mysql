import { mysqlTable as table } from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";
import { AnyMySqlColumn } from "drizzle-orm/mysql-core";

export const empresa = table("empresa", {
  id: t.int("id").primaryKey().autoincrement(),
  razaoSocial: t.varchar("razao_social", { length: 255 }).notNull(),
  cnpj: t.varchar("cnpj", { length: 20 }).notNull(),
  cep: t.varchar("cep", { length: 20 }).notNull(),
  cidade: t.varchar("cidade", { length: 100 }).notNull(),
  estado: t.varchar("estado", { length: 50 }).notNull(),
  bairro: t.varchar("bairro", { length: 100 }).notNull(),
  complemento: t.varchar("complemento", { length: 255 }).notNull(),
});

export const licenca = table("licenca", {
  id: t.int("id").primaryKey().autoincrement(),
  empresaId: t
    .int("empresa_id")
    .notNull()
    .references((): AnyMySqlColumn => empresa.id),
  numero: t.varchar("numero", { length: 100 }).notNull(),
  orgaoAmbiental: t.varchar("orgao_ambiental", { length: 255 }).notNull(),
  emissao: t.date("emissao").notNull(),
  validade: t.date("validade").notNull(),
});
