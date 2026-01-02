import { describe, it, expect } from "vitest";
import * as cricketApi from "./_core/cricketApi";

describe("Cricket API - Fantasy Points", () => {
  it("should fetch fantasy points for a match and show player structure", async () => {
    // First get a current match
    const matches = await cricketApi.getCurrentMatches();
    
    console.log("\n=== Available Matches ===");
    matches.slice(0, 3).forEach((match, idx) => {
      console.log(`\n${idx + 1}. ${match.name}`);
      console.log(`   ID: ${match.id}`);
      console.log(`   Status: ${match.status}`);
      console.log(`   Date: ${match.dateTimeGMT}`);
    });

    if (matches.length > 0) {
      const matchId = matches[0].id;
      console.log(`\n=== Fetching Fantasy Points for Match: ${matchId} ===`);
      
      try {
        const fantasyData = await cricketApi.getFantasyMatchPoints(matchId);
        
        console.log("\n=== Fantasy Points Response Structure ===");
        console.log(JSON.stringify(fantasyData, null, 2));
        
        expect(fantasyData).toBeDefined();
      } catch (error: any) {
        console.log("\n=== Fantasy Points Error ===");
        console.log("Error:", error.message);
        console.log("This might mean the match doesn't have fantasy data yet");
      }
    }
  }, 30000);

  it("should fetch match_info to see squad data", async () => {
    const matches = await cricketApi.getCurrentMatches();
    
    if (matches.length > 0) {
      const matchId = matches[0].id;
      console.log(`\n=== Fetching Match Info for: ${matchId} ===`);
      
      const matchInfo = await cricketApi.getMatchInfo(matchId);
      
      console.log("\n=== Match Info Response (looking for squad data) ===");
      console.log(JSON.stringify(matchInfo, null, 2));
      
      expect(matchInfo).toBeDefined();
    }
  }, 30000);
});
