import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useEffect } from "react";
import { Loader2, Calendar, Clock, MapPin, Trophy } from "lucide-react";

export default function SelectMatch() {
  const { isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

  const upcomingQuery = trpc.matches.upcoming.useQuery();
  const liveQuery = trpc.matches.live.useQuery();
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
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const MatchCard = ({ match, showBuildTeam = false }: { match: any; showBuildTeam?: boolean }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="bg-primary/5 p-4 border-b">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">
              {match.matchType}
            </span>
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              match.status === "live" 
                ? "bg-red-100 text-red-700" 
                : match.status === "upcoming"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}>
              {match.status.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center flex-1">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-primary">
                  {match.team1.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <p className="font-semibold text-sm">{match.team1}</p>
            </div>
            <div className="px-4">
              <span className="text-xl font-bold text-muted-foreground">VS</span>
            </div>
            <div className="text-center flex-1">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-secondary-foreground">
                  {match.team2.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <p className="font-semibold text-sm">{match.team2}</p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(match.startTime).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            {match.venue && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{match.venue}</span>
              </div>
            )}
          </div>

          {showBuildTeam && (
            <Link href={`/build-team/${match.id}`}>
              <Button className="w-full">Build Team</Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = ({ message }: { message: string }) => (
    <div className="text-center py-12">
      <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Select Match</h1>
          <p className="text-muted-foreground">Choose a match to build your fantasy team</p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingQuery.data?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="live">
              Live ({liveQuery.data?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedQuery.data?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingQuery.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : upcomingQuery.data?.length === 0 ? (
              <EmptyState message="No upcoming matches at the moment. Check back later!" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingQuery.data?.map((match) => (
                  <MatchCard key={match.id} match={match} showBuildTeam />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="live">
            {liveQuery.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : liveQuery.data?.length === 0 ? (
              <EmptyState message="No live matches right now." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveQuery.data?.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedQuery.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : completedQuery.data?.length === 0 ? (
              <EmptyState message="No completed matches yet." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedQuery.data?.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
