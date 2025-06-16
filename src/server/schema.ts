import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  boolean,
  decimal,
  pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const account = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export const transactionTypeEnum = pgEnum("transaction_type", ["INCOME", "EXPENSE"]);
export const categoryTypeEnum = pgEnum("category_type", [
  "FOOD",
  "TRANSPORT",
  "ENTERTAINMENT",
  "BILLS",
  "SHOPPING",
  "HEALTH",
  "EDUCATION",
  "OTHER",
]);

export const categories = pgTable("category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const transactions = pgTable("transaction", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'income' or 'expense'
  categoryId: integer("category_id").references(() => categories.id),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  date: timestamp("date", { mode: "date" }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const budgets = pgTable("budget", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const savings = pgTable("savings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  targetAmount: integer("target_amount").notNull(),
  currentAmount: integer("current_amount").notNull().default(0),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  deadline: timestamp("deadline", { mode: "date" }),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
}); 