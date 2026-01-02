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
