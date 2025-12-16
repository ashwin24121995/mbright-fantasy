import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

const blogContent: Record<string, { title: string; date: string; readTime: string; category: string; content: string }> = {
  "getting-started-fantasy-cricket": {
    title: "Getting Started with Fantasy Cricket: A Beginner's Guide",
    date: "2024-12-15",
    readTime: "5 min read",
    category: "Beginner Guide",
    content: `
Fantasy cricket is an exciting way to engage with the sport you love while testing your cricket knowledge and analytical skills. Here's everything you need to know to get started.

## What is Fantasy Cricket?

Fantasy cricket allows you to create a virtual team of real cricket players. Your team earns points based on how those players perform in actual matches. The better your players perform, the more points you score.

## Understanding Player Roles

In fantasy cricket, players are categorized into four roles:

1. **Wicket-Keeper (WK)**: The player behind the stumps. They can earn points through catches, stumpings, and batting.

2. **Batsmen (BAT)**: Primary run-scorers. They earn points through runs, boundaries, and batting milestones.

3. **All-Rounders (AR)**: Players who both bat and bowl. They can earn points from both disciplines, making them valuable picks.

4. **Bowlers (BOWL)**: Wicket-takers. They earn points through wickets, maiden overs, and economy rate bonuses.

## Building Your First Team

When building your team, remember these key rules:
- Select exactly 11 players
- Stay within the 100 credit budget
- Maximum 7 players from one team
- Include at least 1 WK, 3 BAT, 1 AR, and 3 BOWL

## Captain and Vice-Captain

Your captain earns 2x points, and your vice-captain earns 1.5x points. Choose wisely based on:
- Recent form
- Match conditions
- Opposition strength
- Historical performance at the venue

## Tips for Beginners

1. **Research**: Study player statistics and recent performances
2. **Balance**: Don't spend all credits on star players
3. **Diversify**: Pick players from both teams
4. **Stay Updated**: Check team news before the match
5. **Learn**: Analyze your performance after each match

Start your fantasy cricket journey today and enjoy the thrill of building winning teams!
    `
  },
  "captain-selection-strategies": {
    title: "Captain Selection Strategies: Maximizing Your Points",
    date: "2024-12-10",
    readTime: "4 min read",
    category: "Strategy",
    content: `
Your captain selection can make or break your fantasy team. With 2x points multiplier, choosing the right captain is crucial for success.

## Why Captain Selection Matters

A captain who scores 100 points gives you 200 points, while a poor captain choice scoring 20 points only gives you 40. This difference of 160 points can significantly impact your ranking.

## Factors to Consider

### 1. Current Form
Look at the player's last 5-10 matches. Consistent performers are safer captain choices than inconsistent ones.

### 2. Match Conditions
- **Batting-friendly pitch**: Consider top-order batsmen
- **Bowling-friendly pitch**: Premium bowlers become attractive
- **Spin-friendly conditions**: Spinners and players good against spin

### 3. Opposition Analysis
- How has the player performed against this opponent?
- What are the opposition's weaknesses?

### 4. Venue History
Some players perform exceptionally well at certain venues. Check historical data.

## Safe vs. Differential Captains

**Safe Captains**: Star players who consistently perform. Lower risk, but everyone picks them.

**Differential Captains**: Less popular picks who can give you an edge if they perform well.

## Captain Selection by Format

### T20 Matches
- Openers who bat through the innings
- Death bowlers who bowl 4 overs
- All-rounders who bat in top 4 and bowl 2+ overs

### ODI Matches
- Middle-order batsmen who can accelerate
- Bowlers who bowl in both powerplays
- All-rounders with significant roles

### Test Matches
- Batsmen in good form
- Bowlers on helpful pitches
- Players with good records at the venue

Remember, there's no perfect formula. Use data, trust your analysis, and learn from each match!
    `
  },
  "understanding-player-credits": {
    title: "Understanding Player Credits and Team Balance",
    date: "2024-12-05",
    readTime: "6 min read",
    category: "Strategy",
    content: `
Managing your 100 credits effectively is essential for building a competitive fantasy team. Here's how to optimize your credit allocation.

## How Credits Work

Each player is assigned a credit value based on their skill level, recent form, and expected performance. Star players cost more credits, while lesser-known players cost fewer.

## Credit Distribution Strategy

### The Balanced Approach
- 2-3 premium players (9+ credits each)
- 4-5 mid-range players (7-8.5 credits)
- 3-4 budget players (6-7 credits)

### The Star-Heavy Approach
- 4-5 premium players
- Fill remaining spots with budget picks
- Higher risk, higher reward

### The Value Approach
- Focus on undervalued players
- More mid-range picks
- Consistent but may lack explosive potential

## Finding Value Picks

Value picks are players who cost less than their potential suggests. Look for:

1. **Emerging Players**: Young talents getting opportunities
2. **In-Form Players**: Those on a hot streak but not yet expensive
3. **Role Changes**: Players promoted in batting order
4. **Favorable Matchups**: Players facing weak opposition

## Common Credit Mistakes

1. **Overspending on one role**: Don't put all credits into batsmen
2. **Ignoring all-rounders**: They offer dual earning potential
3. **Chasing past glory**: Credits reflect current value, not historical
4. **Neglecting budget picks**: Sometimes cheap players outperform

## Sample Credit Allocation

For a balanced team:
- WK: 8.5 credits
- BAT 1: 9.5 credits (premium)
- BAT 2: 8.0 credits
- BAT 3: 7.0 credits
- AR 1: 9.0 credits (premium)
- AR 2: 8.0 credits
- BOWL 1: 9.0 credits (premium)
- BOWL 2: 8.0 credits
- BOWL 3: 7.5 credits
- BOWL 4: 7.0 credits
- BOWL 5: 8.5 credits

Total: 100 credits

Master credit management, and you'll consistently build competitive teams!
    `
  }
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogContent[slug || ""];

  if (!post) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12 max-w-3xl">
        <Link href="/blog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        <Card>
          <CardContent className="p-8">
            <div className="mb-6">
              <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-xl font-semibold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="text-lg font-medium mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
                  const items = paragraph.split('\n').filter(item => item.trim());
                  return (
                    <ul key={index} className="list-disc list-inside space-y-1 my-4 text-muted-foreground">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace(/^[-\d.]\s*/, '').replace(/\*\*/g, '')}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={index} className="text-muted-foreground mb-4">{paragraph}</p>;
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
