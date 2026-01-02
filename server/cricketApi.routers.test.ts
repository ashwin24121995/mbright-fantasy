import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Create a mock context for testing
function createMockContext(): TrpcContext {
  return {
    user: undefined,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      cookie: () => {},
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Cricket API Routers", () => {
  it("should fetch current matches from Cricket API", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const matches = await caller.matches.current();

    // Should return an array
    expect(Array.isArray(matches)).toBe(true);

    // If matches exist, verify structure
    if (matches.length > 0) {
      const firstMatch = matches[0];
      expect(firstMatch).toHaveProperty('id');
      expect(firstMatch).toHaveProperty('name');
      expect(firstMatch).toHaveProperty('matchType');
      expect(firstMatch).toHaveProperty('status');
      expect(firstMatch).toHaveProperty('teams');
      expect(Array.isArray(firstMatch.teams)).toBe(true);
    }
  }, 10000);

  it("should fetch upcoming matches from Cricket API", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const matches = await caller.matches.upcoming();

    // Should return an array
    expect(Array.isArray(matches)).toBe(true);

    // All matches should have status "Match not started"
    matches.forEach(match => {
      expect(match.status).toBe("Match not started");
    });
  }, 10000);

  it("should fetch live matches from Cricket API", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const matches = await caller.matches.live();

    // Should return an array
    expect(Array.isArray(matches)).toBe(true);

    // All matches should have status "Live" or have matchStatus property
    matches.forEach(match => {
      const isLive = match.status === "Live" || match.matchStatus !== undefined;
      expect(isLive).toBe(true);
    });
  }, 10000);

  it("should fetch completed matches from Cricket API", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const matches = await caller.matches.completed();

    // Should return an array
    expect(Array.isArray(matches)).toBe(true);

    // All matches should have status "Completed"
    matches.forEach(match => {
      expect(match.status).toBe("Completed");
    });
  }, 10000);
});
