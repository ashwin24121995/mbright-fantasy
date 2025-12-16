import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Loader2, Mail, Lock, ArrowRight, Shield, Sparkles } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      toast.success("Welcome back!");
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Invalid email or password");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        {/* Background Elements */}
        <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />
        
        <div className="w-full max-w-md relative">
          {/* Decorative glow */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
          
          <Card className="relative border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
            <CardHeader className="space-y-4 pb-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/25">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-center">
                <CardTitle className="text-2xl font-display">Welcome Back</CardTitle>
                <CardDescription className="text-base mt-2">
                  Sign in to continue to your dashboard
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 bg-muted/50 border-0 focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12 bg-muted/50 border-0 focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 gradient-primary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t text-center">
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-primary font-semibold hover:underline">
                    Create one free
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Trust indicator */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>100% Free to Play • No Real Money</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
