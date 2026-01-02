import axios from 'axios';

const BASE_URL = 'https://api.cricapi.com/v1';
const API_KEY = process.env.CRICKET_API_KEY;

if (!API_KEY) {
  console.warn('[Cricket API] CRICKET_API_KEY environment variable is not set');
}

// TypeScript interfaces based on API documentation
export interface CricketMatch {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo: Array<{
    name: string;
    img: string;
    shortname: string;
  }>;
  score?: Array<{
    r: number;
    w: number;
    o: number;
    inning: string;
  }>;
  matchStatus?: string;
}

export interface Player {
  id: string;
  name: string;
  role: 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper';
  team: string;
  credits: number;
  points?: number;
  image?: string;
}

export interface MatchSquad {
  matchId: string;
  teams: Array<{
    name: string;
    players: Player[];
  }>;
}

export interface FantasyMatchPoints {
  matchId: string;
  players: Array<{
    playerId: string;
    name: string;
    points: number;
    batting: {
      runs: number;
      fours: number;
      sixes: number;
      strikeRate: number;
    };
    bowling: {
      wickets: number;
      economy: number;
      maidens: number;
    };
    fielding: {
      catches: number;
      runOuts: number;
    };
  }>;
}

/**
 * Get all current matches (live + upcoming)
 */
export async function getCurrentMatches(): Promise<CricketMatch[]> {
  try {
    const response = await axios.get(`${BASE_URL}/currentMatches`, {
      params: { apikey: API_KEY }
    });
    
    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error('[Cricket API] Error fetching current matches:', error);
    throw new Error('Failed to fetch current matches');
  }
}

/**
 * Get live matches only
 */
export async function getLiveMatches(): Promise<CricketMatch[]> {
  const matches = await getCurrentMatches();
  return matches.filter(match => match.status === 'Live' || match.matchStatus);
}

/**
 * Get upcoming matches only
 */
export async function getUpcomingMatches(): Promise<CricketMatch[]> {
  const matches = await getCurrentMatches();
  return matches.filter(match => match.status === 'Match not started');
}

/**
 * Get completed matches
 */
export async function getCompletedMatches(): Promise<CricketMatch[]> {
  const matches = await getCurrentMatches();
  return matches.filter(match => match.status === 'Completed');
}

/**
 * Get match details by ID
 */
export async function getMatchInfo(matchId: string): Promise<CricketMatch> {
  try {
    const response = await axios.get(`${BASE_URL}/match_info`, {
      params: { 
        apikey: API_KEY,
        id: matchId 
      }
    });
    
    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    throw new Error('Match not found');
  } catch (error) {
    console.error('[Cricket API] Error fetching match info:', error);
    throw new Error('Failed to fetch match information');
  }
}

/**
 * Get match scorecard
 */
export async function getMatchScorecard(matchId: string): Promise<any> {
  try {
    const response = await axios.get(`${BASE_URL}/match_scorecard`, {
      params: { 
        apikey: API_KEY,
        id: matchId 
      }
    });
    
    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error('[Cricket API] Error fetching match scorecard:', error);
    throw new Error('Failed to fetch match scorecard');
  }
}

/**
 * Get match squad/players
 * Note: Cricket API may not provide detailed squad info for all matches
 * This function attempts to extract available player data from match info
 */
export async function getMatchSquad(matchId: string): Promise<MatchSquad | null> {
  try {
    const matchInfo = await getMatchInfo(matchId);
    
    // Try to get fantasy summary which includes player names
    try {
      const fantasyData = await getFantasyMatchPoints(matchId);
      
      // Group players by team
      const team1Players: Player[] = [];
      const team2Players: Player[] = [];
      
      fantasyData.players.forEach((player, index) => {
        const playerData: Player = {
          id: player.playerId || `player-${index}`,
          name: player.name,
          role: determinePlayerRole(player),
          team: index < fantasyData.players.length / 2 ? matchInfo.teams[0] : matchInfo.teams[1],
          credits: calculatePlayerCredits(player.points || 0),
          points: player.points,
        };
        
        if (index < fantasyData.players.length / 2) {
          team1Players.push(playerData);
        } else {
          team2Players.push(playerData);
        }
      });
      
      return {
        matchId,
        teams: [
          { name: matchInfo.teams[0], players: team1Players },
          { name: matchInfo.teams[1], players: team2Players },
        ],
      };
    } catch (fantasyError) {
      // Fantasy data not available, return basic squad structure
      console.warn('[Cricket API] Fantasy data not available for match:', matchId);
      return null;
    }
  } catch (error) {
    console.error('[Cricket API] Error fetching match squad:', error);
    return null;
  }
}

/**
 * Determine player role based on fantasy stats
 */
function determinePlayerRole(player: any): Player['role'] {
  const { batting, bowling, fielding } = player;
  
  if (fielding?.catches > 2 || fielding?.runOuts > 1) {
    return 'wicket-keeper';
  }
  
  if (batting?.runs > 0 && bowling?.wickets > 0) {
    return 'all-rounder';
  }
  
  if (bowling?.wickets > 0 || bowling?.maidens > 0) {
    return 'bowler';
  }
  
  return 'batsman';
}

/**
 * Calculate player credits based on fantasy points (scale 0-100 points to 7-11 credits)
 */
function calculatePlayerCredits(points: number): number {
  if (points >= 80) return 11;
  if (points >= 60) return 10;
  if (points >= 40) return 9;
  if (points >= 20) return 8;
  return 7;
}

/**
 * Get fantasy points for a match
 */
export async function getFantasyMatchPoints(matchId: string): Promise<FantasyMatchPoints> {
  try {
    const response = await axios.get(`${BASE_URL}/fantasySummary`, {
      params: { 
        apikey: API_KEY,
        id: matchId 
      }
    });
    
    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    throw new Error('Fantasy points not available');
  } catch (error) {
    console.error('[Cricket API] Error fetching fantasy points:', error);
    throw new Error('Failed to fetch fantasy points');
  }
}
