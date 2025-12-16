import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Menu, User, LogOut, Trophy, Home, Info, HelpCircle, Mail, 
  Twitter, Instagram, Youtube, ChevronRight, Shield, Heart,
  BookOpen, FileText, Scale, Gamepad2
} from "lucide-react";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/how-to-play", label: "How To Play", icon: HelpCircle },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Modern Header with Glassmorphism */}
      <header className="sticky top-0 z-50 glass border-b border-white/10 shadow-lg shadow-black/5">
        <div className="container">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img src="/logo.png" alt="MBRIGHT Fantasy" className="h-11 w-auto transition-transform group-hover:scale-105" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    location === link.href 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                  {location === link.href && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Badges */}
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-destructive/10 rounded-full">
                  <span className="text-xs font-bold text-destructive">18+</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-primary/10 rounded-full">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">Fair Play</span>
                </div>
              </div>
              
              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/dashboard">
                    <Button className="gradient-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="gradient-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                      Get Started
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="relative">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="p-6 border-b">
                      <img src="/logo.png" alt="MBRIGHT Fantasy" className="h-10 w-auto" />
                      <div className="flex items-center gap-2 mt-4">
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-destructive/10 rounded-full">
                          <span className="text-xs font-bold text-destructive">18+</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-primary/10 rounded-full">
                          <Shield className="h-3.5 w-3.5 text-primary" />
                          <span className="text-xs font-medium text-primary">Fair Play</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile Nav */}
                    <div className="flex-1 overflow-auto p-4">
                      <nav className="space-y-1">
                        {navLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                              location === link.href
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                : "hover:bg-muted"
                            }`}
                          >
                            <link.icon className="h-5 w-5" />
                            <span className="font-medium">{link.label}</span>
                          </Link>
                        ))}
                      </nav>
                    </div>
                    
                    {/* Mobile Auth */}
                    <div className="p-4 border-t bg-muted/50">
                      {isAuthenticated ? (
                        <div className="space-y-2">
                          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="w-full gradient-primary text-white">
                              <User className="h-4 w-4 mr-2" />
                              Dashboard
                            </Button>
                          </Link>
                          <Button variant="outline" className="w-full" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="w-full gradient-primary text-white">
                              Get Started
                            </Button>
                          </Link>
                          <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="outline" className="w-full">
                              Login
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Modern Footer */}
      <footer className="relative bg-foreground text-background overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        
        <div className="container relative">
          {/* Main Footer Content */}
          <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <img src="/logo.png" alt="MBRIGHT Fantasy" className="h-12 w-auto mb-6 brightness-0 invert" />
              <p className="text-background/70 mb-6 leading-relaxed">
                India's premier free-to-play fantasy cricket platform. Build your dream team, compete with friends, and master cricket strategy without any financial risk.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-2 bg-white/10 rounded-lg">
                  <span className="text-sm font-bold text-red-400">18+</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 bg-white/10 rounded-lg">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium">Fair Play</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="font-display font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { href: "/how-to-play", label: "How To Play", icon: Gamepad2 },
                  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
                  { href: "/blog", label: "Blog", icon: BookOpen },
                  { href: "/faq", label: "FAQ", icon: HelpCircle },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="flex items-center gap-2 text-background/70 hover:text-background transition-colors group">
                      <link.icon className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="lg:col-span-2">
              <h4 className="font-display font-semibold text-lg mb-6">Legal</h4>
              <ul className="space-y-3">
                {[
                  { href: "/terms", label: "Terms & Conditions", icon: FileText },
                  { href: "/privacy", label: "Privacy Policy", icon: Shield },
                  { href: "/fair-play", label: "Fair Play Policy", icon: Scale },
                  { href: "/responsible-gaming", label: "Responsible Gaming", icon: Heart },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="flex items-center gap-2 text-background/70 hover:text-background transition-colors group">
                      <link.icon className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Info */}
            <div className="lg:col-span-4">
              <h4 className="font-display font-semibold text-lg mb-6">Company</h4>
              <div className="space-y-4 text-background/70">
                <p className="font-medium text-background">MBRIGHT TECH (OPC) PRIVATE LIMITED</p>
                <p className="text-sm leading-relaxed">
                  504 INFOCITY EXCELLENCE, GOPANAPALLY, CUC,<br />
                  Serilingampally, Hyderabad-500046, Telangana
                </p>
                <div className="pt-2 space-y-1 text-sm">
                  <p><span className="text-background/50">CIN:</span> U62099TS2023OPC177483</p>
                  <p><span className="text-background/50">PAN:</span> AARCM3281H</p>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-3 mt-6">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="py-6 border-t border-white/10">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 mb-6">
              <p className="text-sm text-center leading-relaxed">
                <strong className="text-red-400">Legal Disclaimer:</strong>{" "}
                <span className="text-background/80">
                  This platform is NOT available in Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim. 
                  Only users 18 years and older are permitted. This is a skill-based, free-to-play platform with no real money involved.
                </span>
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} MBRIGHT TECH (OPC) PRIVATE LIMITED. All rights reserved.
            </p>
            <p className="text-sm text-background/60">
              Made with <Heart className="h-3 w-3 inline text-red-400 mx-1" /> in India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
