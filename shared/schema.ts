import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const assets = pgTable("assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'gmail' | 'drive'
  userName: text("user_name").notNull(),
  userEmail: text("user_email").notNull(),
  status: text("status").notNull(), // 'active' | 'pending' | 'inactive'
  configuredOn: timestamp("configured_on").notNull().defaultNow(),
});

export const policies = pgTable("policies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(), // 'gmail' | 'drive'
  usersMapped: integer("users_mapped").notNull().default(0),
  autoBackup: boolean("auto_backup").default(true),
  backupAllEmails: boolean("backup_all_emails").default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const backupJobs = pgTable("backup_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userEmail: text("user_email").notNull(),
  type: text("type").notNull(), // 'gmail' | 'drive'
  status: text("status").notNull(), // 'running' | 'completed' | 'failed'
  startedAt: timestamp("started_at").notNull().defaultNow(),
});

export const restoreJobs = pgTable("restore_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userEmail: text("user_email").notNull(),
  type: text("type").notNull(), // 'gmail' | 'drive'
  status: text("status").notNull(), // 'running' | 'completed' | 'failed'
  startedAt: timestamp("started_at").notNull().defaultNow(),
});

export const dashboardMetrics = pgTable("dashboard_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  activeUsers: integer("active_users").notNull().default(0),
  activeAssets: integer("active_assets").notNull().default(0),
  fullBackupsCompleted: integer("full_backups_completed").notNull().default(0),
  assetsNotProtected: integer("assets_not_protected").notNull().default(0),
  totalDataBackedUp: text("total_data_backed_up").notNull().default("0 TB"),
  currentlyRunningBackups: integer("currently_running_backups").notNull().default(0),
  completedRestores: integer("completed_restores").notNull().default(0),
  usersWithoutActiveAssets: integer("users_without_active_assets").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const appUsers = pgTable("app_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull().unique(),
  displayName: text("display_name").notNull(),
  emailAddress: text("email_address").notNull().unique(),
  status: text("status").notNull(), // 'active' | 'pending' | 'inactive'
  lastModified: timestamp("last_modified").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertAssetSchema = createInsertSchema(assets).omit({ id: true, configuredOn: true });
export const insertPolicySchema = createInsertSchema(policies).omit({ id: true, createdAt: true });
export const insertBackupJobSchema = createInsertSchema(backupJobs).omit({ id: true, startedAt: true });
export const insertRestoreJobSchema = createInsertSchema(restoreJobs).omit({ id: true, startedAt: true });
export const insertDashboardMetricsSchema = createInsertSchema(dashboardMetrics).omit({ id: true, updatedAt: true });
export const insertAppUserSchema = createInsertSchema(appUsers).omit({ id: true, lastModified: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Asset = typeof assets.$inferSelect;
export type InsertAsset = z.infer<typeof insertAssetSchema>;
export type Policy = typeof policies.$inferSelect;
export type InsertPolicy = z.infer<typeof insertPolicySchema>;
export type BackupJob = typeof backupJobs.$inferSelect;
export type InsertBackupJob = z.infer<typeof insertBackupJobSchema>;
export type RestoreJob = typeof restoreJobs.$inferSelect;
export type InsertRestoreJob = z.infer<typeof insertRestoreJobSchema>;
export type DashboardMetrics = typeof dashboardMetrics.$inferSelect;
export type InsertDashboardMetrics = z.infer<typeof insertDashboardMetricsSchema>;
export type AppUser = typeof appUsers.$inferSelect;
export type InsertAppUser = z.infer<typeof insertAppUserSchema>;
