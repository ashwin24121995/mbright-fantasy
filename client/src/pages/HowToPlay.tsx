import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  UserPlus, Calendar, Users, Trophy, Star, Crown, ChevronRight,
  Target, Zap, Award, CheckCircle, ArrowRight, Sparkles, Shield
} from "lucide-react";

export default function HowToPlay() {
  const steps = [
    {
      step: "01",
      icon: UserPlus,
      title: "Create Account",
      description: "Register for free with your email. You must be 18+ and not from restricted states.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      step: "02",
      icon: Calendar,
      title: "Select Match",
      description: "Browse upcoming cricket matches and choose one to create your fantasy team.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      step: "03",
      icon: Users,
      title: "Build Your Team",
      description: "Select 11 players within 100 credits. Maximum 7 players from one team allowed.",
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      step: "04",
      icon: Crown,
      title: "Choose Captain",
      description: "Select a Captain (2x points) and Vice-Captain (1.5x points) from your team.",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      step: "05",
      icon: Star,
      title: "Submit Team",
      description: "Submit your team before the match starts. You cannot make changes after submission.",
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    },
    {
      step: "06",
      icon: Trophy,
      title: "Earn Points",
      description: "Watch your team score points based on real match performance. Climb the leaderboard!",
      color: "text-cyan-500",
      bg: "bg-cyan-500/10"
    }
  ];

  const pointsSystem = [
    { category: "Batting", points: [
      { action: "Run scored", value: "+1" },
      { action: "Boundary (4)", value: "+1" },
      { action: "Six (6)", value: "+2" },
      { action: "Half-century (50)", value: "+10" },
      { action: "Century (100)", value: "+25" },
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

  const rules = [
    { title: "Team Size", value: "11 Players", icon: Users },
    { title: "Budget", value: "100 Credits", icon: Target },
    { title: "Max from One Team", value: "7 Players", icon: Shield },
    { title: "Captain Bonus", value: "2x Points", icon: Star },
    { title: "Vice-Captain", value: "1.5x Points", icon: Award },
    { title: "Entry Fee", value: "Free!", icon: Sparkles },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-[url('/hero-cricket.png')] bg-cover bg-center opacity-10" />
        
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Target className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-white">Learn the Game</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              How To Play
            </h1>
            <p className="text-lg text-white/80">
              Master fantasy cricket in simple steps. No experience needed!
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* Quick Rules */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16 -mt-12 relative z-20">
          {rules.map((rule, index) => (
            <Card key={index} className="border-0 shadow-lg bg-card/95 backdrop-blur-sm hover-lift">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <rule.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-lg font-display font-bold">{rule.value}</p>
                <p className="text-xs text-muted-foreground">{rule.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Steps Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Step by Step
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Getting Started in <span className="text-gradient">6 Easy Steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="border-0 shadow-lg hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center flex-shrink-0`}>
                      <step.icon className={`h-7 w-7 ${step.color}`} />
                    </div>
                    <div>
                      <span className={`text-xs font-bold ${step.color}`}>STEP {step.step}</span>
                      <h3 className="text-lg font-display font-semibold mt-1 mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Rules */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5 mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Team Building Rules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamRules.map((rule, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-background/50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{rule}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Points System */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary-foreground text-sm font-medium rounded-full mb-4">
              Scoring System
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              How Points Are <span className="text-gradient-gold">Calculated</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pointsSystem.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.points.map((point, pIndex) => (
                      <div key={pIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">{point.action}</span>
                        <span className="font-semibold text-primary">{point.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-0 shadow-2xl overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 gradient-primary opacity-90" />
            <CardContent className="relative p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Ready to Start Playing?</h2>
              <p className="mb-8 text-white/80 max-w-xl mx-auto">
                Create your free account and build your first fantasy team today! 
                Join thousands of cricket fans already playing on MBRIGHT Fantasy.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="gradient-gold text-foreground font-semibold shadow-xl">
                    Register Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/matches">
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                    Browse Matches
                  </Button>
                </Link>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
