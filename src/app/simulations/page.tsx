
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Cpu, Laptop, Coffee, Car, Briefcase, Utensils } from "lucide-react"; // Removed AlertTriangle as it wasn't used
import type { FC } from 'react';
import type { LucideProps } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Define LucideIcon type for better type safety with icon components
type LucideIcon = FC<LucideProps>;

interface Simulation {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  details: string;
  category: "Major Purchase" | "Daily Expense" | "Emergency" | "Career";
}

const simulations: Simulation[] = [
  {
    id: "laptop-purchase",
    title: "Buying a New Laptop",
    description: "Navigate the choices and financial impact of purchasing a new laptop for work or study.",
    icon: Laptop,
    details: "You need a new laptop. Your budget is $1000. You find three options: Basic ($700), Mid-Range ($950), Premium ($1300). Consider your needs, potential financing, and long-term value. What choice promotes mindful spending?",
    category: "Major Purchase",
  },
  {
    id: "daily-coffee",
    title: "The Daily Coffee Habit",
    description: "Explore the cumulative cost of daily coffee purchases and alternative strategies.",
    icon: Coffee,
    details: "You spend $5 on coffee every weekday. This simulation helps you visualize the weekly, monthly, and yearly cost. Explore alternatives like making coffee at home or reducing frequency.",
    category: "Daily Expense",
  },
  {
    id: "car-repair",
    title: "Unexpected Car Repair",
    description: "Handle an unforeseen major car repair bill and its effect on your budget.",
    icon: Car,
    details: "Your car suddenly needs a $800 repair. You have $300 in your emergency fund. How do you cover the remaining $500? Consider options like using savings, cutting other expenses, or seeking a small loan.",
    category: "Emergency",
  },
  {
    id: "student-loan",
    title: "Student Loan Repayment",
    description: "Understand different strategies for managing and repaying student loans effectively.",
    icon: Briefcase,
    details: "You have $30,000 in student loans with a 6% interest rate. Explore repayment plans like standard, income-driven, or making extra payments. How does each choice affect your monthly budget and total interest paid?",
    category: "Career",
  },
  {
    id: "food-delivery",
    title: "Food Delivery Choices",
    description: "Analyze the cost and convenience of frequent food delivery orders.",
    icon: Utensils,
    details: "You order food delivery 3 times a week, averaging $25 per order. This simulation explores the weekly/monthly cost versus cooking at home or meal prepping. What mindful choices can you make?",
    category: "Daily Expense",
  }
];

export default function SpendingSimulationsPage() {
  // selectedSimulation state is no longer needed as each dialog is self-contained.

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 flex items-center gap-4">
        <Cpu className="w-10 h-10 text-primary neon-glow-primary" />
        <div>
          <h1 className="text-4xl font-bold text-glow-primary">Spending Simulations</h1>
          <p className="text-lg text-muted-foreground">
            Practice financial decisions in consequence-free environments.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {simulations.map((sim) => (
          <Card key={sim.id} className="holographic-card flex flex-col">
            <CardHeader className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <sim.icon className="w-8 h-8 text-accent neon-glow-accent" />
                <CardTitle className="text-xl">{sim.title}</CardTitle>
              </div>
              <CardDescription>{sim.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full border-accent text-accent hover:bg-accent/10 hover:text-accent"
                    // onClick={() => setSelectedSimulation(sim)} // No longer needed
                  >
                    Start Simulation
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-background border-border text-foreground holographic-card">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl text-primary flex items-center gap-2">
                      <sim.icon className="w-6 h-6 text-primary neon-glow-primary" />
                      {sim.title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground pt-2">
                      {sim.details}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-muted-foreground/50 text-muted-foreground hover:bg-muted/20">Close</AlertDialogCancel>
                    <AlertDialogAction className="bg-primary hover:bg-primary/90 text-primary-foreground">Got it!</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* The conditionally rendered AlertDialogContent based on selectedSimulation is removed */}
    </div>
  );
}
