import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Clock, Users, AlertTriangle, Shield } from "lucide-react";

export default function ResponsibleGaming() {
  return (
    <Layout>
      <div className="container py-12 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Heart className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold">Responsible Gaming</h1>
        </div>
        
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <p className="text-lg">
              At MBRIGHT Fantasy, we believe in promoting healthy gaming habits. While our platform is completely free-to-play with no real money involved, we still encourage responsible use of our services.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold">Time Management</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Set limits on how much time you spend on fantasy cricket. Balance your gaming with other activities, work, and personal relationships.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold">Social Balance</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Don't let fantasy cricket interfere with your social life. Enjoy the game as a fun activity, not as a replacement for real-world interactions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <h3 className="font-semibold">Age Restriction</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Our platform is strictly for users 18 years and older. We have age verification measures in place to ensure compliance.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold">Safe Environment</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                No real money is involved on our platform. This eliminates financial risk and keeps the focus on learning and entertainment.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Our Responsible Gaming Principles</h2>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-medium mb-2">1. Free-to-Play Model</h3>
                <p className="text-muted-foreground">
                  MBRIGHT Fantasy is completely free to play. There are no deposits, no entry fees, and no real money transactions. This ensures that users can enjoy fantasy cricket without any financial risk or pressure.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-medium mb-2">2. Education Focus</h3>
                <p className="text-muted-foreground">
                  Our platform is designed to help users learn about fantasy cricket strategy and player analysis. We encourage users to approach the game as a learning experience rather than a competitive obsession.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-medium mb-2">3. No Gambling</h3>
                <p className="text-muted-foreground">
                  Unlike many fantasy platforms, we do not offer any form of gambling or real-money contests. Our leaderboard rankings are purely for recognition and bragging rights.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-medium mb-2">4. State Compliance</h3>
                <p className="text-muted-foreground">
                  We comply with state regulations by restricting access to users from Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim, and Telangana, where online gaming regulations apply.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-medium mb-2">5. Support Resources</h3>
                <p className="text-muted-foreground">
                  If you feel that gaming is negatively impacting your life, we encourage you to seek help. You can contact us to deactivate your account at any time, or reach out to professional support services.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you or someone you know is struggling with gaming habits, please reach out for help:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Contact our support team to deactivate your account</li>
              <li>• Speak to a trusted friend or family member</li>
              <li>• Consult a mental health professional</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
