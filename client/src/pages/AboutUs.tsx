import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Shield, Award } from "lucide-react";

export default function AboutUs() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To make fantasy cricket accessible to everyone for skill development and entertainment, without any financial risk."
    },
    {
      icon: Users,
      title: "Community First",
      description: "We believe in building a community of cricket enthusiasts who can learn, compete, and grow together."
    },
    {
      icon: Shield,
      title: "Fair Play",
      description: "We maintain the highest standards of integrity and ensure fair competition for all our users."
    },
    {
      icon: Award,
      title: "Education Focus",
      description: "Our platform is designed to help users understand cricket strategy and fantasy sports mechanics."
    }
  ];

  return (
    <Layout>
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About MBRIGHT Fantasy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            India's premier free-to-play fantasy cricket platform, backed by investors who believe in fantasy education.
          </p>
        </div>

        {/* Company Info */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  MBRIGHT Fantasy was founded with a simple vision: to create a platform where cricket fans can experience the thrill of fantasy sports without any financial pressure. We understand that learning fantasy cricket can be intimidating, especially when real money is involved.
                </p>
                <p className="text-muted-foreground mb-4">
                  That's why we created a completely free-to-play platform where users can learn, experiment, and master fantasy cricket strategies at their own pace. Our investors share our belief in fantasy education and have backed us to make this vision a reality.
                </p>
                <p className="text-muted-foreground">
                  Today, we're proud to offer a platform that combines the excitement of fantasy cricket with the safety of a no-money environment, making it perfect for beginners and experienced players alike.
                </p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Company Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Company Name</p>
                    <p className="font-semibold">MBRIGHT TECH (OPC) PRIVATE LIMITED</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">CIN</p>
                    <p className="font-semibold">U62099TS2023OPC177483</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Registered Address</p>
                    <p className="font-semibold">504 INFOCITY EXCELLENCE, GOPANAPALLY, CUC, Serilingampally, Hyderabad-500046, Telangana</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Incorporated</p>
                    <p className="font-semibold">September 25, 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Free */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Why Free to Play?</h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="mb-4 text-primary-foreground/90">
                We are backed by investors who believe in fantasy education. They understand that the best way to learn fantasy sports is through practice, not by risking real money.
              </p>
              <p className="text-primary-foreground/90">
                Our free-to-play model allows users to learn cricket strategy, understand player performance metrics, and develop their fantasy skills without any financial pressure. This is purely for entertainment and education purposes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
