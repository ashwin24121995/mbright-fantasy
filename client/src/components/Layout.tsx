import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, LogOut, Trophy, Home, Info, HelpCircle, Shield, BookOpen, Mail } from "lucide-react";
import { useState } from "react";

const RESTRICTED_STATES = ["Andhra Pradesh", "Assam", "Nagaland", "Odisha", "Sikkim", "Telangana"];

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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="MBRIGHT Fantasy" className="h-10 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Badges & Auth */}
            <div className="flex items-center gap-3">
              <img src="/badge-18plus.png" alt="18+" className="h-8 w-8 hidden sm:block" />
              <img src="/badge-fairplay.png" alt="Fair Play" className="h-8 w-8 hidden sm:block" />
              
              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-1" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="outline" size="sm">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="bg-primary text-primary-foreground">Register</Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <div className="flex flex-col gap-4 mt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <img src="/badge-18plus.png" alt="18+" className="h-8 w-8" />
                      <img src="/badge-fairplay.png" alt="Fair Play" className="h-8 w-8" />
                    </div>
                    
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                          location === link.href
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted"
                        }`}
                      >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    ))}
                    
                    <div className="border-t pt-4 mt-2">
                      {isAuthenticated ? (
                        <>
                          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="outline" className="w-full mb-2">
                              <User className="h-4 w-4 mr-2" />
                              Dashboard
                            </Button>
                          </Link>
                          <Button variant="ghost" className="w-full" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                          </Button>
                        </>
                      ) : (
                        <>
                          <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="outline" className="w-full mb-2">Login</Button>
                          </Link>
                          <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="w-full bg-primary text-primary-foreground">Register</Button>
                          </Link>
                        </>
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

      {/* Footer */}
      <footer className="bg-foreground text-background">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <img src="/logo.png" alt="MBRIGHT Fantasy" className="h-12 w-auto mb-4 brightness-0 invert" />
              <p className="text-sm text-background/70 mb-4">
                Play Smart, Learn Cricket. India's premier free-to-play fantasy cricket platform for education and entertainment.
              </p>
              <div className="flex gap-2">
                <img src="/badge-18plus.png" alt="18+" className="h-10 w-10" />
                <img src="/badge-fairplay.png" alt="Fair Play" className="h-10 w-10" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><Link href="/how-to-play" className="hover:text-background">How To Play</Link></li>
                <li><Link href="/leaderboard" className="hover:text-background">Leaderboard</Link></li>
                <li><Link href="/blog" className="hover:text-background">Blog</Link></li>
                <li><Link href="/faq" className="hover:text-background">FAQ</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><Link href="/terms" className="hover:text-background">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-background">Privacy Policy</Link></li>
                <li><Link href="/fair-play" className="hover:text-background">Fair Play Policy</Link></li>
                <li><Link href="/responsible-gaming" className="hover:text-background">Responsible Gaming</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <p className="text-sm text-background/70 mb-2">
                MBRIGHT TECH (OPC) PRIVATE LIMITED
              </p>
              <p className="text-sm text-background/70 mb-2">
                504 INFOCITY EXCELLENCE, GOPANAPALLY, CUC, Serilingampally, Hyderabad-500046, Telangana
              </p>
              <p className="text-sm text-background/70">
                CIN: U62099TS2023OPC177483
              </p>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="border-t border-background/20 mt-8 pt-8">
            <div className="bg-destructive/20 border border-destructive/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-center font-medium">
                <strong>Legal Disclaimer:</strong> This platform is NOT available in Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim. Only users 18 years and older are permitted. This is a skill-based, free-to-play platform with no real money involved.
              </p>
            </div>
            <p className="text-center text-sm text-background/60">
              © {new Date().getFullYear()} MBRIGHT TECH (OPC) PRIVATE LIMITED. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
