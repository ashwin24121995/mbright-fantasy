import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams, Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft, Crown, Star, Trophy } from "lucide-react";

export default function TeamPreview() {
  const { teamId } = useParams<{ teamId: string }>();
  const { isAuthenticated, loading } = useAuth();

  const teamPlayersQuery = trpc.teams.getPlayers.useQuery(
    { teamId: parseInt(teamId || "0") },
    { enabled: !!teamId && isAuthenticated }
  );

  if (loading || teamPlayersQuery.isLoading) {
    return (
      <Layout>
        <div className="container py-12 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const players = teamPlayersQuery.data || [];
  const captain = players.find(p => p.isCaptain);
  const viceCaptain = players.find(p => p.isViceCaptain);

  const groupedPlayers = {
    "wicket-keeper": players.filter(p => p.role === "wicket-keeper"),
    batsman: players.filter(p => p.role === "batsman"),
    "all-rounder": players.filter(p => p.role === "all-rounder"),
    bowler: players.filter(p => p.role === "bowler"),
  };

  return (
    <Layout>
      <div className="container py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Team Preview</h1>
            <p className="text-muted-foreground">Your fantasy team</p>
          </div>
        </div>

        {/* Captain & Vice-Captain */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-4 text-center">
              <Crown className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Captain (2x)</p>
              <p className="font-bold">{captain?.name || "Not Selected"}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Vice-Captain (1.5x)</p>
              <p className="font-bold">{viceCaptain?.name || "Not Selected"}</p>
            </CardContent>
          </Card>
        </div>

        {/* Team Formation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Your XI
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Object.entries(groupedPlayers).map(([role, rolePlayers]) => (
              <div key={role} className="mb-6 last:mb-0">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                  {role === "wicket-keeper" ? "Wicket-Keeper" : role === "all-rounder" ? "All-Rounders" : role + "s"} ({rolePlayers.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {rolePlayers.map(player => (
                    <div
                      key={player.id}
                      className={`p-3 border rounded-lg text-center ${
                        player.isCaptain 
                          ? "border-yellow-400 bg-yellow-50" 
                          : player.isViceCaptain
                          ? "border-blue-400 bg-blue-50"
                          : ""
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2 relative">
                        <span className="font-bold text-sm">{player.name.substring(0, 2).toUpperCase()}</span>
                        {player.isCaptain && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">C</span>
                          </div>
                        )}
                        {player.isViceCaptain && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">VC</span>
                          </div>
                        )}
                      </div>
                      <p className="font-medium text-sm truncate">{player.name}</p>
                      <p className="text-xs text-muted-foreground">{player.team}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {player.credits} Cr
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
