
"use client";

import { BarChart3, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";

const chartData = [
  { month: "January", mindfulScore: 65, reflections: 15 },
  { month: "February", mindfulScore: 70, reflections: 18 },
  { month: "March", mindfulScore: 78, reflections: 22 },
  { month: "April", mindfulScore: 75, reflections: 20 },
  { month: "May", mindfulScore: 82, reflections: 25 },
  { month: "June", mindfulScore: 85, reflections: 28 },
];

const chartConfig = {
  mindfulScore: {
    label: "Mindful Score",
    color: "hsl(var(--primary))",
  },
  reflections: {
    label: "Reflections Logged",
    color: "hsl(var(--accent))",
  }
} satisfies ChartConfig;


export default function ProgressTrackingPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 flex items-center gap-4">
        <BarChart3 className="w-10 h-10 text-primary neon-glow-primary" />
        <div>
          <h1 className="text-4xl font-bold text-glow-primary">Progress Tracking</h1>
          <p className="text-lg text-muted-foreground">
            Visualize your improvements in mindful spending habits over time.
          </p>
        </div>
      </header>

      <Card className="holographic-card">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-accent neon-glow-accent" />
            Your Mindful Spending Journey
          </CardTitle>
          <CardDescription>
            Monthly overview of your mindfulness score and reflection activity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                  defaultCellStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                  }}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="mindfulScore" fill="var(--color-mindfulScore)" radius={[4, 4, 0, 0]} >
                   <LabelList dataKey="mindfulScore" position="top" offset={5} fontSize={10} fill="hsl(var(--foreground))"/>
                </Bar>
                 <Bar dataKey="reflections" fill="var(--color-reflections)" radius={[4, 4, 0, 0]} >
                   <LabelList dataKey="reflections" position="top" offset={5} fontSize={10} fill="hsl(var(--foreground))"/>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="holographic-card">
            <CardHeader>
                <CardTitle className="text-xl">Achievements</CardTitle>
                <CardDescription>Milestones unlocked on your journey.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                    <li>✅ Logged 7 consecutive daily reflections.</li>
                    <li>✅ Completed 3 spending simulations.</li>
                    <li>✅ Achieved a Mindful Score of 80+.</li>
                </ul>
            </CardContent>
        </Card>
        <Card className="holographic-card">
            <CardHeader>
                <CardTitle className="text-xl">Tips for Improvement</CardTitle>
                <CardDescription>Suggestions to enhance your mindfulness.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                    <li>Try a pre-purchase meditation before your next big buy.</li>
                    <li>Review your AI insights for patterns you might have missed.</li>
                    <li>Set a new reflection goal for next month.</li>
                </ul>
            </CardContent>
        </Card>
      </section>

    </div>
  );
}
