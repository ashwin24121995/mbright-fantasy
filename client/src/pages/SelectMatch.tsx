import { useAuth } from "@/_core/hooks/useAuth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Calendar, MapPin, Trophy, Users, Clock, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function SelectMatch() {
  const { isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

  // Fetch matches from Cricket API with auto-refresh for live matches
  const upcomingQuery = trpc.matches.upcoming.useQuery();
  const liveQuery = trpc.matches.live.useQuery(undefined, {
    refetchInterval: 30 * 1000, // Refresh every 30 seconds
    refetchOnWindowFocus: true,
  });
  const completedQuery = trpc.matches.completed.useQuery();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [loading, isAuthenticated, setLocation]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-12 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-cricket-green" />
        </div>
      </Layout>
    );
  }

  const getMatchTypeColor = (matchType: string) => {
    switch (matchType.toLowerCase()) {
      case "t20":
      case "t20i":
        return "bg-red-500";
      case "odi":
        return "bg-blue-500";
      case "test":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const MatchCard = ({ match, isLive = false }: { match: any; isLive?: boolean }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-cricket-green">
      <CardContent className="p-0">
        {/* Header with match type and status */}
        <div className="bg-gradient-to-r from-cricket-green/10 to-cricket-gold/10 p-4 border-b">
          <div className="flex items-center justify-between">
            <Badge className={`${getMatchTypeColor(match.matchType)} text-white`}>
              {match.matchType.toUpperCase()}
            </Badge>
            {isLive && (
              <Badge className="bg-red-500 text-white animate-pulse">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  LIVE
                </span>
              </Badge>
            )}
            {!isLive && (
              <Badge variant="outline">{match.status}</Badge>
            )}
          </div>
        </div>

        <div className="p-4">
          {/* Match Name */}
          <h3 className="font-bold text-lg mb-4">{match.name}</h3>

          {/* Teams */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {match.teamInfo && match.teamInfo.map((team: any, idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                {team.img && (
                  <img 
                    src={team.img} 
                    alt={team.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-cricket-green/20"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/logo.png';
                    }}
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-sm">{team.shortname || team.name}</p>
                  {match.score && match.score[idx] && (
                    <p className="text-xs text-muted-foreground">
                      {match.score[idx].r}/{match.score[idx].w} ({match.score[idx].o} ov)
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Live Match Status */}
          {isLive && match.matchStatus && (
            <div className="bg-cricket-green/10 border border-cricket-green/20 rounded-lg p-3 mb-4">
              <p className="text-sm font-medium text-cricket-green">{match.matchStatus}</p>
            </div>
          )}

          {/* Match Details */}
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{match.venue || "Venue TBA"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(match.date)}</span>
            </div>
            {!isLive && match.dateTimeGMT && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{formatTime(match.dateTimeGMT)} GMT</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {isLive || match.status === "Completed" ? (
              <>
                <Button
                  onClick={() => setLocation(`/match/${match.id}`)}
                  variant="outline"
                  className="flex-1"
                  size="sm"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  {match.status === "Completed" ? "Scorecard" : "Details"}
                </Button>
                {match.status === "Completed" && (
                  <Button
                    onClick={() => setLocation(`/leaderboard?matchId=${match.id}`)}
                    className="flex-1 bg-cricket-green hover:bg-cricket-green/90"
                    size="sm"
                  >
                    Leaderboard
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button
                  onClick={() => setLocation(`/match/${match.id}`)}
                  variant="outline"
                  className="flex-1"
                  size="sm"
                >
                  View Squad
                </Button>
                <Button
                  onClick={() => setLocation(`/build-team?matchId=${match.id}`)}
                  className="flex-1 bg-cricket-green hover:bg-cricket-green/90"
                  size="sm"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Build Team
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = ({ icon: Icon, message }: { icon: any; message: string }) => (
    <div className="text-center py-12">
      <Icon className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Select a Match</h1>
          <p className="text-muted-foreground">
            Choose from upcoming, live, or completed cricket matches to build your fantasy team
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 lg:w-[400px]">
            <TabsTrigger value="upcoming">
              Upcoming
              {upcomingQuery.data && upcomingQuery.data.length > 0 && (
                <Badge className="ml-2" variant="secondary">
                  {upcomingQuery.data.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="live">
              Live
              {liveQuery.data && liveQuery.data.length > 0 && (
                <Badge className="ml-2 bg-red-500 text-white">
                  {liveQuery.data.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingQuery.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-cricket-green" />
              </div>
            ) : upcomingQuery.data && upcomingQuery.data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingQuery.data.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={Calendar} 
                message="No upcoming matches at the moment. Check back later!" 
              />
            )}
          </TabsContent>

          <TabsContent value="live">
            {liveQuery.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-cricket-green" />
              </div>
            ) : liveQuery.data && liveQuery.data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveQuery.data.map((match) => (
                  <MatchCard key={match.id} match={match} isLive />
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={Trophy} 
                message="No live matches right now." 
              />
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedQuery.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-cricket-green" />
              </div>
            ) : completedQuery.data && completedQuery.data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedQuery.data.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={Trophy} 
                message="No completed matches yet." 
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
