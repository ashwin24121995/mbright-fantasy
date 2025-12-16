import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

// Mock database functions
vi.mock("./db", () => ({
  getDb: vi.fn(() => Promise.resolve(null)),
  getUserByEmail: vi.fn(),
  createUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  upsertUser: vi.fn(),
  createPasswordResetToken: vi.fn(),
  getPasswordResetToken: vi.fn(),
  updateUserPassword: vi.fn(),
  deletePasswordResetToken: vi.fn(),
  getUserProfile: vi.fn(),
  updateUserProfile: vi.fn(),
  getUserTeams: vi.fn(),
  getUpcomingMatches: vi.fn(),
  getLiveMatches: vi.fn(),
  getCompletedMatches: vi.fn(),
  getMatchById: vi.fn(),
  getMatchPlayers: vi.fn(),
  createTeam: vi.fn(),
  addPlayerToTeam: vi.fn(),
  setCaptain: vi.fn(),
  setViceCaptain: vi.fn(),
  submitTeam: vi.fn(),
  getTeamPlayers: vi.fn(),
  getTeamForMatch: vi.fn(),
  getGlobalLeaderboard: vi.fn(),
}));

type CookieCall = {
  name: string;
  value: string;
  options: Record<string, unknown>;
};

function createMockContext(user: TrpcContext["user"] = null): { 
  ctx: TrpcContext; 
  setCookies: CookieCall[];
  clearedCookies: { name: string; options: Record<string, unknown> }[];
} {
  const setCookies: CookieCall[] = [];
  const clearedCookies: { name: string; options: Record<string, unknown> }[] = [];

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string, options: Record<string, unknown>) => {
        setCookies.push({ name, value, options });
      },
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, setCookies, clearedCookies };
}

describe("Custom Authentication", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("auth.me", () => {
    it("returns null when user is not authenticated", async () => {
      const { ctx } = createMockContext(null);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.me();

      expect(result).toBeNull();
    });

    it("returns user data when authenticated", async () => {
      const mockUser = {
        id: 1,
        openId: "test-user-123",
        email: "test@example.com",
        name: "Test User",
        loginMethod: "email",
        role: "user" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      };
      const { ctx } = createMockContext(mockUser);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.me();

      expect(result).toEqual(mockUser);
    });
  });

  describe("auth.logout", () => {
    it("clears the session cookie and reports success", async () => {
      const mockUser = {
        id: 1,
        openId: "test-user-123",
        email: "test@example.com",
        name: "Test User",
        loginMethod: "email",
        role: "user" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      };
      const { ctx, clearedCookies } = createMockContext(mockUser);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.logout();

      expect(result).toEqual({ success: true });
      expect(clearedCookies).toHaveLength(1);
      expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
      expect(clearedCookies[0]?.options).toMatchObject({
        maxAge: -1,
      });
    });
  });
});

describe("Input Validation", () => {
  it("validates email format for registration", async () => {
    const { ctx } = createMockContext(null);
    const caller = appRouter.createCaller(ctx);

    // Invalid email should throw
    await expect(
      caller.auth.register({
        name: "Test User",
        email: "invalid-email",
        password: "password123",
        dateOfBirth: "2000-01-01",
        state: "Maharashtra",
      })
    ).rejects.toThrow();
  });

  it("validates password length for registration", async () => {
    const { ctx } = createMockContext(null);
    const caller = appRouter.createCaller(ctx);

    // Short password should throw
    await expect(
      caller.auth.register({
        name: "Test User",
        email: "test@example.com",
        password: "short",
        dateOfBirth: "2000-01-01",
        state: "Maharashtra",
      })
    ).rejects.toThrow();
  });
});

describe("State Restrictions", () => {
  const restrictedStates = [
    "Andhra Pradesh",
    "Assam",
    "Nagaland",
    "Odisha",
    "Sikkim",
    "Telangana",
  ];

  restrictedStates.forEach((state) => {
    it(`rejects registration from restricted state: ${state}`, async () => {
      const { ctx } = createMockContext(null);
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.auth.register({
          name: "Test User",
          email: "test@example.com",
          password: "password123",
          dateOfBirth: "2000-01-01",
          state: state,
        })
      ).rejects.toThrow(/not available/i);
    });
  });
});

describe("Age Verification", () => {
  it("rejects users under 18 years old", async () => {
    const { ctx } = createMockContext(null);
    const caller = appRouter.createCaller(ctx);

    // Date that makes user 17 years old
    const underageDate = new Date();
    underageDate.setFullYear(underageDate.getFullYear() - 17);

    await expect(
      caller.auth.register({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        dateOfBirth: underageDate.toISOString().split("T")[0],
        state: "Maharashtra",
      })
    ).rejects.toThrow(/18 years/i);
  });
});
