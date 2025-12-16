import { eq, desc, and, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  users, InsertUser, 
  matches, players, matchPlayers, 
  userTeams, teamPlayers, 
  blogPosts, contactMessages,
  passwordResets
} from "../drizzle/schema";
import { ENV } from './_core/env';
import { nanoid } from 'nanoid';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// User functions for custom auth
export async function createUser(userData: {
  email: string;
  password: string;
  name: string;
  phone?: string;
  dateOfBirth?: Date;
  state?: string;
}): Promise<{ id: number; openId: string } | null> {
  const db = await getDb();
  if (!db) return null;

  const openId = nanoid(32);
  
  await db.insert(users).values({
    openId,
    email: userData.email,
    password: userData.password,
    name: userData.name,
    phone: userData.phone || null,
    dateOfBirth: userData.dateOfBirth || null,
    state: userData.state || null,
    loginMethod: "email",
  });

  const result = await db.select().from(users).where(eq(users.email, userData.email)).limit(1);
  return result[0] ? { id: result[0].id, openId: result[0].openId } : null;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserLastSignIn(userId: number) {
  const db = await getDb();
  if (!db) return;

  await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, userId));
}

export async function updateUserProfile(userId: number, data: { name?: string; phone?: string; state?: string }) {
  const db = await getDb();
  if (!db) return;

  await db.update(users).set(data).where(eq(users.id, userId));
}

export async function updateUserPassword(userId: number, password: string) {
  const db = await getDb();
  if (!db) return;

  await db.update(users).set({ password }).where(eq(users.id, userId));
}

// Password reset functions
export async function createPasswordResetToken(userId: number): Promise<string | null> {
  const db = await getDb();
  if (!db) return null;

  const token = nanoid(64);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await db.insert(passwordResets).values({
    userId,
    token,
    expiresAt,
  });

  return token;
}

export async function getPasswordResetByToken(token: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(passwordResets)
    .where(and(
      eq(passwordResets.token, token),
      eq(passwordResets.used, false),
      gte(passwordResets.expiresAt, new Date())
    ))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function markPasswordResetUsed(id: number) {
  const db = await getDb();
  if (!db) return;

  await db.update(passwordResets).set({ used: true }).where(eq(passwordResets.id, id));
}

// Match functions
export async function getUpcomingMatches() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(matches)
    .where(eq(matches.status, "upcoming"))
    .orderBy(matches.startTime);
}

export async function getLiveMatches() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(matches)
    .where(eq(matches.status, "live"))
    .orderBy(matches.startTime);
}

export async function getCompletedMatches() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(matches)
    .where(eq(matches.status, "completed"))
    .orderBy(desc(matches.startTime));
}

export async function getMatchById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(matches).where(eq(matches.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Player functions
export async function getPlayersForMatch(matchId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select({
    matchPlayer: matchPlayers,
    player: players,
  })
    .from(matchPlayers)
    .innerJoin(players, eq(matchPlayers.playerId, players.id))
    .where(eq(matchPlayers.matchId, matchId));

  return result.map(r => ({
    ...r.player,
    teamName: r.matchPlayer.teamName,
    pointsScored: r.matchPlayer.pointsScored,
  }));
}

export async function getAllPlayers() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(players);
}

// User team functions
export async function createUserTeam(userId: number, matchId: number, teamName: string = "My Team") {
  const db = await getDb();
  if (!db) return null;

  await db.insert(userTeams).values({
    userId,
    matchId,
    teamName,
  });

  const result = await db.select().from(userTeams)
    .where(and(eq(userTeams.userId, userId), eq(userTeams.matchId, matchId)))
    .orderBy(desc(userTeams.createdAt))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getUserTeamForMatch(userId: number, matchId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(userTeams)
    .where(and(eq(userTeams.userId, userId), eq(userTeams.matchId, matchId)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserTeams(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(userTeams)
    .where(eq(userTeams.userId, userId))
    .orderBy(desc(userTeams.createdAt));
}

export async function addPlayerToTeam(teamId: number, playerId: number) {
  const db = await getDb();
  if (!db) return;

  await db.insert(teamPlayers).values({ teamId, playerId });
}

export async function removePlayerFromTeam(teamId: number, playerId: number) {
  const db = await getDb();
  if (!db) return;

  await db.delete(teamPlayers).where(
    and(eq(teamPlayers.teamId, teamId), eq(teamPlayers.playerId, playerId))
  );
}

export async function getTeamPlayers(teamId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select({
    teamPlayer: teamPlayers,
    player: players,
  })
    .from(teamPlayers)
    .innerJoin(players, eq(teamPlayers.playerId, players.id))
    .where(eq(teamPlayers.teamId, teamId));

  return result.map(r => ({
    ...r.player,
    isCaptain: r.teamPlayer.isCaptain,
    isViceCaptain: r.teamPlayer.isViceCaptain,
  }));
}

export async function setCaptain(teamId: number, playerId: number) {
  const db = await getDb();
  if (!db) return;

  // Reset all captains first
  await db.update(teamPlayers).set({ isCaptain: false }).where(eq(teamPlayers.teamId, teamId));
  // Set new captain
  await db.update(teamPlayers).set({ isCaptain: true })
    .where(and(eq(teamPlayers.teamId, teamId), eq(teamPlayers.playerId, playerId)));
  // Update user team
  await db.update(userTeams).set({ captainId: playerId }).where(eq(userTeams.id, teamId));
}

export async function setViceCaptain(teamId: number, playerId: number) {
  const db = await getDb();
  if (!db) return;

  await db.update(teamPlayers).set({ isViceCaptain: false }).where(eq(teamPlayers.teamId, teamId));
  await db.update(teamPlayers).set({ isViceCaptain: true })
    .where(and(eq(teamPlayers.teamId, teamId), eq(teamPlayers.playerId, playerId)));
  await db.update(userTeams).set({ viceCaptainId: playerId }).where(eq(userTeams.id, teamId));
}

export async function submitTeam(teamId: number) {
  const db = await getDb();
  if (!db) return;

  await db.update(userTeams).set({ isSubmitted: true }).where(eq(userTeams.id, teamId));
}

// Leaderboard functions
export async function getGlobalLeaderboard(limit: number = 100) {
  const db = await getDb();
  if (!db) return [];

  return await db.select({
    id: users.id,
    name: users.name,
    totalPoints: users.totalPoints,
    matchesPlayed: users.matchesPlayed,
  })
    .from(users)
    .orderBy(desc(users.totalPoints))
    .limit(limit);
}

export async function getMatchLeaderboard(matchId: number, limit: number = 100) {
  const db = await getDb();
  if (!db) return [];

  return await db.select({
    id: userTeams.id,
    userId: userTeams.userId,
    teamName: userTeams.teamName,
    totalPoints: userTeams.totalPoints,
    rank: userTeams.rank,
    userName: users.name,
  })
    .from(userTeams)
    .innerJoin(users, eq(userTeams.userId, users.id))
    .where(and(eq(userTeams.matchId, matchId), eq(userTeams.isSubmitted, true)))
    .orderBy(desc(userTeams.totalPoints))
    .limit(limit);
}

// Blog functions
export async function getPublishedBlogPosts() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(blogPosts)
    .where(eq(blogPosts.isPublished, true))
    .orderBy(desc(blogPosts.publishedAt));
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, true)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Contact functions
export async function createContactMessage(data: { name: string; email: string; subject: string; message: string }) {
  const db = await getDb();
  if (!db) return null;

  await db.insert(contactMessages).values(data);
  return true;
}

// Legacy upsertUser function for compatibility with OAuth flow
export async function upsertUser(user: { openId: string; name?: string | null; email?: string | null; loginMethod?: string | null; lastSignedIn?: Date }): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const existing = await getUserByOpenId(user.openId);
    if (existing) {
      // Update existing user
      const updateData: Record<string, unknown> = { lastSignedIn: new Date() };
      if (user.name) updateData.name = user.name;
      if (user.email) updateData.email = user.email;
      if (user.loginMethod) updateData.loginMethod = user.loginMethod;
      await db.update(users).set(updateData).where(eq(users.openId, user.openId));
    } else {
      // Create new user with OAuth data - generate placeholder password
      await db.insert(users).values({
        openId: user.openId,
        email: user.email || `${user.openId}@oauth.placeholder`,
        password: 'oauth_user_no_password',
        name: user.name || 'User',
        loginMethod: user.loginMethod || 'oauth',
        lastSignedIn: user.lastSignedIn || new Date(),
      });
    }
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
