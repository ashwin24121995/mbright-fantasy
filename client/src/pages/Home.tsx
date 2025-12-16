import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Trophy, Users, Shield, Zap, Target, BookOpen, ChevronRight } from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Trophy,
      title: "Free to Play",
      description: "No real money involved. Play for fun, learn strategies, and compete on leaderboards without any financial risk."
    },
    {
      icon: Users,
      title: "Build Your Dream Team",
      description: "Select 11 players from real cricket matches. Choose your captain and vice-captain wisely to maximize points."
    },
    {
      icon: Shield,
      title: "100% Fair Play",
      description: "Our platform ensures fair competition with transparent scoring and anti-fraud measures."
    },
    {
      icon: Target,
      title: "Skill-Based Gaming",
      description: "Success depends on your cricket knowledge and strategic thinking, not luck."
    },
    {
      icon: BookOpen,
      title: "Learn & Improve",
      description: "Perfect platform for beginners to learn fantasy cricket without any pressure."
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      description: "Live score updates and instant point calculations during matches."
    }
  ];

  const howItWorks = [
    { step: "1", title: "Register", description: "Create your free account in seconds" },
    { step: "2", title: "Select Match", description: "Choose from upcoming cricket matches" },
    { step: "3", title: "Build Team", description: "Pick 11 players within the credit limit" },
    { step: "4", title: "Compete", description: "Watch your team score and climb the leaderboard" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-cricket.png" 
            alt="Fantasy Cricket" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
        
        <div className="container relative z-10 py-20 md:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <img src="/badge-18plus.png" alt="18+" className="h-10 w-10" />
              <img src="/badge-fairplay.png" alt="Fair Play" className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Play Smart,<br />
              <span className="text-gradient">Learn Cricket</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              India's premier free-to-play fantasy cricket platform. Build your dream team, compete with friends, and master cricket strategy without any financial risk.
            </p>
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Go to Dashboard
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/register">
                    <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      Start Playing Free
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/how-to-play">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      How It Works
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose MBRIGHT Fantasy?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the thrill of fantasy cricket without any financial commitment. Perfect for learning and entertainment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in just 4 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/how-to-play">
              <Button variant="outline" size="lg">
                Learn More About How To Play
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Builder Preview */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Build Your Dream Team</h2>
              <p className="text-primary-foreground/80 mb-6">
                Select 11 players from real cricket matches. Balance your team with batsmen, bowlers, all-rounders, and a wicket-keeper. Choose your captain for 2x points and vice-captain for 1.5x points.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-xs font-bold text-secondary-foreground">✓</span>
                  </div>
                  <span>100 credits to build your team</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-xs font-bold text-secondary-foreground">✓</span>
                  </div>
                  <span>Maximum 7 players from one team</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-xs font-bold text-secondary-foreground">✓</span>
                  </div>
                  <span>Real player statistics and form</span>
                </li>
              </ul>
              {!isAuthenticated && (
                <Link href="/register">
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Create Your First Team
                  </Button>
                </Link>
              )}
            </div>
            <div className="relative">
              <img 
                src="/team-builder.png" 
                alt="Team Builder" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Playing?</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Join thousands of cricket fans who are learning and enjoying fantasy cricket for free. No deposits, no withdrawals, just pure cricket fun!
            </p>
            {!isAuthenticated && (
              <Link href="/register">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Register Now - It's Free!
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
