import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import SelectMatch from "./pages/SelectMatch";
import BuildTeam from "./pages/BuildTeam";
import TeamPreview from "./pages/TeamPreview";
import Leaderboard from "./pages/Leaderboard";
import AboutUs from "./pages/AboutUs";
import HowToPlay from "./pages/HowToPlay";
import FAQ from "./pages/FAQ";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FairPlayPolicy from "./pages/FairPlayPolicy";
import ResponsibleGaming from "./pages/ResponsibleGaming";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      {/* Public Pages */}
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password/:token" component={ResetPassword} />
      
      {/* Info Pages */}
      <Route path="/about" component={AboutUs} />
      <Route path="/how-to-play" component={HowToPlay} />
      <Route path="/faq" component={FAQ} />
      <Route path="/terms" component={TermsConditions} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/fair-play" component={FairPlayPolicy} />
      <Route path="/responsible-gaming" component={ResponsibleGaming} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contact" component={ContactUs} />
      <Route path="/leaderboard" component={Leaderboard} />
      
      {/* Protected Pages */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />
      <Route path="/settings" component={Settings} />
      <Route path="/matches" component={SelectMatch} />
      <Route path="/build-team/:matchId" component={BuildTeam} />
      <Route path="/team-preview/:teamId" component={TeamPreview} />
      
      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
