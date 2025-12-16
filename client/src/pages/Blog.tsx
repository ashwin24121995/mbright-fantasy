import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Calendar, Clock, ChevronRight } from "lucide-react";

const blogPosts = [
  {
    slug: "getting-started-fantasy-cricket",
    title: "Getting Started with Fantasy Cricket: A Beginner's Guide",
    excerpt: "Learn the basics of fantasy cricket, from understanding player roles to building your first winning team.",
    date: "2024-12-15",
    readTime: "5 min read",
    category: "Beginner Guide"
  },
  {
    slug: "captain-selection-strategies",
    title: "Captain Selection Strategies: Maximizing Your Points",
    excerpt: "Your captain earns 2x points. Learn how to choose the right captain for different match situations.",
    date: "2024-12-10",
    readTime: "4 min read",
    category: "Strategy"
  },
  {
    slug: "understanding-player-credits",
    title: "Understanding Player Credits and Team Balance",
    excerpt: "How to balance your team within 100 credits while maximizing potential points.",
    date: "2024-12-05",
    readTime: "6 min read",
    category: "Strategy"
  },
  {
    slug: "pitch-conditions-impact",
    title: "How Pitch Conditions Affect Player Performance",
    excerpt: "Learn to analyze pitch conditions and how they impact batsmen and bowlers differently.",
    date: "2024-12-01",
    readTime: "5 min read",
    category: "Analysis"
  },
  {
    slug: "all-rounder-value",
    title: "The Value of All-Rounders in Fantasy Cricket",
    excerpt: "Why all-rounders can be game-changers and how to identify the best ones for your team.",
    date: "2024-11-25",
    readTime: "4 min read",
    category: "Strategy"
  },
  {
    slug: "common-mistakes-avoid",
    title: "5 Common Mistakes Fantasy Cricket Beginners Make",
    excerpt: "Avoid these common pitfalls that can hurt your fantasy cricket performance.",
    date: "2024-11-20",
    readTime: "5 min read",
    category: "Beginner Guide"
  }
];

export default function Blog() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Fantasy Cricket Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tips, strategies, and insights to help you become a better fantasy cricket player
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium">
                    Read More <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
