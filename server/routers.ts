import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as db from "./db";
import * as cricketApi from "./_core/cricketApi";
import { SignJWT } from "jose";
import { ENV } from "./_core/env";

// Restricted states
const RESTRICTED_STATES = [
  "Andhra Pradesh",
  "Assam", 
  "Nagaland",
  "Odisha",
  "Sikkim",
  "Telangana"
];

// Simple password hashing (in production, use bcrypt)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + ENV.cookieSecret);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

// Generate JWT token
async function generateToken(userId: number, openId: string): Promise<string> {
  const secret = new TextEncoder().encode(ENV.cookieSecret);
  const token = await new SignJWT({ userId, openId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
  return token;
}

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),

    register: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(2),
        phone: z.string().optional(),
        dateOfBirth: z.string(),
        state: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Check if state is restricted
        if (RESTRICTED_STATES.includes(input.state)) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Registration is not available in your state due to government regulations.",
          });
        }

        // Check age (must be 18+)
        const dob = new Date(input.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        if (age < 18) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You must be 18 years or older to register.",
          });
        }

        // Check if email already exists
        const existingUser = await db.getUserByEmail(input.email);
        if (existingUser) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "An account with this email already exists.",
          });
        }

        // Hash password and create user
        const hashedPassword = await hashPassword(input.password);
        const result = await db.createUser({
          email: input.email,
          password: hashedPassword,
          name: input.name,
          phone: input.phone,
          dateOfBirth: dob,
          state: input.state,
        });

        if (!result) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create account. Please try again.",
          });
        }

        // Generate token and set cookie
        const token = await generateToken(result.id, result.openId);
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, token, cookieOptions);

        return { success: true, message: "Account created successfully!" };
      }),

    login: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const user = await db.getUserByEmail(input.email);
        if (!user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password.",
          });
        }

        // Check if user is from restricted state
        if (user.state && RESTRICTED_STATES.includes(user.state)) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Access is not available in your state due to government regulations.",
          });
        }

        // Verify password
        const isValid = await verifyPassword(input.password, user.password);
        if (!isValid) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password.",
          });
        }

        // Check if blocked
        if (user.isBlocked) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Your account has been suspended.",
          });
        }

        // Update last sign in
        await db.updateUserLastSignIn(user.id);

        // Generate token and set cookie
        const token = await generateToken(user.id, user.openId);
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, token, cookieOptions);

        return { success: true, user: { id: user.id, name: user.name, email: user.email } };
      }),

    forgotPassword: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        const user = await db.getUserByEmail(input.email);
        if (!user) {
          // Don't reveal if email exists
          return { success: true, message: "If an account exists with this email, you will receive a password reset link." };
        }

        const token = await db.createPasswordResetToken(user.id);
        // In production, send email with reset link
        console.log(`Password reset token for ${input.email}: ${token}`);

        return { success: true, message: "If an account exists with this email, you will receive a password reset link." };
      }),

    resetPassword: publicProcedure
      .input(z.object({
        token: z.string(),
        newPassword: z.string().min(8),
      }))
      .mutation(async ({ input }) => {
        const resetRecord = await db.getPasswordResetByToken(input.token);
        if (!resetRecord) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid or expired reset token.",
          });
        }

        const hashedPassword = await hashPassword(input.newPassword);
        await db.updateUserPassword(resetRecord.userId, hashedPassword);
        await db.markPasswordResetUsed(resetRecord.id);

        return { success: true, message: "Password reset successfully!" };
      }),
  }),

  user: router({
    profile: protectedProcedure.query(async ({ ctx }) => {
      const user = await db.getUserById(ctx.user.id);
      if (!user) throw new TRPCError({ code: "NOT_FOUND" });
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        state: user.state,
        totalPoints: user.totalPoints,
        matchesPlayed: user.matchesPlayed,
        createdAt: user.createdAt,
      };
    }),

    updateProfile: protectedProcedure
      .input(z.object({
        name: z.string().min(2).optional(),
        phone: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updateUserProfile(ctx.user.id, input);
        return { success: true };
      }),

    changePassword: protectedProcedure
      .input(z.object({
        currentPassword: z.string(),
        newPassword: z.string().min(8),
      }))
      .mutation(async ({ ctx, input }) => {
        const user = await db.getUserById(ctx.user.id);
        if (!user) throw new TRPCError({ code: "NOT_FOUND" });

        const isValid = await verifyPassword(input.currentPassword, user.password);
        if (!isValid) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Current password is incorrect.",
          });
        }

        const hashedPassword = await hashPassword(input.newPassword);
        await db.updateUserPassword(ctx.user.id, hashedPassword);
        return { success: true };
      }),

    myTeams: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserTeams(ctx.user.id);
    }),
  }),

  matches: router({
    // Get all current matches from Cricket API (live + upcoming)
    current: publicProcedure.query(async () => {
      return await cricketApi.getCurrentMatches();
    }),

    // Get live matches from Cricket API
    live: publicProcedure.query(async () => {
      return await cricketApi.getLiveMatches();
    }),

    // Get upcoming matches from Cricket API
    upcoming: publicProcedure.query(async () => {
      return await cricketApi.getUpcomingMatches();
    }),

    // Get completed matches from Cricket API
    completed: publicProcedure.query(async () => {
      return await cricketApi.getCompletedMatches();
    }),

    // Get match details by API ID
    getByApiId: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await cricketApi.getMatchInfo(input.id);
      }),

    // Get match scorecard
    scorecard: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        return await cricketApi.getMatchScorecard(input.matchId);
      }),

    // Get fantasy points for a match
    fantasyPoints: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        return await cricketApi.getFantasyMatchPoints(input.matchId);
      }),

    // Legacy database methods (for user-created teams)
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getMatchById(input.id);
      }),

    getPlayers: publicProcedure
      .input(z.object({ matchApiId: z.string() }))
      .query(async ({ input }) => {
        // Get match info which includes squad data
        const matchInfo = await cricketApi.getMatchInfo(input.matchApiId);
        
        // For now, return empty array - will be populated from fantasy points API
        // TODO: Fetch players from fantasy points endpoint
        return [];
      }),
  }),

  teams: router({
    create: protectedProcedure
      .input(z.object({
        matchApiId: z.string(),
        teamName: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Check if user already has a team for this match
        const existing = await db.getUserTeamForMatch(ctx.user.id, input.matchApiId);
        if (existing) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "You already have a team for this match.",
          });
        }

        return await db.createUserTeam(ctx.user.id, input.matchApiId, input.teamName);
      }),

    getForMatch: protectedProcedure
      .input(z.object({ matchApiId: z.string() }))
      .query(async ({ ctx, input }) => {
        return await db.getUserTeamForMatch(ctx.user.id, input.matchApiId);
      }),

    getPlayers: protectedProcedure
      .input(z.object({ teamId: z.number() }))
      .query(async ({ input }) => {
        return await db.getTeamPlayers(input.teamId);
      }),

    addPlayer: protectedProcedure
      .input(z.object({
        teamId: z.number(),
        playerApiId: z.string(),
        playerName: z.string(),
        playerRole: z.string().optional(),
        playerTeam: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Check team has less than 11 players
        const currentPlayers = await db.getTeamPlayers(input.teamId);
        if (currentPlayers.length >= 11) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Team already has 11 players.",
          });
        }

        await db.addPlayerToTeam(input.teamId, input.playerApiId, input.playerName, input.playerRole, input.playerTeam);
        return { success: true };
      }),

    removePlayer: protectedProcedure
      .input(z.object({
        teamId: z.number(),
        playerApiId: z.string(),
      }))
      .mutation(async ({ input }) => {
        await db.removePlayerFromTeam(input.teamId, input.playerApiId);
        return { success: true };
      }),

    setCaptain: protectedProcedure
      .input(z.object({
        teamId: z.number(),
        playerApiId: z.string(),
      }))
      .mutation(async ({ input }) => {
        await db.setCaptain(input.teamId, input.playerApiId);
        return { success: true };
      }),

    setViceCaptain: protectedProcedure
      .input(z.object({
        teamId: z.number(),
        playerApiId: z.string(),
      }))
      .mutation(async ({ input }) => {
        await db.setViceCaptain(input.teamId, input.playerApiId);
        return { success: true };
      }),

    submit: protectedProcedure
      .input(z.object({ teamId: z.number() }))
      .mutation(async ({ input }) => {
        // Validate team has 11 players
        const players = await db.getTeamPlayers(input.teamId);
        if (players.length !== 11) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Team must have exactly 11 players.",
          });
        }

        // Captain and vice-captain validation is handled at team level
        // No need to check individual player flags

        await db.submitTeam(input.teamId);
        return { success: true };
      }),
  }),

  leaderboard: router({
    global: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return await db.getGlobalLeaderboard(input.limit || 100);
      }),

    match: publicProcedure
      .input(z.object({
        matchId: z.number(),
        limit: z.number().optional(),
      }))
      .query(async ({ input }) => {
        return await db.getMatchLeaderboard(input.matchId, input.limit || 100);
      }),
  }),

  blog: router({
    list: publicProcedure.query(async () => {
      return await db.getPublishedBlogPosts();
    }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getBlogPostBySlug(input.slug);
      }),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(2),
        email: z.string().email(),
        subject: z.string().min(5),
        message: z.string().min(10),
      }))
      .mutation(async ({ input }) => {
        await db.createContactMessage(input);
        return { success: true, message: "Message sent successfully!" };
      }),
  }),
});

export type AppRouter = typeof appRouter;
