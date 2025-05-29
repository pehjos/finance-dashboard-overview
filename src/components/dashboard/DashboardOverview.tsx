"use client";

import { useState, useEffect } from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, Send, Download, Eye, EyeOff, TrendingUp, TrendingDown, Info, Target, Award, Bell } from "lucide-react";
import { useAppContext } from "@/src/context/AppContext";
import { useTransactions } from "@/src/hooks/useTransactions";
import { formatCurrency, formatPercentage } from "@/src/utils/formatters";
import { AnimatedCounter } from "@/src/components/ui/AnimatedCounter";
import { AnimatedProgress } from "@/src/components/ui/AnimatedProgress";
import { AnimatedCard } from "@/src/components/ui/AnimatedCard";
import { FloatingActionButton } from "@/src/components/ui/FloatingActionButton";
import { LoadingSkeleton } from "@/src/components/ui/LoadingSkeleton";
import { NotificationCenter } from "@/src/components/notifications/NotificationCenter";
import { SavingsGoalCard } from "@/src/components/goals/SavingsGoalCard";

export function DashboardOverview() {
  const { state, toggleBalanceVisibility } = useAppContext();
  const { monthlyIncome, monthlyExpenses, savingsRate } = useTransactions();
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [progressValues, setProgressValues] = useState({
    savings: 0,
    health: 0,
    budget: 0,
  });

  // Animate progress bars on load
  useEffect(() => {
    if (!state.isLoading) {
      const timer = setTimeout(() => {
        setProgressValues({
          savings: 68,
          health: 82,
          budget: 45,
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [state.isLoading]);

  const financialTips = [
    "Try to save at least 20% of your monthly income",
    "Review your subscriptions regularly to avoid unnecessary expenses",
    "Consider setting up an emergency fund with 3-6 months of expenses",
    "Track your spending to identify areas where you can cut back",
  ];

  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % financialTips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [financialTips.length]);

  if (state.isLoading) {
    return (
      <div className="space-y-6" data-testid="dashboard-loading">
        <div className="flex items-center justify-between">
          <div>
            <LoadingSkeleton className="w-48 h-8 mb-2" />
            <LoadingSkeleton className="w-64 h-4" />
          </div>
        </div>
        <LoadingSkeleton className="w-full h-32" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LoadingSkeleton className="w-full h-24" />
          <LoadingSkeleton className="w-full h-24" />
          <LoadingSkeleton className="w-full h-24" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="dashboard-overview">
      {/* Header with Notifications */}
      <div className="flex items-center justify-between animate-slideInFromLeft">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here's your financial overview.</p>
        </div>
        <div className="flex items-center gap-3 animate-slideInFromRight">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative hover-scale"
                  onClick={() => setShowNotifications(!showNotifications)}
                  data-testid="notifications-button"
                >
                  <Bell className="h-5 w-5" />
                  {state.notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white animate-pulse-custom">
                      {state.notifications.length}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="text-right">
            <p className="text-sm text-slate-500">Last updated</p>
            <p className="text-sm font-medium">Just now</p>
          </div>
        </div>
      </div>

      {/* Notification Center */}
      {showNotifications && (
        <NotificationCenter onClose={() => setShowNotifications(false)} />
      )}

      {/* Financial Tip Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-200 rounded-lg p-3 flex items-center animate-fadeIn hover-lift">
        <div className="bg-amber-200 rounded-full p-2 mr-3 animate-bounce-custom">
          <Info className="h-5 w-5 text-amber-600" />
        </div>
        <p className="text-amber-800 text-sm flex-1">
          <span className="font-medium">Tip:</span> {financialTips[currentTip]}
        </p>
        <div className="flex gap-1">
          {financialTips.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                currentTip === index ? "bg-amber-500" : "bg-amber-300"
              }`}
              onClick={() => setCurrentTip(index)}
            />
          ))}
        </div>
      </div>

      {/* Account Balance Card */}
      <AnimatedCard
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 overflow-hidden relative"
        delay={200}
        data-testid="balance-card"
      >
        <CardHeader className="pb-2 relative">
          <div className="flex items-center justify-between">
            <CardDescription className="text-blue-100">Total Balance</CardDescription>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleBalanceVisibility}
              className="text-white hover:bg-white/20 hover-scale"
              data-testid="toggle-balance-button"
            >
              {state.showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>
          <CardTitle className="text-4xl font-bold transition-all duration-500 ease-in-out">
            {state.showBalance ? (
              <AnimatedCounter end={state.balance} prefix="$" decimals={2} duration={2000} />
            ) : (
              "••••••"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex gap-4 mt-4">
            <Button
              className="bg-white/20 hover:bg-white/30 text-white border-0 transition-all duration-300 hover-scale"
              onClick={() => window.alert("Send Money feature clicked!")}
              data-testid="send-money-button"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Money
            </Button>
            <Button
              className="bg-white/20 hover:bg-white/30 text-white border-0 transition-all duration-300 hover-scale"
              onClick={() => window.alert("Request Money feature clicked!")}
              data-testid="request-money-button"
            >
              <Download className="h-4 w-4 mr-2" />
              Request Money
            </Button>
          </div>
        </CardContent>
      </AnimatedCard>

      {/* Tabs for different views */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 animate-fadeIn">
          <TabsTrigger value="overview" className="transition-all duration-200 hover-scale">
            Overview
          </TabsTrigger>
          <TabsTrigger value="insights" className="transition-all duration-200 hover-scale">
            Insights
          </TabsTrigger>
          <TabsTrigger value="goals" className="transition-all duration-200 hover-scale">
            Goals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedCard delay={300} className="hover-glow" data-testid="income-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600 animate-bounce-custom" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  <AnimatedCounter end={monthlyIncome} prefix="$" decimals={2} duration={1500} />
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  <span className="text-green-600">+12.5%</span> from last month
                </p>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={400} className="hover-glow" data-testid="expenses-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  <AnimatedCounter end={monthlyExpenses} prefix="$" decimals={2} duration={1500} />
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  <span className="text-red-600">+5.2%</span> from last month
                </p>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={500} className="hover-glow" data-testid="savings-rate-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  <AnimatedCounter end={savingsRate} suffix="%" decimals={1} duration={1500} />
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  <span className="text-blue-600">+2.1%</span> from last month
                </p>
              </CardContent>
            </AnimatedCard>
          </div>

          {/* Spending Breakdown & Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Spending Breakdown */}
            <AnimatedCard delay={600}>
              <CardHeader>
                <CardTitle>Spending Breakdown</CardTitle>
                <CardDescription>Your expenses by category this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.spendingCategories.map((category, index) => (
                  <div
                    key={category.name}
                    className={`space-y-2 p-2 rounded-lg hover:bg-slate-50 transition-all duration-300 cursor-pointer hover-lift animate-slideInFromLeft stagger-${index + 1}`}
                    onClick={() => window.alert(`View detailed breakdown of ${category.name}`)}
                  >
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{category.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={category.trend.startsWith("+") ? "destructive" : "outline"}
                          className="text-xs animate-scaleIn"
                        >
                          {category.trend}
                        </Badge>
                        <span>
                          <AnimatedCounter end={category.amount} prefix="$" decimals={2} duration={1000} />
                        </span>
                      </div>
                    </div>
                    <AnimatedProgress value={category.percentage} color={category.color} duration={1500} />
                    <div className="text-xs text-slate-500">{category.percentage}% of total expenses</div>
                  </div>
                ))}
              </CardContent>
            </AnimatedCard>

            {/* Recent Transactions */}
            <AnimatedCard delay={700}>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest financial activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.transactions.slice(0, 3).map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className={`flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all duration-300 cursor-pointer hover-lift animate-slideInFromRight stagger-${index + 1}`}
                    onClick={() => window.alert(`View details for transaction: ${transaction.description}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full transition-transform duration-300 hover:scale-110 ${
                          transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {transaction.type === "credit" ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <p className="text-xs text-slate-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className={`font-bold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                      {transaction.type === "credit" ? "+" : ""}
                      <AnimatedCounter end={Math.abs(transaction.amount)} prefix="$" decimals={2} duration={800} />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full mt-4 hover:bg-slate-100 transition-all duration-300 hover-scale"
                  onClick={() => window.alert("View all transactions clicked!")}
                >
                  View All Transactions
                </Button>
              </CardContent>
            </AnimatedCard>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6 mt-6">
          {/* Savings Goals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {state.savingsGoals.map((goal, index) => (
              <SavingsGoalCard
                key={goal.id}
                goal={goal}
                delay={index * 200}
              />
            ))}
          </div>

          {/* Add New Goal Button */}
          <AnimatedCard
            className="border-dashed border-2 hover:bg-slate-50 transition-colors cursor-pointer"
            delay={600}
          >
            <CardContent className="flex items-center justify-center p-6">
              <Button
                variant="outline"
                className="border-dashed hover-scale"
                onClick={() => window.alert("Add new savings goal clicked!")}
              >
                + Add New Savings Goal
              </Button>
            </CardContent>
          </AnimatedCard>
        </TabsContent>
      </Tabs>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}
