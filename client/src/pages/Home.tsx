import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { 
  ChevronRight, Trophy, Users, Target, Shield, Zap, 
  TrendingUp, Award, Play, ArrowRight, Sparkles,
  CheckCircle, Clock, Gamepad2, MapPin, Calendar, Loader2,
  Star, BarChart3, Brain, Heart
} from "lucide-react";

export default function Home() {
  // Fetch live and upcoming matches
  const { data: liveMatches, isLoading: liveLoading } = trpc.matches.live.useQuery(undefined, {
    refetchInterval: 30 * 1000, // Refresh every 30 seconds
  });
  const { data: upcomingMatches, isLoading: upcomingLoading } = trpc.matches.upcoming.useQuery();
  const { data: completedMatches } = trpc.matches.completed.useQuery();
  
  const features = [
    {
      icon: Gamepad2,
      title: "100% Free to Play",
      description: "No deposits, no entry fees, no hidden costs. Play fantasy cricket without any financial risk or pressure.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      icon: Target,
      title: "Build Dream Teams",
      description: "Select 11 players within 100 credits budget. Choose your captain for 2x points and vice-captain for 1.5x points.",
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      icon: Trophy,
      title: "Climb Leaderboards",
      description: "Compete with thousands of players across India. See your name shine on the global leaderboard.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Brain,
      title: "Learn & Master Strategy",
      description: "Develop cricket knowledge, player analysis skills, and strategic thinking through hands-on experience.",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ];

  const steps = [
    { 
      step: "01", 
      title: "Create Free Account", 
      desc: "Sign up in 30 seconds with email. No payment details required.",
      icon: Users
    },
    { 
      step: "02", 
      title: "Choose Your Match", 
      desc: "Browse upcoming matches, live games, or completed contests.",
      icon: Calendar
    },
    { 
      step: "03", 
      title: "Build Dream Team", 
      desc: "Select 11 players within 100 credits. Pick captain & vice-captain.",
      icon: Target
    },
    { 
      step: "04", 
      title: "Win Glory & Learn", 
      desc: "Watch live scores, earn points, and climb the leaderboard.",
      icon: Trophy
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "No financial transactions. Your data is protected with industry-standard encryption."
    },
    {
      icon: Heart,
      title: "Beginner Friendly",
      description: "Detailed guides, tooltips, and tutorials help you learn fantasy cricket from scratch."
    },
    {
      icon: BarChart3,
      title: "Real-Time Stats",
      description: "Live match updates, player performance tracking, and instant leaderboard rankings."
    },
    {
      icon: Star,
      title: "All Major Tournaments",
      description: "Play across IPL, international series, T20 leagues, and more cricket tournaments."
    }
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
          <div className="grid lg:grid-cols-[1fr,400px] gap-8 items-center">
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
          </div>
          
          {/* Live Matches Widget */}
          {((liveMatches && liveMatches.length > 0) || (completedMatches && completedMatches.length > 0) || (upcomingMatches && upcomingMatches.length > 0)) && (
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Live & Upcoming
              </h3>
              
              {/* Live/Completed Matches */}
              {(liveMatches && liveMatches.length > 0) || (completedMatches && completedMatches.length > 0) ? (
                <div className="space-y-3 mb-4">
                  {liveMatches?.slice(0, 2).map((match) => (
                    <div key={match.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                          LIVE
                        </span>
                        <span className="text-xs text-white/60">{match.matchType}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white font-medium truncate">{match.teams[0]}</span>
                          <span className="text-sm text-white font-bold">{match.score?.[0]?.r}/{match.score?.[0]?.w}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white font-medium truncate">{match.teams[1]}</span>
                          <span className="text-sm text-white font-bold">{match.score?.[1]?.r}/{match.score?.[1]?.w}</span>
                        </div>
                      </div>
                      <p className="text-xs text-amber-400 mt-2 truncate">{match.status}</p>
                    </div>
                  ))}
                  {completedMatches?.slice(0, 1).map((match) => (
                    <div key={match.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400 font-semibold">COMPLETED</span>
                        <span className="text-xs text-white/60">{match.matchType}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white font-medium truncate">{match.teams[0]}</span>
                          <span className="text-sm text-white font-bold">{match.score?.[0]?.r}/{match.score?.[0]?.w}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white font-medium truncate">{match.teams[1]}</span>
                          <span className="text-sm text-white font-bold">{match.score?.[1]?.r}/{match.score?.[1]?.w}</span>
                        </div>
                      </div>
                      <p className="text-xs text-emerald-400 mt-2 truncate font-medium">{match.status}</p>
                    </div>
                  ))}
                </div>
              ) : null}
              
              {/* Upcoming Matches */}
              {upcomingMatches && upcomingMatches.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white/80 mb-2">Upcoming</h4>
                  {upcomingMatches.slice(0, 2).map((match) => (
                    <div key={match.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-blue-400 font-semibold">UPCOMING</span>
                        <span className="text-xs text-white/60">{match.matchType}</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-white font-medium truncate">{match.teams[0]}</p>
                        <p className="text-xs text-white/60">vs</p>
                        <p className="text-sm text-white font-medium truncate">{match.teams[1]}</p>
                      </div>
                      <p className="text-xs text-white/60 mt-2">
                        {new Date(match.dateTimeGMT).toLocaleDateString('en-IN', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          )}
          </div>
        </div>
      </section>

      {/* Live Matches Section */}
      {liveMatches && liveMatches.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-red-500/10 via-background to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.1),transparent_50%)]" />
          <div className="container relative">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-red-500 text-white animate-pulse px-3 py-1">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                      <span className="w-2 h-2 bg-white rounded-full absolute"></span>
                      LIVE NOW
                    </span>
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-display font-bold">
                    Live Matches
                  </h2>
                </div>
                <p className="text-muted-foreground text-lg">Join the action happening right now</p>
              </div>
              <Link href="/select-match">
                <Button variant="outline" className="hidden md:flex hover-scale">
                  View All Matches
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {liveLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-10 h-10 animate-spin text-red-500" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveMatches.slice(0, 6).map((match: any) => (
                  <Card key={match.id} className="group hover-lift border-2 border-red-500/30 hover:border-red-500/50 transition-all bg-card/80 backdrop-blur-sm overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full" />
                    <CardContent className="p-6 relative">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-red-500 text-white font-semibold">
                          {match.matchType.toUpperCase()} • LIVE
                        </Badge>
                        <div className="flex items-center gap-1 text-red-500">
                          <Clock className="w-4 h-4 animate-pulse" />
                          <span className="text-xs font-medium">In Progress</span>
                        </div>
                      </div>

                      <h3 className="font-semibold text-lg mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                        {match.name}
                      </h3>

                      {/* Teams and Scores */}
                      <div className="space-y-3 mb-4">
                        {match.teamInfo?.slice(0, 2).map((team: any, idx: number) => {
                          const teamScore = match.score?.find((s: any) => 
                            s.inning.toLowerCase().includes(team.name.toLowerCase())
                          );
                          return (
                            <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-3">
                                {team.img && (
                                  <img src={team.img} alt={team.shortname} className="w-8 h-8 rounded-full object-cover" />
                                )}
                                <div>
                                  <p className="font-semibold text-sm">{team.shortname}</p>
                                </div>
                              </div>
                              {teamScore && (
                                <div className="text-right">
                                  <p className="font-bold text-lg">{teamScore.r}/{teamScore.w}</p>
                                  <p className="text-xs text-muted-foreground">({teamScore.o} ov)</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Match Status */}
                      {match.status && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 italic">
                          {match.status}
                        </p>
                      )}

                      {/* Venue */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-1">{match.venue}</span>
                      </div>

                      <Link href={`/build-team?matchId=${match.id}`}>
                        <Button className="w-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25">
                          Build Team Now
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Upcoming Matches Section */}
      {upcomingMatches && upcomingMatches.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-blue-500/5 via-background to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
          <div className="container relative">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-blue-500/10 text-blue-600 border border-blue-500/30 px-3 py-1">
                    <Clock className="w-3 h-3 mr-1" />
                    UPCOMING
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-display font-bold">
                    Upcoming Matches
                  </h2>
                </div>
                <p className="text-muted-foreground text-lg">Plan ahead and build your winning team</p>
              </div>
              <Link href="/select-match">
                <Button variant="outline" className="hidden md:flex hover-scale">
                  View All Matches
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {upcomingLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingMatches.slice(0, 6).map((match: any) => (
                  <Card key={match.id} className="group hover-lift border-2 border-border hover:border-primary/50 transition-all bg-card/80 backdrop-blur-sm overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full" />
                    <CardContent className="p-6 relative">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className="border-primary/30 text-primary font-semibold">
                          {match.matchType.toUpperCase()}
                        </Badge>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span className="text-xs font-medium">
                            {new Date(match.dateTimeGMT).toLocaleDateString('en-IN', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-semibold text-lg mb-4 line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem]">
                        {match.name}
                      </h3>

                      {/* Teams */}
                      <div className="space-y-2 mb-4">
                        {match.teamInfo?.slice(0, 2).map((team: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                            {team.img && (
                              <img src={team.img} alt={team.shortname} className="w-8 h-8 rounded-full object-cover" />
                            )}
                            <div>
                              <p className="font-semibold text-sm">{team.name}</p>
                              <p className="text-xs text-muted-foreground">{team.shortname}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Match Time */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-medium">
                          {new Date(match.dateTimeGMT).toLocaleString('en-IN', { 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>

                      {/* Venue */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-1">{match.venue}</span>
                      </div>

                      <Link href={`/build-team?matchId=${match.id}`}>
                        <Button className="w-full gradient-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                          Create Team
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="text-center mt-10">
              <Link href="/select-match">
                <Button size="lg" variant="outline" className="hover-scale">
                  Browse All Upcoming Matches
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="container relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Why Choose MBRIGHT Fantasy
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Fantasy Cricket, <span className="text-gradient">Reimagined</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the thrill of fantasy cricket without the stress of real money. 
              Learn, play, and compete in a safe, educational environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

          {/* Additional Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary-foreground text-sm font-medium rounded-full mb-4">
              Simple & Easy Process
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Start Playing in <span className="text-gradient-gold">4 Easy Steps</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get started with fantasy cricket in minutes. No complicated setup, no payment required.
            </p>
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
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {item.step}
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
              <Button size="lg" className="gradient-primary text-white shadow-lg shadow-primary/25 hover-scale">
                Get Started Now - It's Free
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
                without financial pressure. Our platform is backed by investors who share this vision 
                of making cricket education accessible to all.
              </p>
              
              <div className="space-y-4">
                {[
                  "No deposits or entry fees required",
                  "No real money transactions ever",
                  "Learn cricket strategy completely risk-free",
                  "Compete for leaderboard glory and recognition",
                  "Perfect for beginners and experienced players",
                  "Educational focus with detailed player insights"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/about">
                  <Button variant="outline" size="lg" className="hover-scale">
                    Learn More About Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
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
                      <p className="text-muted-foreground">No hidden charges, ever</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                      <span className="text-muted-foreground">Entry Fee</span>
                      <span className="font-semibold text-primary text-xl">₹0</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                      <span className="text-muted-foreground">Deposit Required</span>
                      <span className="font-semibold text-primary">None</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                      <span className="text-muted-foreground">Real Money</span>
                      <span className="font-semibold text-primary">Not Involved</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                      <span className="text-muted-foreground">Winnings</span>
                      <span className="font-semibold text-primary">Leaderboard Glory</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-primary/10 rounded-xl">
                    <p className="text-sm text-center text-muted-foreground">
                      <span className="font-semibold text-foreground">100% Educational:</span> Focus on learning cricket strategy, not gambling
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-[url('/hero-cricket.png')] bg-cover bg-center opacity-10" />
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Ready to Start Your
            <br />
            <span className="text-gradient-gold">Fantasy Cricket Journey?</span>
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of cricket fans learning and competing on India's premier 
            free-to-play fantasy cricket platform.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="gradient-gold text-foreground font-semibold px-10 shadow-2xl shadow-amber-500/30 hover-scale text-lg">
                Create Free Account
                <ChevronRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/select-match">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm text-lg">
                Browse Matches
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
