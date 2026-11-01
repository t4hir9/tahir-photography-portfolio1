import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
export const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
export const portfolioItems = pgTable("portfolio_items", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    type: text("type").notNull(), // 'photo' | 'video'
    url: text("url").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    category: text("category"), // 'landscape', 'portrait', 'commercial', etc.
    createdAt: timestamp("created_at").defaultNow(),
});
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });
export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).omit({ id: true, createdAt: true });
