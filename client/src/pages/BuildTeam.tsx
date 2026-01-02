import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useLocation, Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Loader2, ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export default function BuildTeam() {
  const { matchId } = useParams<{ matchId: string }>();
  const { isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

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

  return (
    <Layout>
      <div className="container py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/select-match">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Build Your Team</h1>
            <p className="text-muted-foreground">Select 11 players within 100 credits</p>
          </div>
        </div>

        {/* Coming Soon Message */}
        <Card>
          <CardHeader>
            <CardTitle>Team Builder Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The team builder feature is currently being integrated with live Cricket API data. 
              You'll soon be able to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Select 11 players from real match squads</li>
              <li>Choose captain and vice-captain (2x and 1.5x points)</li>
              <li>Stay within 100 credit budget</li>
              <li>Maximum 7 players from one team</li>
              <li>Track live fantasy points</li>
            </ul>
            <div className="mt-6">
              <Link href="/select-match">
                <Button>Back to Matches</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
