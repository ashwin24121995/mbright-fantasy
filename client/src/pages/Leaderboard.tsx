import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, Trophy, Medal, Award } from "lucide-react";

export default function Leaderboard() {
  const leaderboardQuery = trpc.leaderboard.global.useQuery({ limit: 100 });

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground">{index + 1}</span>;
    }
  };

  const getRankBg = (index: number) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200";
      case 1:
        return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200";
      case 2:
        return "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">Top fantasy cricket players</p>
        </div>

        {/* Top 3 Podium */}
        {leaderboardQuery.data && leaderboardQuery.data.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            {/* 2nd Place */}
            <div className="flex flex-col items-center pt-8">
              <div className="w-16 h-16 rounded-full bg-gray-100 border-4 border-gray-300 flex items-center justify-center mb-2">
                <span className="text-xl font-bold">2</span>
              </div>
              <p className="font-semibold text-sm text-center truncate w-full">{leaderboardQuery.data[1]?.name}</p>
              <p className="text-lg font-bold text-primary">{leaderboardQuery.data[1]?.totalPoints} pts</p>
            </div>
            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
              <div className="w-20 h-20 rounded-full bg-yellow-100 border-4 border-yellow-400 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold">1</span>
              </div>
              <p className="font-semibold text-center truncate w-full">{leaderboardQuery.data[0]?.name}</p>
              <p className="text-xl font-bold text-primary">{leaderboardQuery.data[0]?.totalPoints} pts</p>
            </div>
            {/* 3rd Place */}
            <div className="flex flex-col items-center pt-12">
              <div className="w-14 h-14 rounded-full bg-amber-100 border-4 border-amber-400 flex items-center justify-center mb-2">
                <span className="text-lg font-bold">3</span>
              </div>
              <p className="font-semibold text-sm text-center truncate w-full">{leaderboardQuery.data[2]?.name}</p>
              <p className="text-lg font-bold text-primary">{leaderboardQuery.data[2]?.totalPoints} pts</p>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>All Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            {leaderboardQuery.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : leaderboardQuery.data?.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Trophy className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>No rankings yet. Be the first to play!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboardQuery.data?.map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${getRankBg(index)}`}
                  >
                    <div className="flex items-center gap-4">
                      {getRankIcon(index)}
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {player.matchesPlayed} matches played
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">{player.totalPoints}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">How Points Work</h3>
            <p className="text-sm text-muted-foreground">
              Points are calculated based on your team's performance in real cricket matches. 
              Your captain earns 2x points and vice-captain earns 1.5x points. 
              Build smart teams and climb the leaderboard!
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
