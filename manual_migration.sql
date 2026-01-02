-- Manual migration to update schema for Cricket API integration

-- Update matches table
ALTER TABLE matches ADD COLUMN IF NOT EXISTS apiMatchId VARCHAR(255);
CREATE UNIQUE INDEX IF NOT EXISTS idx_matches_apiMatchId ON matches(apiMatchId);

-- Update user_teams table
ALTER TABLE user_teams ADD COLUMN IF NOT EXISTS matchApiId VARCHAR(255);
ALTER TABLE user_teams ADD COLUMN IF NOT EXISTS captainApiId VARCHAR(255);
ALTER TABLE user_teams ADD COLUMN IF NOT EXISTS viceCaptainApiId VARCHAR(255);

-- Drop old columns from user_teams if they exist
ALTER TABLE user_teams DROP COLUMN IF EXISTS matchId;
ALTER TABLE user_teams DROP COLUMN IF EXISTS captainId;
ALTER TABLE user_teams DROP COLUMN IF EXISTS viceCaptainId;

-- Update team_players table
ALTER TABLE team_players ADD COLUMN IF NOT EXISTS playerApiId VARCHAR(255);
ALTER TABLE team_players ADD COLUMN IF NOT EXISTS playerName VARCHAR(100);
ALTER TABLE team_players ADD COLUMN IF NOT EXISTS playerRole VARCHAR(50);
ALTER TABLE team_players ADD COLUMN IF NOT EXISTS playerTeam VARCHAR(100);
ALTER TABLE team_players ADD COLUMN IF NOT EXISTS pointsEarned INT DEFAULT 0;

-- Drop old columns from team_players if they exist
ALTER TABLE team_players DROP COLUMN IF EXISTS playerId;
ALTER TABLE team_players DROP COLUMN IF EXISTS isCaptain;
ALTER TABLE team_players DROP COLUMN IF EXISTS isViceCaptain;
