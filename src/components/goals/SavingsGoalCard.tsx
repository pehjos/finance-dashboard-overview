"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Target, Award } from "lucide-react";
import { useAppContext } from "@/src/context/AppContext";
import { AnimatedProgress } from "@/src/components/ui/AnimatedProgress";
import { AnimatedCounter } from "@/src/components/ui/AnimatedCounter";
import { calculateProgress } from "@/src/utils/formatters";
import type { SavingsGoal } from "@/src/types";

interface SavingsGoalCardProps {
  goal: SavingsGoal
  delay?: number
}

export function SavingsGoalCard({ goal, delay = 0 }: SavingsGoalCardProps) {
  const { updateSavingsGoal } = useAppContext();
  const [showConfetti, setShowConfetti] = useState(false);

  const progress = calculateProgress(goal.current, goal.target);

  const handleAddFunds = () => {
    const amount = Number(window.prompt("Enter amount to add:", "100"));
    if (!isNaN(amount) && amount > 0) {
      updateSavingsGoal(goal.id, amount);

      const newProgress = calculateProgress(goal.current + amount, goal.target);
      if (newProgress >= 100 && progress < 100) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  };

  const getIcon = () => {
    switch (goal.icon) {
      case "target":
        return <Target className="h-5 w-5" />;
      case "award":
        return <Award className="h-5 w-5" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };

  return (
    <Card 
      className="overflow-hidden hover-lift transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-full transition-transform duration-300 hover:scale-110 animate-pulse-custom">
              {getIcon()}
            </div>
            {goal.title}
          </CardTitle>
          <div className="text-sm font-medium text-blue-600 animate-fadeIn">{goal.daysLeft} days left</div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-slate-500">Current</p>
            <p className="text-2xl font-bold">
              <AnimatedCounter end={goal.current} prefix="$" decimals={0} duration={1500} />
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Target</p>
            <p className="text-lg font-medium">${goal.target.toLocaleString()}</p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">
              <AnimatedCounter end={progress} suffix="%" duration={1000} />
            </span>
          </div>
          <AnimatedProgress value={progress} color="bg-blue-500" duration={2000} />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 hover-scale transition-all duration-300"
            onClick={() => window.alert("Edit goal settings")}
          >
            Edit
          </Button>
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700 hover-scale transition-all duration-300"
            onClick={handleAddFunds}
          >
            Add Funds
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
