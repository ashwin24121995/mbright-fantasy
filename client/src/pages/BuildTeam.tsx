import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useLocation, Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Minus, Star, Crown, ArrowLeft, Check } from "lucide-react";

const MAX_PLAYERS = 11;
const MAX_CREDITS = 100;
const MAX_FROM_ONE_TEAM = 7;

export default function BuildTeam() {
  const { matchId } = useParams<{ matchId: string }>();
  const { isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [captainId, setCaptainId] = useState<number | null>(null);
  const [viceCaptainId, setViceCaptainId] = useState<number | null>(null);
  const [step, setStep] = useState<"select" | "captain">("select");

  const matchQuery = trpc.matches.getById.useQuery(
    { id: parseInt(matchId || "0") },
    { enabled: !!matchId }
  );

  const playersQuery = trpc.matches.getPlayers.useQuery(
    { matchId: parseInt(matchId || "0") },
    { enabled: !!matchId }
  );

  const existingTeamQuery = trpc.teams.getForMatch.useQuery(
    { matchId: parseInt(matchId || "0") },
    { enabled: !!matchId && isAuthenticated }
  );

  const createTeamMutation = trpc.teams.create.useMutation();
  const addPlayerMutation = trpc.teams.addPlayer.useMutation();
  const setCaptainMutation = trpc.teams.setCaptain.useMutation();
  const setViceCaptainMutation = trpc.teams.setViceCaptain.useMutation();
  const submitTeamMutation = trpc.teams.submit.useMutation({
    onSuccess: () => {
      toast.success("Team submitted successfully!");
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [loading, isAuthenticated, setLocation]);

  const players = playersQuery.data || [];
  
  const selectedPlayersData = useMemo(() => 
    players.filter(p => selectedPlayers.includes(p.id)),
    [players, selectedPlayers]
  );

  const usedCredits = useMemo(() => 
    selectedPlayersData.reduce((sum, p) => sum + parseFloat(String(p.credits)), 0),
    [selectedPlayersData]
  );

  const remainingCredits = MAX_CREDITS - usedCredits;

  const teamCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    selectedPlayersData.forEach(p => {
      counts[p.teamName] = (counts[p.teamName] || 0) + 1;
    });
    return counts;
  }, [selectedPlayersData]);

  const roleCounts = useMemo(() => {
    const counts = { batsman: 0, bowler: 0, "all-rounder": 0, "wicket-keeper": 0 };
    selectedPlayersData.forEach(p => {
      counts[p.role as keyof typeof counts]++;
    });
    return counts;
  }, [selectedPlayersData]);

  const canSelectPlayer = (player: any) => {
    if (selectedPlayers.includes(player.id)) return true;
    if (selectedPlayers.length >= MAX_PLAYERS) return false;
    if (parseFloat(String(player.credits)) > remainingCredits) return false;
    if ((teamCounts[player.teamName] || 0) >= MAX_FROM_ONE_TEAM) return false;
    return true;
  };

  const togglePlayer = (playerId: number) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(prev => prev.filter(id => id !== playerId));
      if (captainId === playerId) setCaptainId(null);
      if (viceCaptainId === playerId) setViceCaptainId(null);
    } else {
      const player = players.find(p => p.id === playerId);
      if (player && canSelectPlayer(player)) {
        setSelectedPlayers(prev => [...prev, playerId]);
      }
    }
  };

  const handleContinue = () => {
    if (selectedPlayers.length !== MAX_PLAYERS) {
      toast.error(`Please select exactly ${MAX_PLAYERS} players`);
      return;
    }
    setStep("captain");
  };

  const handleSubmit = async () => {
    if (!captainId || !viceCaptainId) {
      toast.error("Please select both Captain and Vice-Captain");
      return;
    }

    try {
      // Create team
      const team = await createTeamMutation.mutateAsync({ matchId: parseInt(matchId || "0") });
      if (!team) throw new Error("Failed to create team");

      // Add players
      for (const playerId of selectedPlayers) {
        await addPlayerMutation.mutateAsync({ teamId: team.id, playerId });
      }

      // Set captain and vice-captain
      await setCaptainMutation.mutateAsync({ teamId: team.id, playerId: captainId });
      await setViceCaptainMutation.mutateAsync({ teamId: team.id, playerId: viceCaptainId });

      // Submit team
      await submitTeamMutation.mutateAsync({ teamId: team.id });
    } catch (error: any) {
      toast.error(error.message || "Failed to submit team");
    }
  };

  if (loading || matchQuery.isLoading) {
    return (
      <Layout>
        <div className="container py-12 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const match = matchQuery.data;

  const PlayerCard = ({ player, isSelected }: { player: any; isSelected: boolean }) => (
    <div
      className={`p-3 border rounded-lg cursor-pointer transition-all ${
        isSelected 
          ? "border-primary bg-primary/5" 
          : canSelectPlayer(player)
          ? "hover:border-primary/50"
          : "opacity-50 cursor-not-allowed"
      }`}
      onClick={() => canSelectPlayer(player) && togglePlayer(player.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-bold">{player.name.substring(0, 2).toUpperCase()}</span>
          </div>
          <div>
            <p className="font-medium text-sm">{player.name}</p>
            <p className="text-xs text-muted-foreground">{player.teamName}</p>
          </div>
        </div>
        <div className="text-right">
          <Badge variant="secondary">{player.credits} Cr</Badge>
          <p className="text-xs text-muted-foreground mt-1 capitalize">{player.role}</p>
        </div>
      </div>
      {isSelected && (
        <div className="mt-2 flex items-center justify-end">
          <Check className="h-4 w-4 text-primary" />
        </div>
      )}
    </div>
  );

  const CaptainCard = ({ player }: { player: any }) => (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <span className="font-bold">{player.name.substring(0, 2).toUpperCase()}</span>
          </div>
          <div>
            <p className="font-semibold">{player.name}</p>
            <p className="text-sm text-muted-foreground">{player.teamName} • {player.role}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={captainId === player.id ? "default" : "outline"}
          className="flex-1"
          onClick={() => {
            if (viceCaptainId === player.id) setViceCaptainId(null);
            setCaptainId(player.id);
          }}
        >
          <Crown className="h-4 w-4 mr-1" />
          {captainId === player.id ? "Captain" : "Make C"}
        </Button>
        <Button
          size="sm"
          variant={viceCaptainId === player.id ? "default" : "outline"}
          className="flex-1"
          onClick={() => {
            if (captainId === player.id) setCaptainId(null);
            setViceCaptainId(player.id);
          }}
        >
          <Star className="h-4 w-4 mr-1" />
          {viceCaptainId === player.id ? "Vice-C" : "Make VC"}
        </Button>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/matches">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">
              {match?.team1} vs {match?.team2}
            </h1>
            <p className="text-muted-foreground">Build your fantasy team</p>
          </div>
        </div>

        {/* Stats Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{selectedPlayers.length}/{MAX_PLAYERS}</p>
                <p className="text-xs text-muted-foreground">Players</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{remainingCredits.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">Credits Left</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{teamCounts[match?.team1 || ""] || 0}</p>
                <p className="text-xs text-muted-foreground">{match?.team1}</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{teamCounts[match?.team2 || ""] || 0}</p>
                <p className="text-xs text-muted-foreground">{match?.team2}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {step === "select" ? (
          <>
            {/* Player Selection */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-4">
                <TabsTrigger value="all">All ({players.length})</TabsTrigger>
                <TabsTrigger value="wicket-keeper">WK ({roleCounts["wicket-keeper"]})</TabsTrigger>
                <TabsTrigger value="batsman">BAT ({roleCounts.batsman})</TabsTrigger>
                <TabsTrigger value="all-rounder">AR ({roleCounts["all-rounder"]})</TabsTrigger>
                <TabsTrigger value="bowler">BOWL ({roleCounts.bowler})</TabsTrigger>
              </TabsList>

              {["all", "wicket-keeper", "batsman", "all-rounder", "bowler"].map(role => (
                <TabsContent key={role} value={role}>
                  {playersQuery.isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {players
                        .filter(p => role === "all" || p.role === role)
                        .map(player => (
                          <PlayerCard
                            key={player.id}
                            player={player}
                            isSelected={selectedPlayers.includes(player.id)}
                          />
                        ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>

            {/* Continue Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
              <div className="container">
                <Button
                  className="w-full"
                  size="lg"
                  disabled={selectedPlayers.length !== MAX_PLAYERS}
                  onClick={handleContinue}
                >
                  Continue ({selectedPlayers.length}/{MAX_PLAYERS} selected)
                </Button>
              </div>
            </div>
            <div className="h-20" /> {/* Spacer for fixed button */}
          </>
        ) : (
          <>
            {/* Captain Selection */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Select Captain & Vice-Captain</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Captain gets 2x points, Vice-Captain gets 1.5x points
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPlayersData.map(player => (
                    <CaptainCard key={player.id} player={player} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
              <div className="container flex gap-4">
                <Button variant="outline" onClick={() => setStep("select")} className="flex-1">
                  Back
                </Button>
                <Button
                  className="flex-1"
                  disabled={!captainId || !viceCaptainId || submitTeamMutation.isPending}
                  onClick={handleSubmit}
                >
                  {submitTeamMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Team"
                  )}
                </Button>
              </div>
            </div>
            <div className="h-20" />
          </>
        )}
      </div>
    </Layout>
  );
}
