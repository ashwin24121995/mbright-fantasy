import { describe, it, expect } from "vitest";
import * as cricketApi from "./_core/cricketApi";

describe("Cricket API - Match Squad", () => {
  it("should fetch squad data for a match", async () => {
    // First get a current match
    const matches = await cricketApi.getCurrentMatches();
    
    console.log("\n=== Available Matches ===");
    matches.slice(0, 3).forEach((match, idx) => {
      console.log(`\n${idx + 1}. ${match.name}`);
      console.log(`   ID: ${match.id}`);
      console.log(`   Status: ${match.status}`);
    });

    if (matches.length > 0) {
      const matchId = matches[0].id;
      console.log(`\n=== Fetching Squad for Match: ${matchId} ===`);
      
      const squadData = await cricketApi.getMatchSquad(matchId);
      
      if (squadData) {
        console.log("\n=== Squad Data ===");
        console.log(`Match ID: ${squadData.matchId}`);
        console.log(`\nTeam 1: ${squadData.teams[0].name}`);
        console.log(`Players: ${squadData.teams[0].players.length}`);
        squadData.teams[0].players.slice(0, 3).forEach(player => {
          console.log(`  - ${player.name} (${player.role}) - ${player.credits} credits`);
        });
        
        console.log(`\nTeam 2: ${squadData.teams[1].name}`);
        console.log(`Players: ${squadData.teams[1].players.length}`);
        squadData.teams[1].players.slice(0, 3).forEach(player => {
          console.log(`  - ${player.name} (${player.role}) - ${player.credits} credits`);
        });
        
        // Verify structure
        expect(squadData).toBeDefined();
        expect(squadData.teams).toHaveLength(2);
        expect(squadData.teams[0].players.length).toBeGreaterThan(0);
        expect(squadData.teams[1].players.length).toBeGreaterThan(0);
        
        // Verify player structure
        const firstPlayer = squadData.teams[0].players[0];
        expect(firstPlayer).toHaveProperty('id');
        expect(firstPlayer).toHaveProperty('name');
        expect(firstPlayer).toHaveProperty('role');
        expect(firstPlayer).toHaveProperty('team');
        expect(firstPlayer).toHaveProperty('credits');
        
        console.log("\n✅ Squad data structure is correct!");
      } else {
        console.log("\n⚠️  Squad data not available for this match");
      }
    }
  }, 30000);
});
