import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsConditions() {
  return (
    <Layout>
      <div className="container py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
        
        <Card>
          <CardContent className="p-8 prose prose-sm max-w-none">
            <p className="text-muted-foreground mb-6">Last Updated: December 2024</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using MBRIGHT Fantasy ("Platform"), operated by MBRIGHT TECH (OPC) PRIVATE LIMITED ("Company", "we", "us"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. Eligibility</h2>
              <p className="text-muted-foreground mb-4">To use MBRIGHT Fantasy, you must:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Not be a resident of Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim, or Telangana</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. Nature of Platform</h2>
              <p className="text-muted-foreground mb-4">
                MBRIGHT Fantasy is a FREE-TO-PLAY fantasy cricket platform designed purely for entertainment and educational purposes. Key points:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>No real money is involved in any form</li>
                <li>No deposits or withdrawals are available</li>
                <li>No cash prizes or monetary rewards are offered</li>
                <li>This is a skill-based game for learning fantasy cricket</li>
                <li>Leaderboard rankings are for recognition only</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. User Conduct</h2>
              <p className="text-muted-foreground mb-4">Users agree not to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Create multiple accounts</li>
                <li>Use automated systems or bots</li>
                <li>Attempt to manipulate the platform or scores</li>
                <li>Share account credentials with others</li>
                <li>Engage in any fraudulent or illegal activities</li>
                <li>Harass or abuse other users</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. Account Termination</h2>
              <p className="text-muted-foreground">
                We reserve the right to suspend or terminate your account at any time for violation of these terms, suspicious activity, or any other reason at our sole discretion. Users may also request account deletion by contacting us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on the Platform, including but not limited to logos, graphics, text, and software, is the property of MBRIGHT TECH (OPC) PRIVATE LIMITED and is protected by intellectual property laws. Users may not copy, modify, or distribute any content without prior written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground">
                The Platform is provided "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free service. We are not responsible for any technical issues, data loss, or service interruptions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, MBRIGHT TECH (OPC) PRIVATE LIMITED shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">9. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms and Conditions at any time. Continued use of the Platform after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">10. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">11. Contact Information</h2>
              <p className="text-muted-foreground">
                For any questions regarding these Terms and Conditions, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-semibold">MBRIGHT TECH (OPC) PRIVATE LIMITED</p>
                <p className="text-muted-foreground">504 INFOCITY EXCELLENCE, GOPANAPALLY, CUC</p>
                <p className="text-muted-foreground">Serilingampally, Hyderabad-500046, Telangana</p>
                <p className="text-muted-foreground">CIN: U62099TS2023OPC177483</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
