import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Trophy, Medal, Crown, Star, TrendingUp, Users, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Leaderboard() {
  const leaderboardQuery = trpc.leaderboard.global.useQuery({ limit: 100 });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-amber-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-slate-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-700" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent border-amber-500/30";
      case 2:
        return "bg-gradient-to-r from-slate-400/20 via-slate-300/10 to-transparent border-slate-400/30";
      case 3:
        return "bg-gradient-to-r from-amber-700/20 via-amber-600/10 to-transparent border-amber-700/30";
      default:
        return "bg-card hover:bg-muted/50";
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-[url('/hero-cricket.png')] bg-cover bg-center opacity-10" />
        
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Trophy className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-white">Global Rankings</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Leaderboard
            </h1>
            <p className="text-lg text-white/80">
              See how you stack up against other fantasy cricket players across India
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 -mt-16 relative z-20">
          <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-amber-500" />
              </div>
              <p className="text-3xl font-display font-bold">{leaderboardQuery.data?.length || 0}</p>
              <p className="text-sm text-muted-foreground">Total Players</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
              </div>
              <p className="text-3xl font-display font-bold">
                {leaderboardQuery.data?.[0]?.totalPoints || 0}
              </p>
              <p className="text-sm text-muted-foreground">Highest Score</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-purple-500" />
              </div>
              <p className="text-3xl font-display font-bold">Free</p>
              <p className="text-sm text-muted-foreground">Entry Fee</p>
            </CardContent>
          </Card>
        </div>

        {/* Top 3 Podium */}
        {leaderboardQuery.data && leaderboardQuery.data.length >= 3 && (
          <div className="mb-12">
            <div className="flex items-end justify-center gap-4 md:gap-8">
              {/* 2nd Place */}
              <div className="text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-2xl md:text-3xl font-display font-bold text-white">2</span>
                </div>
                <div className="bg-slate-400/10 rounded-t-xl p-4 h-24 flex flex-col justify-end">
                  <p className="font-semibold text-sm md:text-base truncate max-w-24">{leaderboardQuery.data[1]?.name}</p>
                  <p className="text-xs text-muted-foreground">{leaderboardQuery.data[1]?.totalPoints} pts</p>
                </div>
              </div>

              {/* 1st Place */}
              <div className="text-center -mb-4">
                <Crown className="h-8 w-8 text-amber-500 mx-auto mb-2 animate-pulse" />
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-3 shadow-xl glow-gold">
                  <span className="text-3xl md:text-4xl font-display font-bold text-white">1</span>
                </div>
                <div className="bg-amber-500/10 rounded-t-xl p-4 h-32 flex flex-col justify-end">
                  <p className="font-bold text-base md:text-lg truncate max-w-28">{leaderboardQuery.data[0]?.name}</p>
                  <p className="text-sm text-amber-600 font-semibold">{leaderboardQuery.data[0]?.totalPoints} pts</p>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-2xl md:text-3xl font-display font-bold text-white">3</span>
                </div>
                <div className="bg-amber-700/10 rounded-t-xl p-4 h-20 flex flex-col justify-end">
                  <p className="font-semibold text-sm md:text-base truncate max-w-24">{leaderboardQuery.data[2]?.name}</p>
                  <p className="text-xs text-muted-foreground">{leaderboardQuery.data[2]?.totalPoints} pts</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>All Rankings</CardTitle>
                <CardDescription>Complete leaderboard standings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {leaderboardQuery.isLoading ? (
              <div className="space-y-3">
                {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-16" />)}
              </div>
            ) : leaderboardQuery.data?.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium text-muted-foreground">No rankings yet</p>
                <p className="text-sm text-muted-foreground">Be the first to create a team and top the leaderboard!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-5 md:col-span-6">Player</div>
                  <div className="col-span-3 md:col-span-2 text-center">Matches</div>
                  <div className="col-span-3 text-right">Points</div>
                </div>
                
                {/* Rows */}
                {leaderboardQuery.data?.map((player, index) => (
                  <div
                    key={player.id}
                    className={`grid grid-cols-12 gap-4 items-center p-4 rounded-xl border transition-all ${getRankStyle(index + 1)}`}
                  >
                    <div className="col-span-1 flex items-center justify-center">
                      {getRankIcon(index + 1)}
                    </div>
                    <div className="col-span-5 md:col-span-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                          {player.name?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="font-semibold">{player.name}</p>
                          <p className="text-xs text-muted-foreground">{player.matchesPlayed} matches</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3 md:col-span-2 text-center">
                      <span className="px-2 py-1 bg-muted rounded-lg text-sm">
                        {player.matchesPlayed || 0}
                      </span>
                    </div>
                    <div className="col-span-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Star className="h-4 w-4 text-amber-500" />
                        <span className="font-bold text-lg">{player.totalPoints}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Banner */}
        <div className="mt-8 p-6 bg-primary/5 border border-primary/10 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg mb-1">Free to Play, Glory to Win!</h3>
              <p className="text-muted-foreground">
                Our leaderboard showcases the best fantasy cricket minds in India. 
                No real money involved — just pure skill and cricket knowledge. 
                Create your teams, score points, and climb the rankings!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
