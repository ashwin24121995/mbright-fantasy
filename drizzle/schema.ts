import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/mysql-core";

// Custom users table for email/password authentication
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  dateOfBirth: timestamp("dateOfBirth"),
  state: varchar("state", { length: 100 }),
  isVerified: boolean("isVerified").default(false).notNull(),
  isBlocked: boolean("isBlocked").default(false).notNull(),
  loginMethod: varchar("loginMethod", { length: 64 }).default("email"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  totalPoints: int("totalPoints").default(0).notNull(),
  matchesPlayed: int("matchesPlayed").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

// Password reset tokens
export const passwordResets = mysqlTable("password_resets", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  used: boolean("used").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Cricket matches
export const matches = mysqlTable("matches", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  team1: varchar("team1", { length: 100 }).notNull(),
  team2: varchar("team2", { length: 100 }).notNull(),
  team1Logo: varchar("team1Logo", { length: 500 }),
  team2Logo: varchar("team2Logo", { length: 500 }),
  venue: varchar("venue", { length: 255 }),
  matchType: mysqlEnum("matchType", ["T20", "ODI", "Test"]).default("T20").notNull(),
  status: mysqlEnum("status", ["upcoming", "live", "completed"]).default("upcoming").notNull(),
  startTime: timestamp("startTime").notNull(),
  endTime: timestamp("endTime"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Cricket players
export const players = mysqlTable("players", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  team: varchar("team", { length: 100 }).notNull(),
  role: mysqlEnum("role", ["batsman", "bowler", "all-rounder", "wicket-keeper"]).notNull(),
  credits: decimal("credits", { precision: 4, scale: 1 }).default("8.0").notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }),
  battingAvg: decimal("battingAvg", { precision: 5, scale: 2 }),
  bowlingAvg: decimal("bowlingAvg", { precision: 5, scale: 2 }),
  strikeRate: decimal("strikeRate", { precision: 6, scale: 2 }),
  economyRate: decimal("economyRate", { precision: 4, scale: 2 }),
  totalPoints: int("totalPoints").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Match players (players available for a specific match)
export const matchPlayers = mysqlTable("match_players", {
  id: int("id").autoincrement().primaryKey(),
  matchId: int("matchId").notNull(),
  playerId: int("playerId").notNull(),
  teamName: varchar("teamName", { length: 100 }).notNull(),
  pointsScored: int("pointsScored").default(0).notNull(),
});

// User teams
export const userTeams = mysqlTable("user_teams", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  matchId: int("matchId").notNull(),
  teamName: varchar("teamName", { length: 100 }).default("My Team").notNull(),
  captainId: int("captainId"),
  viceCaptainId: int("viceCaptainId"),
  totalPoints: int("totalPoints").default(0).notNull(),
  rank: int("rank"),
  isSubmitted: boolean("isSubmitted").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Team players (players selected in a user's team)
export const teamPlayers = mysqlTable("team_players", {
  id: int("id").autoincrement().primaryKey(),
  teamId: int("teamId").notNull(),
  playerId: int("playerId").notNull(),
  isCaptain: boolean("isCaptain").default(false).notNull(),
  isViceCaptain: boolean("isViceCaptain").default(false).notNull(),
});

// Blog posts
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }),
  authorId: int("authorId").notNull(),
  isPublished: boolean("isPublished").default(false).notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Contact messages
export const contactMessages = mysqlTable("contact_messages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Match = typeof matches.$inferSelect;
export type Player = typeof players.$inferSelect;
export type UserTeam = typeof userTeams.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
