import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Trophy, Users, Calendar, TrendingUp, Plus, ChevronRight, Loader2 } from "lucide-react";
import { useEffect } from "react";

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
        <div className="container py-12 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    {
      icon: Trophy,
      label: "Total Points",
      value: profileQuery.data?.totalPoints || 0,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      icon: Calendar,
      label: "Matches Played",
      value: profileQuery.data?.matchesPlayed || 0,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: Users,
      label: "Teams Created",
      value: myTeamsQuery.data?.length || 0,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      icon: TrendingUp,
      label: "Active Teams",
      value: myTeamsQuery.data?.filter(t => t.isSubmitted).length || 0,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  return (
    <Layout>
      <div className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {profileQuery.data?.name || user?.name || "Player"}!
          </h1>
          <p className="text-muted-foreground">
            Ready to build your dream team and compete?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/matches">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Team
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button className="w-full justify-start" variant="outline">
                  <Trophy className="mr-2 h-4 w-4" />
                  View Leaderboard
                </Button>
              </Link>
              <Link href="/profile">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  My Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Upcoming Matches */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Matches</CardTitle>
                <CardDescription>Select a match to build your team</CardDescription>
              </div>
              <Link href="/matches">
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {upcomingMatchesQuery.isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : upcomingMatchesQuery.data?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No upcoming matches at the moment</p>
                  <p className="text-sm">Check back later for new matches!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingMatchesQuery.data?.slice(0, 3).map((match) => (
                    <div
                      key={match.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="font-semibold">{match.team1}</p>
                          <p className="text-xs text-muted-foreground">vs</p>
                          <p className="font-semibold">{match.team2}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{match.matchType}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(match.startTime).toLocaleDateString()}
                        </p>
                      </div>
                      <Link href={`/build-team/${match.id}`}>
                        <Button size="sm">Build Team</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* My Teams */}
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Teams</CardTitle>
              <CardDescription>Your created fantasy teams</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {myTeamsQuery.isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : myTeamsQuery.data?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>You haven't created any teams yet</p>
                <Link href="/matches">
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Team
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myTeamsQuery.data?.map((team) => (
                  <div
                    key={team.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{team.teamName}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        team.isSubmitted 
                          ? "bg-green-100 text-green-700" 
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {team.isSubmitted ? "Submitted" : "Draft"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Points: {team.totalPoints}
                    </p>
                    <Link href={`/team-preview/${team.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Team
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
