import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { 
  Trophy, Users, Calendar, TrendingUp, Plus, ChevronRight, Loader2,
  Zap, Star, ArrowUpRight, Clock, Target, Medal, Award, BarChart3, Gamepad2
} from "lucide-react";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

  const profileQuery = trpc.user.profile.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const myTeamsQuery = trpc.user.myTeams.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const upcomingMatchesQuery = trpc.matches.upcoming.useQuery();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [loading, isAuthenticated, setLocation]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
          <div className="container py-8">
            <Skeleton className="h-12 w-64 mb-2" />
            <Skeleton className="h-6 w-48 mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[1,2,3,4].map(i => <Skeleton key={i} className="h-28" />)}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    {
      icon: Star,
      label: "Total Points",
      value: profileQuery.data?.totalPoints || 0,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      icon: Gamepad2,
      label: "Matches Played",
      value: profileQuery.data?.matchesPlayed || 0,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      icon: Users,
      label: "Teams Created",
      value: myTeamsQuery.data?.length || 0,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: TrendingUp,
      label: "Active Teams",
      value: myTeamsQuery.data?.filter(t => t.isSubmitted).length || 0,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
        <div className="container py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                  Welcome back, <span className="text-gradient">{profileQuery.data?.name || user?.name || "Player"}</span>
                </h1>
                <p className="text-muted-foreground">
                  Ready to build your dream team and compete?
                </p>
              </div>
              <Link href="/matches">
                <Button size="lg" className="gradient-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl transition-all">
                  <Plus className="mr-2 h-5 w-5" />
                  Create New Team
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg hover-lift bg-card/80 backdrop-blur-sm">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-display font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Matches */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Upcoming Matches</CardTitle>
                        <CardDescription>Select a match to build your team</CardDescription>
                      </div>
                    </div>
                    <Link href="/matches">
                      <Button variant="ghost" size="sm" className="text-primary">
                        View All
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {upcomingMatchesQuery.isLoading ? (
                    <div className="space-y-3">
                      {[1,2,3].map(i => <Skeleton key={i} className="h-20" />)}
                    </div>
                  ) : upcomingMatchesQuery.data?.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No upcoming matches at the moment</p>
                      <p className="text-sm text-muted-foreground">Check back later for new matches!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {upcomingMatchesQuery.data?.slice(0, 3).map((match) => (
                        <div
                          key={match.id}
                          className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <p className="font-semibold">{match.teams?.[0] || 'TBA'}</p>
                              <p className="text-xs text-muted-foreground">vs</p>
                              <p className="font-semibold">{match.teams?.[1] || 'TBA'}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{match.matchType}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{new Date(match.date || match.dateTimeGMT).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <Link href={`/build-team/${match.id}`}>
                            <Button size="sm" className="gradient-primary text-white">
                              Build Team
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* My Teams */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                        <Users className="h-5 w-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">My Teams</CardTitle>
                        <CardDescription>Your created fantasy teams</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {myTeamsQuery.isLoading ? (
                    <div className="space-y-3">
                      {[1,2,3].map(i => <Skeleton key={i} className="h-20" />)}
                    </div>
                  ) : myTeamsQuery.data?.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">You haven't created any teams yet</p>
                      <Link href="/matches">
                        <Button className="mt-4 gradient-primary text-white">
                          <Plus className="mr-2 h-4 w-4" />
                          Create Your First Team
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {myTeamsQuery.data?.slice(0, 4).map((team) => (
                        <div
                          key={team.id}
                          className="p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{team.teamName}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              team.isSubmitted 
                                ? "bg-emerald-500/10 text-emerald-600" 
                                : "bg-amber-500/10 text-amber-600"
                            }`}>
                              {team.isSubmitted ? "Submitted" : "Draft"}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Points: <span className="font-semibold text-foreground">{team.totalPoints}</span>
                          </p>
                          <Link href={`/team-preview/${team.id}`}>
                            <Button variant="outline" size="sm" className="w-full hover:bg-primary/5 hover:border-primary/30">
                              View Team
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/matches" className="block">
                    <Button variant="outline" className="w-full justify-start h-12 hover:bg-primary/5 hover:border-primary/30">
                      <Plus className="mr-3 h-4 w-4 text-primary" />
                      Create New Team
                    </Button>
                  </Link>
                  <Link href="/leaderboard" className="block">
                    <Button variant="outline" className="w-full justify-start h-12 hover:bg-primary/5 hover:border-primary/30">
                      <Trophy className="mr-3 h-4 w-4 text-amber-500" />
                      View Leaderboard
                    </Button>
                  </Link>
                  <Link href="/profile" className="block">
                    <Button variant="outline" className="w-full justify-start h-12 hover:bg-primary/5 hover:border-primary/30">
                      <BarChart3 className="mr-3 h-4 w-4 text-blue-500" />
                      My Statistics
                    </Button>
                  </Link>
                  <Link href="/how-to-play" className="block">
                    <Button variant="outline" className="w-full justify-start h-12 hover:bg-primary/5 hover:border-primary/30">
                      <Target className="mr-3 h-4 w-4 text-emerald-500" />
                      How To Play
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Medal className="h-5 w-5 text-amber-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <Star className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">First Team</p>
                        <p className="text-xs text-muted-foreground">Create your first team</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl opacity-50">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Trophy className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Top 10</p>
                        <p className="text-xs text-muted-foreground">Reach top 10 in leaderboard</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl opacity-50">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Award className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Century Club</p>
                        <p className="text-xs text-muted-foreground">Score 100+ points in a match</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
