import { timestamp } from "drizzle-orm/pg-core";
import { pgTable, serial, varchar, integer, pgEnum } from "drizzle-orm/pg-core";

export const PRECEDENCE_ENUM = pgEnum("linkedPrecedence", [
  "primary",
  "secondary",
]);

export const ContactTable = pgTable("contact", {
  id: serial("id").primaryKey().notNull().unique(),
  phoneNumber: varchar("phoneNumber", { length: 256 }),
  email: varchar("email", { length: 256 }),
  linkedId: integer("linkedId").default(null),
  linkPrecedence: PRECEDENCE_ENUM("linkPrecedence").default("primary"),
  createdAt: timestamp("createdAt", {
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updatedAt", {
    withTimezone: true,
  }).defaultNow(),
  deletedAt: timestamp("deletedAt", {
    withTimezone: true,
  }).default(null),
});
