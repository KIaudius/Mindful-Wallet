
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, BookOpenText, Cpu, BarChart3, Brain, Tags } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const features = [
    { title: "Daily Reflection", description: "Log your emotions and spending triggers.", href: "/reflection", icon: BookOpenText, color: "text-purple-400" },
    { title: "Spending Simulations", description: "Practice financial decisions in safe scenarios.", href: "/simulations", icon: Cpu, color: "text-pink-400" },
    { title: "Progress Tracking", description: "Visualize your mindful spending habits.", href: "/progress", icon: BarChart3, color: "text-blue-400" },
    { title: "AI Insights", description: "Get personalized spending recommendations.", href: "/insights", icon: Lightbulb, color: "text-yellow-400" },
    { title: "Pre-Purchase Meditation", description: "Meditate before making purchases.", href: "/meditation", icon: Brain, color: "text-green-400" },
    { title: "Custom Categories", description: "Personalize your spending categories.", href: "/categories", icon: Tags, color: "text-orange-400" },
  ];

  return (
    <div className="container mx-auto py-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 text-glow-primary">Welcome to Mindful Wallet</h1>
        <p className="text-xl text-muted-foreground">
          Your companion on the journey to a more conscious relationship with money.
        </p>
      </header>

      <section className="mb-12">
        <Card className="holographic-card">
          <CardHeader>
            <CardTitle className="text-3xl text-glow-accent">Start Your Journey</CardTitle>
            <CardDescription>Explore features designed to enhance your financial mindfulness.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              Mindful Wallet helps you understand your spending patterns, reflect on your financial emotions,
              and build healthier money habits through guided exercises and AI-powered insights.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/reflection">Start Daily Reflection</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
                <Link href="/insights">Get AI Insights</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center text-glow-primary">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="holographic-card hover:shadow-[0_0_15px_5px_hsl(var(--accent)/40)] transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                <feature.icon className={`w-8 h-8 ${feature.color} neon-glow-accent`} />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{feature.description}</CardDescription>
                <Button asChild variant="link" className="p-0 text-accent hover:text-accent/80">
                  <Link href={feature.href}>Explore &rarr;</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
