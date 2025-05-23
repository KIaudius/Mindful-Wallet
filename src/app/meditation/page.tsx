
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Brain, PlayCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: string;
  steps: string[];
  icon: LucideIcon;
}

const meditations: Meditation[] = [
  {
    id: "purchase-pause",
    title: "5-Minute Purchase Pause",
    description: "A quick meditation to bring mindfulness before you buy.",
    duration: "5 minutes",
    icon: Brain,
    steps: [
      "Find a comfortable position, either sitting or standing.",
      "Close your eyes gently or soften your gaze.",
      "Take three deep breaths. Inhale calm, exhale tension.",
      "Focus on the item you're considering. Ask yourself: Is this a need or a want?",
      "Notice any emotions arising: excitement, anxiety, urgency. Acknowledge them without judgment.",
      "Consider your long-term financial goals. Does this purchase align?",
      "Take three more deep breaths. Open your eyes. Make your decision with clarity."
    ],
  },
  {
    id: "impulse-control",
    title: "Impulse Control Breathing",
    description: "Breathing exercise to manage impulsive spending urges.",
    duration: "3 minutes",
    icon: Brain,
    steps: [
      "When you feel an urge to buy impulsively, stop.",
      "Place one hand on your chest, the other on your abdomen.",
      "Inhale slowly through your nose for a count of 4, feeling your abdomen rise.",
      "Hold your breath for a count of 4.",
      "Exhale slowly through your mouth for a count of 6, feeling your abdomen fall.",
      "Repeat this cycle 5-10 times, or until the urge subsides.",
      "Reflect: What triggered this impulse? How do I feel now?"
    ],
  },
  {
    id: "gratitude-focus",
    title: "Financial Gratitude Reflection",
    description: "Shift focus from scarcity to abundance through gratitude.",
    duration: "7 minutes",
    icon: Brain,
    steps: [
        "Sit comfortably and close your eyes.",
        "Bring to mind three things you currently own that bring you joy or utility, for which you are grateful.",
        "Reflect on a past financial decision you made wisely. Appreciate the outcome.",
        "Consider a financial skill you possess (e.g., budgeting, saving). Be grateful for this ability.",
        "Acknowledge the resources available to you, however small they may seem.",
        "End by affirming: 'I have enough. I am resourceful. I appreciate what I have.'",
        "Carry this feeling of gratitude as you navigate your financial day."
    ],
  },
];

export default function MeditationPage() {
  const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const startMeditation = (meditation: Meditation) => {
    setSelectedMeditation(meditation);
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const nextStep = () => {
    if (selectedMeditation && currentStep < selectedMeditation.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const closeDialog = () => {
    setSelectedMeditation(null);
    setCurrentStep(0);
    setIsCompleted(false);
  }

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 flex items-center gap-4">
        <Brain className="w-10 h-10 text-primary neon-glow-primary" />
        <div>
          <h1 className="text-4xl font-bold text-glow-primary">Mindful Moments</h1>
          <p className="text-lg text-muted-foreground">
            Guided meditations to promote thoughtful spending.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meditations.map((med) => (
          <Card key={med.id} className="holographic-card flex flex-col">
            <CardHeader className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <med.icon className="w-8 h-8 text-accent neon-glow-accent" />
                <CardTitle className="text-xl">{med.title}</CardTitle>
              </div>
              <CardDescription>{med.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{med.duration}</span>
              <Button 
                variant="outline" 
                className="border-accent text-accent hover:bg-accent/10 hover:text-accent"
                onClick={() => startMeditation(med)}
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Start
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedMeditation && (
        <Dialog open={!!selectedMeditation} onOpenChange={(open) => !open && closeDialog()}>
          <DialogContent className="sm:max-w-[525px] bg-background border-border text-foreground holographic-card">
            <DialogHeader>
              <DialogTitle className="text-2xl text-primary flex items-center gap-2">
                <selectedMeditation.icon className="w-6 h-6 text-primary neon-glow-primary" />
                {selectedMeditation.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground pt-2">
                Follow the steps below. Duration: {selectedMeditation.duration}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-4 min-h-[200px] flex flex-col justify-center items-center">
              {isCompleted ? (
                <div className="text-center space-y-3">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto neon-glow-accent" />
                  <p className="text-xl font-semibold">Meditation Complete!</p>
                  <p className="text-muted-foreground">You've taken a moment for mindfulness. Carry this peace with you.</p>
                </div>
              ) : (
                <>
                  <p className="text-lg text-center leading-relaxed">
                    {selectedMeditation.steps[currentStep]}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {selectedMeditation.steps.length}
                  </p>
                </>
              )}
            </div>

            <DialogFooter>
              {isCompleted ? (
                <Button onClick={closeDialog} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Close
                </Button>
              ) : (
                <Button onClick={nextStep} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  {currentStep === selectedMeditation.steps.length - 1 ? "Finish" : "Next Step"}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
