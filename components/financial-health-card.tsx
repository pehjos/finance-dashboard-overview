"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface FinancialHealthCardProps {
  score: number
  progress: number
}

export function FinancialHealthCard({ score, progress }: FinancialHealthCardProps): React.ReactElement {
  const getScoreColor = (): string => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreText = (): string => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  const improvements = [
    { title: "Reduce credit card debt", impact: "High", completed: false },
    { title: "Increase emergency fund", impact: "Medium", completed: true },
    { title: "Diversify investments", impact: "Medium", completed: false },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Financial Health Score</CardTitle>
            <CardDescription>Based on your spending habits and savings</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  Your financial health score is calculated based on your savings rate, debt-to-income ratio, emergency
                  fund, and spending habits.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#ef4444"}
                strokeWidth="10"
                strokeDasharray={`${progress * 2.83} 283`}
                strokeDashoffset="0"
                strokeLinecap="round"
                style={{ transition: "stroke-dasharray 1.5s ease-in-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}</span>
              <span className="text-sm font-medium">{getScoreText()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Improvement Suggestions</h4>
          <div className="space-y-2">
            {improvements.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                onClick={() => window.alert(`View details for: ${item.title}`)}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => {}}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={item.completed ? "line-through text-slate-500" : ""}>{item.title}</span>
                </div>
                <div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.impact === "High" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {item.impact} Impact
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
