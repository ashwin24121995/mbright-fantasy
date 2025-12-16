import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="container py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <Card>
          <CardContent className="p-8 prose prose-sm max-w-none">
            <p className="text-muted-foreground mb-6">Last Updated: December 2024</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                MBRIGHT TECH (OPC) PRIVATE LIMITED ("Company", "we", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use MBRIGHT Fantasy ("Platform").
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">We collect the following types of information:</p>
              
              <h3 className="text-lg font-medium mb-2">Personal Information</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number (optional)</li>
                <li>Date of birth (for age verification)</li>
                <li>State of residence (for compliance)</li>
              </ul>

              <h3 className="text-lg font-medium mb-2">Usage Information</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Teams created and players selected</li>
                <li>Match participation history</li>
                <li>Points and leaderboard rankings</li>
                <li>Device information and IP address</li>
                <li>Browser type and operating system</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use your information to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Create and manage your account</li>
                <li>Verify your age and eligibility</li>
                <li>Provide and improve our services</li>
                <li>Calculate and display leaderboard rankings</li>
                <li>Send important service updates</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Ensure compliance with legal requirements</li>
                <li>Prevent fraud and maintain platform security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Service providers who assist in operating our Platform</li>
                <li>Legal authorities when required by law</li>
                <li>Other users (only your name on leaderboards)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your personal information for as long as your account is active or as needed to provide you services. You may request deletion of your account and associated data at any time by contacting us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. Your Rights</h2>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for data processing</li>
                <li>Lodge a complaint with relevant authorities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">8. Cookies</h2>
              <p className="text-muted-foreground">
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, and maintain session security. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">9. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our Platform is not intended for users under 18 years of age. We do not knowingly collect information from children under 18. If we become aware of such collection, we will delete the information immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">10. Changes to Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground">
                For any questions about this Privacy Policy, please contact us at:
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
