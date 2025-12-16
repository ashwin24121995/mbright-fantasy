import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function FairPlayPolicy() {
  return (
    <Layout>
      <div className="container py-12 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Shield className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold">Fair Play Policy</h1>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-8">
            <p className="text-lg text-muted-foreground mb-6">
              At MBRIGHT Fantasy, we are committed to maintaining a fair and enjoyable environment for all users. Our Fair Play Policy ensures that everyone has an equal opportunity to compete and enjoy fantasy cricket.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-semibold text-green-800">What We Encourage</h2>
              </div>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Using your own cricket knowledge and research</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Learning from other players' strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Healthy competition and sportsmanship</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Reporting suspicious activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Respecting other users</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-semibold text-red-800">What We Prohibit</h2>
              </div>
              <ul className="space-y-3 text-red-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Creating multiple accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Using bots or automated systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Colluding with other users</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Exploiting system vulnerabilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Abusive or offensive behavior</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Our Commitment to Fair Play</h2>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-medium mb-2">1. Equal Opportunity</h3>
                <p className="text-muted-foreground">
                  Every user has equal access to match information, player statistics, and team-building tools. We do not provide any user with unfair advantages.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-medium mb-2">2. Transparent Scoring</h3>
                <p className="text-muted-foreground">
                  Our points system is clearly documented and applied consistently to all users. Points are calculated based on official match statistics from reliable sources.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-medium mb-2">3. Anti-Fraud Measures</h3>
                <p className="text-muted-foreground">
                  We employ various technical measures to detect and prevent fraudulent activities, including multiple account detection, bot prevention, and unusual activity monitoring.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-medium mb-2">4. Enforcement</h3>
                <p className="text-muted-foreground">
                  Violations of our Fair Play Policy may result in warnings, temporary suspension, or permanent account termination depending on the severity of the offense.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-medium mb-2">5. Reporting</h3>
                <p className="text-muted-foreground">
                  If you suspect any user of violating our Fair Play Policy, please report it through our Contact page. All reports are investigated confidentially.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Remember</h3>
                <p className="text-sm text-muted-foreground">
                  MBRIGHT Fantasy is a free-to-play platform for entertainment and education. There are no real money stakes, so let's keep the competition friendly and fun for everyone!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
