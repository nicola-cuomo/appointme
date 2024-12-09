import {
  integer,
  text,
  pgTable,
  serial,
  uuid,
  timestamp,
  pgEnum,
  AnyPgColumn,
  varchar,
  time,
  boolean,
  numeric,
} from "drizzle-orm/pg-core";
import { SQL, sql } from "drizzle-orm";
import { comment } from "postcss";
import { users } from "./schemaLogin";
import { dayOfWeek, estimateWaiting } from "./constants";

export const detBusiness = pgTable("det_business", {
  detBusinessId: uuid("det_business_id:uuid")
    .primaryKey()
    .defaultRandom()
    .notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  code: integer("code"),
  registrationDate: timestamp("registration_date", { mode: "string" }),
  type: varchar("type", { length: 30 }).notNull(),
  name: varchar("name", { length: 255 }).notNull().default("Business Details"),
  description: text("description"),
  image: text("image"),
  timezone: time("timezone").notNull(),
  isOpen: boolean("is_open").default(false),
  email: varchar("email", { length: 255 }),
  mobileNumber: integer("mobile_number"),
  telephoneNumber: integer("telephone_number"),
  city: varchar("city", { length: 50 }).notNull(),
  postalCode: integer("postal_code").notNull(),
  province: varchar("province", { length: 2 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  linkFacebook: varchar("link_facebook", { length: 255 }),
  linkInstagram: varchar("link_instagram", { length: 255 }),
  linkWeb: varchar("link_web", { length: 255 }),
  linkSpotify: varchar("link_spotify", { length: 255 }),
  linkEcommerce: varchar("link_ecommerce", { length: 255 }),
  linkExtra: varchar("link_extra", { length: 255 }),
  labelLinkExtra: varchar("label_link_extra", { length: 50 }),
  codeQr: varchar("code_qr", { length: 255 }),
  isEnabledRandomQrcode: boolean("is_random_qrcode").default(false).notNull(),
  isRequiredConfirmation: boolean("is_required_confirmation")
    .default(false)
    .notNull(),
  isRequiredAddress: boolean("is_required_address").default(false).notNull(),
  isRequiredName: boolean("is_required_name").default(false).notNull(),
  isRequiredEmail: boolean("is_required_email").default(false).notNull(),
  isRequiredPhoneNumber: boolean("is_required_phone_number")
    .default(false)
    .notNull(),
  isRequiredDateBirth: boolean("is_required_date_birth")
    .default(false)
    .notNull(),
  isRequiredVisitorsNumber: boolean("is_required_visitors_number")
    .default(false)
    .notNull(),
  isnotification: boolean("is_notifications").default(false).notNull(),
  isEmailNotifications: boolean("is_email_notifications")
    .default(false)
    .notNull(),
  isPushNotifications: boolean("is_push_notifications")
    .default(false)
    .notNull(),
  isWhatsappNotifications: boolean("is_whatsapp_notifications")
    .default(false)
    .notNull(),
  isSmsNotifications: boolean("is_sms_notifications").default(false).notNull(),
});

export const crossUserBusiness = pgTable("cross_user_business", {
  crossUserBusinessId: uuid("cross_user_business_id:uuid")
    .primaryKey()
    .defaultRandom()
    .notNull(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  detBusinessId: uuid("det_business_id::uuid")
    .references(() => detBusiness.detBusinessId, { onDelete: "cascade" })
    .unique()
    .notNull(),
});

export const detBusinessOpening = pgTable("det_business_opening", {
  detBusinessOpeningId: uuid("det_business_opening_id::uuid")
    .primaryKey()
    .defaultRandom()
    .notNull(),
  detBusinessId: uuid("det_business_id::uuid")
    .references(() => detBusiness.detBusinessId, { onDelete: "cascade" })
    .unique()
    .notNull(),
  dayOfWeek: dayOfWeek("day_of_week").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
});

export const detBusinessQueue = pgTable("det_business_queue", {
  detBusinessQueueId: uuid("det_business_queue_id::uuid")
    .primaryKey()
    .defaultRandom()
    .notNull(),
  detBusinessId: uuid("det_business_id::uuid")
    .references(() => detBusiness.detBusinessId, { onDelete: "cascade" })
    .unique()
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  isOpeningOnly: boolean("is_opening_only").default(false).notNull(),
  estimatedWaiting: estimateWaiting("estimated_waiting")
    .default("Automatic")
    .notNull(),
  timeEstimatedWaiting: integer("time_estimated_waiting").default(0),
  visitorBeforeNotify: integer("visitorBeforeNotify").default(1),
});

export const detBusinessService = pgTable("det_business_service", {
  detBusinessServiceId: uuid("det_business_appointment_opening_id::uuid")
    .primaryKey()
    .notNull(),
  detBusinessId: uuid("det_business_id::uuid")
    .references(() => detBusiness.detBusinessId, { onDelete: "cascade" })
    .unique()
    .notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  is_price_visible: boolean("is_price_visible").default(false),
  price: numeric("price", { precision: 7, scale: 2 }),
  duration: numeric("duration", { precision: 3, scale: 0 }),
});

export const detBusinessServiceOpening = pgTable(
  "det_business_service_opening",
  {
    detBusinessOpeningId: uuid("det_business_service_opening_id::uuid")
      .primaryKey()
      .notNull(),
    detBusinessServiceId: uuid("det_business_service_id::uuid")
      .references(() => detBusinessService.detBusinessServiceId, {
        onDelete: "cascade",
      })
      .unique()
      .notNull(),
    dayOfWeek: dayOfWeek("day_of_week").notNull(),
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
  },
);
