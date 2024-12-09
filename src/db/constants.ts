import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin", "client"]);
export const accountTypeEnum = ["email", "google", "github"] as const;

export const dayOfWeek = pgEnum("dayOfWeek", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

export const estimateWaiting = pgEnum("estimatedWaiting", [
  "Automatic",
  "Constant",
  "Off",
]);
