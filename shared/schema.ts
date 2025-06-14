import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const jerseys = pgTable("jerseys", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(), // price in paise/cents
  originalPrice: integer("original_price"), // for showing discounts
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // "club", "national", "retro"
  tags: text("tags").array().default([]), // ["featured", "popular", "new"]
  description: text("description"),
  team: text("team").notNull(),
  season: text("season"),
  isActive: boolean("is_active").default(true),
});

export const banners = pgTable("banners", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  imageUrl: text("image_url").notNull(),
  ctaText: text("cta_text"),
  ctaLink: text("cta_link"),
  isActive: boolean("is_active").default(true),
  order: integer("order").default(0),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  jerseyId: integer("jersey_id").references(() => jerseys.id),
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  size: text("size"),
  status: text("status").default("pending"), // "pending", "confirmed", "shipped"
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertJerseySchema = createInsertSchema(jerseys).omit({
  id: true,
});

export const insertBannerSchema = createInsertSchema(banners).omit({
  id: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export type Jersey = typeof jerseys.$inferSelect;
export type InsertJersey = z.infer<typeof insertJerseySchema>;
export type Banner = typeof banners.$inferSelect;
export type InsertBanner = z.infer<typeof insertBannerSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
