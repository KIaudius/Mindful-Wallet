
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Lightbulb, Loader2, AlertCircle, Sparkles, CheckCircle } from "lucide-react";
import { getSpendingInsights, type SpendingInsightsOutput } from "@/ai/flows/spending-insights";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  spendingData: z.string().min(10, "Spending data must be a valid JSON string and not empty."),
  userGoals: z.string().min(5, "Please describe your financial goals."),
});

type InsightsFormValues = z.infer<typeof formSchema>;

const exampleSpendingData = JSON.stringify([
  { category: "Groceries", amount: 150, date: "2024-07-01" },
  { category: "Dining Out", amount: 80, date: "2024-07-03" },
  { category: "Transportation", amount: 50, date: "2024-07-05" },
  { category: "Entertainment", amount: 120, date: "2024-07-10" },
  { category: "Shopping", amount: 200, date: "2024-07-15" },
], null, 2);

export default function AiInsightsPage() {
  const [insights, setInsights] = useState<SpendingInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<InsightsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spendingData: "",
      userGoals: "",
    },
  });

  const onSubmit: SubmitHandler<InsightsFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setInsights(null);

    try {
      // Validate JSON structure before sending
      JSON.parse(data.spendingData);
      const result = await getSpendingInsights(data);
      setInsights(result);
    } catch (e: any) {
      console.error("Error getting AI insights:", e);
      if (e instanceof SyntaxError) {
        setError("Invalid JSON format in spending data. Please check your input.");
      } else {
        setError(e.message || "Failed to generate insights. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 flex items-center gap-4">
        <Lightbulb className="w-10 h-10 text-primary neon-glow-primary" />
        <div>
          <h1 className="text-4xl font-bold text-glow-primary">AI-Powered Insights</h1>
          <p className="text-lg text-muted-foreground">
            Analyze your spending patterns for personalized recommendations.
          </p>
        </div>
      </header>

      <Card className="mb-8 holographic-card">
        <CardHeader>
          <CardTitle className="text-2xl">Get Your Spending Analysis</CardTitle>
          <CardDescription>
            Provide your spending data (in JSON format) and financial goals to receive AI-driven insights.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="spendingData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spending Data (JSON)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={exampleSpendingData}
                        rows={10}
                        className="font-mono text-sm bg-input/50 border-border focus:ring-accent"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Paste your spending data as a JSON array. Each item should have 'category', 'amount', and 'date'.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Financial Goals</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Save for a down payment, reduce impulsive shopping, understand my habits."
                        className="bg-input/50 border-border focus:ring-accent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Insights...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Insights
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-8 holographic-card border-destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {insights && (
        <Card className="holographic-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400 neon-glow-accent" />
              Your Personalized Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-glow-accent">Summary</h3>
              <p className="text-muted-foreground">{insights.summary}</p>
            </div>
            <Separator />
            <div>
              <h3 className="text-xl font-semibold mb-2 text-glow-accent">Key Insights</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {insights.insights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
            <Separator />
            <div>
              <h3 className="text-xl font-semibold mb-2 text-glow-accent">Recommendations</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {insights.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
