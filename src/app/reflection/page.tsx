
"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenText, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Reflection {
  id: string;
  date: Date;
  text: string;
}

export default function DailyReflectionPage() {
  const [reflectionText, setReflectionText] = useState("");
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!reflectionText.trim()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newReflection: Reflection = {
      id: crypto.randomUUID(),
      date: new Date(),
      text: reflectionText.trim(),
    };
    setReflections([newReflection, ...reflections]);
    setReflectionText("");
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 flex items-center gap-4">
        <BookOpenText className="w-10 h-10 text-primary neon-glow-primary" />
        <div>
          <h1 className="text-4xl font-bold text-glow-primary">Daily Reflection</h1>
          <p className="text-lg text-muted-foreground">
            Log your emotions and triggers related to spending.
          </p>
        </div>
      </header>

      <Card className="mb-8 holographic-card">
        <CardHeader>
          <CardTitle className="text-2xl">New Reflection Entry</CardTitle>
          <CardDescription>
            Take a moment to reflect on your financial thoughts and feelings today.
            What influenced your spending decisions or urges?
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Textarea
              placeholder="Describe your financial emotions, triggers, or insights for today..."
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              rows={6}
              className="bg-input/50 border-border focus:ring-accent"
              disabled={isLoading}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading || !reflectionText.trim()} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Send className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Reflection"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <section>
        <h2 className="text-3xl font-semibold mb-6 text-glow-primary">Past Reflections</h2>
        {reflections.length === 0 && !isLoading ? (
          <Card className="holographic-card">
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                You have no saved reflections yet. Start by writing your first one above!
              </p>
            </CardContent>
          </Card>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {reflections.map((reflection) => (
                <Card key={reflection.id} className="holographic-card">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {reflection.date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </CardTitle>
                    <CardDescription>
                      {reflection.date.toLocaleTimeString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{reflection.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </section>
    </div>
  );
}
