import Layout from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function FAQ() {
  const faqs = [
    {
      question: "What is MBRIGHT Fantasy?",
      answer: "MBRIGHT Fantasy is a free-to-play fantasy cricket platform where you can create virtual teams of real cricket players and earn points based on their real-match performances. It's designed for entertainment and education purposes only, with no real money involved."
    },
    {
      question: "Is it really free to play?",
      answer: "Yes, absolutely! MBRIGHT Fantasy is 100% free to play. There are no deposits, no entry fees, and no real money transactions. We are backed by investors who believe in fantasy education, allowing us to offer this platform completely free."
    },
    {
      question: "Who can play on MBRIGHT Fantasy?",
      answer: "Anyone who is 18 years or older can play, except residents of Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim, and Telangana due to state government regulations."
    },
    {
      question: "How do I create a team?",
      answer: "After registering, go to the 'Select Match' section, choose an upcoming match, and click 'Build Team'. Select 11 players within 100 credits, choose your Captain (2x points) and Vice-Captain (1.5x points), and submit your team before the match starts."
    },
    {
      question: "What are the team building rules?",
      answer: "You must select exactly 11 players within 100 credits. Maximum 7 players can be from one team. Your team must include at least 1 Wicket-Keeper, 3 Batsmen, 3 Bowlers, and 1 All-Rounder."
    },
    {
      question: "How are points calculated?",
      answer: "Points are calculated based on real match performances. Batsmen earn points for runs, boundaries, and milestones. Bowlers earn points for wickets and maiden overs. Fielders earn points for catches, stumpings, and run-outs. Captain gets 2x points and Vice-Captain gets 1.5x points."
    },
    {
      question: "Can I edit my team after submission?",
      answer: "No, once you submit your team, you cannot make any changes. Make sure to review your team carefully before submitting."
    },
    {
      question: "What happens if a player in my team doesn't play?",
      answer: "If a player in your team doesn't play in the actual match, they will score 0 points. That's why it's important to check team announcements and playing XI before the match starts."
    },
    {
      question: "Are there any prizes or rewards?",
      answer: "MBRIGHT Fantasy is purely for entertainment and education. There are no cash prizes or real rewards. Winners are recognized on the leaderboard for bragging rights!"
    },
    {
      question: "Why are some states restricted?",
      answer: "Due to state government regulations regarding online gaming, residents of Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim, and Telangana are not permitted to use this platform."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach us through the Contact Us page on our website. We typically respond within 24-48 hours."
    },
    {
      question: "Is my personal information safe?",
      answer: "Yes, we take data privacy seriously. Please refer to our Privacy Policy for detailed information on how we collect, use, and protect your personal information."
    }
  ];

  return (
    <Layout>
      <div className="container py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">
            Find answers to common questions about MBRIGHT Fantasy
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-primary/5">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">Still have questions?</h3>
            <p className="text-sm text-muted-foreground">
              Contact us through our Contact page and we'll get back to you within 24-48 hours.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
