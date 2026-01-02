import { describe, expect, it } from "vitest";
import { getCurrentMatches, getMatchInfo, getFantasyMatchPoints } from "./_core/cricketApi";

describe("Cricket API - Match Info and Squad Data", () => {
  it("should fetch match info with squad details", async () => {
    // First get a current match
    const matches = await getCurrentMatches();
    
    expect(Array.isArray(matches)).toBe(true);
    
    if (matches.length > 0) {
      const firstMatch = matches[0];
      console.log('\n=== Testing Match ===');
      console.log('Match ID:', firstMatch.id);
      console.log('Match Name:', firstMatch.name);
      console.log('Status:', firstMatch.status);
      
      // Get detailed match info
      const matchInfo = await getMatchInfo(firstMatch.id);
      
      console.log('\n=== Match Info Response ===');
      console.log(JSON.stringify(matchInfo, null, 2));
      
      expect(matchInfo).toBeDefined();
      expect(matchInfo.id).toBe(firstMatch.id);
      
      // Check if squad data exists
      if ((matchInfo as any).squad) {
        console.log('\n=== Squad Data Found ===');
        console.log('Squad:', (matchInfo as any).squad);
      } else {
        console.log('\n⚠️  No squad data in match_info response');
      }
    } else {
      console.log('No matches available to test');
    }
  }, 15000);

  it("should fetch fantasy points for a match", async () => {
    const matches = await getCurrentMatches();
    
    if (matches.length > 0) {
      const match = matches.find(m => m.status === 'Completed' || m.status === 'Live');
      
      if (match) {
        console.log('\n=== Testing Fantasy Points ===');
        console.log('Match:', match.name);
        
        try {
          const fantasyData = await getFantasyMatchPoints(match.id);
          
          console.log('\n=== Fantasy Points Response ===');
          console.log('Players count:', fantasyData.players.length);
          console.log('Sample player:', fantasyData.players[0]);
          
          expect(fantasyData.matchId).toBe(match.id);
          expect(Array.isArray(fantasyData.players)).toBe(true);
        } catch (error) {
          console.log('Fantasy data not available for this match:', (error as Error).message);
        }
      } else {
        console.log('No completed or live matches to test fantasy points');
      }
    }
  }, 15000);
});
