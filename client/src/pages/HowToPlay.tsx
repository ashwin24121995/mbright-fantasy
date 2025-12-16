import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { UserPlus, Calendar, Users, Trophy, Star, Crown, ChevronRight } from "lucide-react";

export default function HowToPlay() {
  const steps = [
    {
      icon: UserPlus,
      title: "1. Create Account",
      description: "Register for free with your email. You must be 18+ and not from restricted states."
    },
    {
      icon: Calendar,
      title: "2. Select Match",
      description: "Browse upcoming cricket matches and choose one to create your fantasy team."
    },
    {
      icon: Users,
      title: "3. Build Your Team",
      description: "Select 11 players within 100 credits. Maximum 7 players from one team allowed."
    },
    {
      icon: Crown,
      title: "4. Choose Captain",
      description: "Select a Captain (2x points) and Vice-Captain (1.5x points) from your team."
    },
    {
      icon: Star,
      title: "5. Submit Team",
      description: "Submit your team before the match starts. You cannot make changes after submission."
    },
    {
      icon: Trophy,
      title: "6. Earn Points",
      description: "Watch your team score points based on real match performance. Climb the leaderboard!"
    }
  ];

  const pointsSystem = [
    { category: "Batting", points: [
      { action: "Run scored", value: "+1" },
      { action: "Boundary (4)", value: "+1" },
      { action: "Six (6)", value: "+2" },
      { action: "Half-century (50)", value: "+10" },
      { action: "Century (100)", value: "+25" },
      { action: "Duck (0 runs, out)", value: "-5" },
    ]},
    { category: "Bowling", points: [
      { action: "Wicket", value: "+25" },
      { action: "3 Wicket Haul", value: "+10" },
      { action: "5 Wicket Haul", value: "+25" },
      { action: "Maiden Over", value: "+10" },
    ]},
    { category: "Fielding", points: [
      { action: "Catch", value: "+10" },
      { action: "Stumping", value: "+15" },
      { action: "Run Out (Direct)", value: "+15" },
      { action: "Run Out (Indirect)", value: "+10" },
    ]},
  ];

  const teamRules = [
    "Select exactly 11 players",
    "Total credits must not exceed 100",
    "Maximum 7 players from one team",
    "Must include at least 1 Wicket-Keeper",
    "Must include at least 3 Batsmen",
    "Must include at least 3 Bowlers",
    "Must include at least 1 All-Rounder",
    "Select 1 Captain (2x points)",
    "Select 1 Vice-Captain (1.5x points)",
  ];

  return (
    <Layout>
      <div className="container py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How To Play</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how to build your fantasy cricket team and compete on the leaderboard
          </p>
        </div>

        {/* Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Rules */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Team Building Rules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamRules.map((rule, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  <span className="text-sm">{rule}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Points System */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Points System</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pointsSystem.map((category, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4 text-primary">{category.category}</h3>
                  <div className="space-y-2">
                    {category.points.map((point, pIndex) => (
                      <div key={pIndex} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{point.action}</span>
                        <span className="font-semibold">{point.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Playing?</h2>
            <p className="mb-6 text-primary-foreground/80">
              Create your free account and build your first fantasy team today!
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Register Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
