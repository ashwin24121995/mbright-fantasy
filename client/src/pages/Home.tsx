import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  ChevronRight, Trophy, Users, Target, Shield, Zap, 
  Star, TrendingUp, Award, Play, ArrowRight, Sparkles,
  CheckCircle, Clock, Gamepad2
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Gamepad2,
      title: "100% Free to Play",
      description: "No deposits, no entry fees. Play fantasy cricket without any financial risk.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      icon: Target,
      title: "Build Dream Teams",
      description: "Select 11 players within 100 credits. Choose your captain for 2x points.",
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      icon: Trophy,
      title: "Climb Leaderboards",
      description: "Compete with players across India. See your name on the leaderboard.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: TrendingUp,
      title: "Learn & Improve",
      description: "Master cricket strategy and player analysis through hands-on experience.",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ];

  const steps = [
    { step: "01", title: "Create Account", desc: "Sign up free in seconds" },
    { step: "02", title: "Pick a Match", desc: "Choose from live matches" },
    { step: "03", title: "Build Your Team", desc: "Select 11 players" },
    { step: "04", title: "Win Glory", desc: "Top the leaderboard" },
  ];

  const stats = [
    { value: "50K+", label: "Active Players" },
    { value: "100+", label: "Matches Covered" },
    { value: "500+", label: "Teams Created Daily" },
    { value: "4.8", label: "User Rating" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[url('/hero-cricket.png')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Animated Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-white">India's #1 Free Fantasy Cricket Platform</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Play Smart,
              <br />
              <span className="text-gradient-gold">Learn Cricket</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl text-white/80 mb-10 max-w-xl leading-relaxed">
              Build your dream team, compete with friends, and master cricket strategy — 
              completely free, with no real money involved.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/register">
                <Button size="lg" className="gradient-gold text-foreground font-semibold px-8 shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30 transition-all hover-scale">
                  Start Playing Free
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-to-play">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                  <Play className="mr-2 h-5 w-5" />
                  How It Works
                </Button>
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white/20" />
                  ))}
                </div>
                <span className="text-sm text-white/70">50K+ Players</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-white/70">4.8 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-6 -mt-16 relative z-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="glass border-0 shadow-xl hover-lift">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="container relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Fantasy Cricket, <span className="text-gradient">Reimagined</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the thrill of fantasy cricket without the stress of real money. 
              Learn, play, and compete in a safe environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover-lift border-0 shadow-lg bg-card/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary-foreground text-sm font-medium rounded-full mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Start Playing in <span className="text-gradient-gold">4 Easy Steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="relative group">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-8" />
                )}
                <div className="text-center">
                  <div className="relative inline-flex mb-6">
                    <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center shadow-xl shadow-primary/25 group-hover:shadow-2xl group-hover:shadow-primary/30 transition-all group-hover:scale-105">
                      <span className="text-3xl font-display font-bold text-white">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/register">
              <Button size="lg" className="gradient-primary text-white shadow-lg shadow-primary/25">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                Why Free to Play?
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Learn Without <span className="text-gradient">Financial Risk</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We believe everyone should have the opportunity to learn fantasy cricket strategy 
                without financial pressure. Our platform is backed by investors who share this vision.
              </p>
              
              <div className="space-y-4">
                {[
                  "No deposits or entry fees required",
                  "No real money transactions",
                  "Learn cricket strategy risk-free",
                  "Compete for leaderboard glory",
                  "Perfect for beginners and experts"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-3xl blur-3xl opacity-20" />
              <Card className="relative border-0 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-transparent rounded-bl-full" />
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center">
                      <Award className="h-8 w-8 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-xl">Free Forever</h3>
                      <p className="text-muted-foreground">No hidden charges</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                      <span className="text-muted-foreground">Entry Fee</span>
                      <span className="font-semibold text-primary">₹0</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                      <span className="text-muted-foreground">Deposit Required</span>
                      <span className="font-semibold text-primary">None</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                      <span className="text-muted-foreground">Real Money</span>
                      <span className="font-semibold text-primary">Not Involved</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[url('/hero-cricket.png')] bg-cover bg-center opacity-10" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Build Your <span className="text-gradient-gold">Dream Team?</span>
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Join thousands of cricket fans already playing on MBRIGHT Fantasy. 
              It's free, it's fun, and it's the best way to learn fantasy cricket.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="gradient-gold text-foreground font-semibold px-10 shadow-xl">
                  Create Free Account
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Trophy className="mr-2 h-5 w-5" />
                  View Leaderboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
