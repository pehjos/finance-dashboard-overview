"use client";

import { useState, useEffect } from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, Send, Download, Eye, EyeOff, TrendingUp, TrendingDown, Info, Target, Award, } from "lucide-react";
import { SpendingChart } from "@/components/spending-chart";
import { IncomeExpenseChart } from "@/components/income-expense-chart";
import { SavingsGoalCard } from "@/components/savings-goal-card";
import { FinancialHealthCard } from "@/components/financial-health-card";

import { AnimatedCounter } from "@/components/animated-counter";
import { AnimatedProgress } from "@/components/animated-progress";
import { AnimatedCard } from "@/components/animated-card";
import { FloatingActionButton } from "@/components/floating-action-button";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { useAppContext } from "@/src/context/AppContext";
import { useTransactions } from "@/src/hooks/useTransactions";

export function DashboardOverview(): React.ReactElement {
  const { state, toggleBalanceVisibility } = useAppContext();
  const { monthlyIncome, monthlyExpenses, savingsRate } = useTransactions();
  const [activeTab, setActiveTab] = useState("overview");
  const [progressValues, setProgressValues] = useState({
    savings: 567,
    health: 546,
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
      return (): void => { clearTimeout(timer); };
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
    return (): void => clearInterval(interval);
  }, [financialTips.length]);

  if (state.isLoading) {
    return (
      <div className="space-y-6" data-testid="dashboard-loading">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <LoadingSkeleton type="text" className="w-48 h-8 mb-2" />
            <LoadingSkeleton type="text" className="w-64 h-4" />
          </div>
          <LoadingSkeleton type="card" className="w-24 h-10" />
        </div>

        {/* Balance Card Skeleton */}
        <LoadingSkeleton type="card" className="w-full h-32" />

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LoadingSkeleton type="card" count={3} />
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoadingSkeleton type="chart" count={2} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 " data-testid="dashboard-overview">
      <h4 className="font-semibold text-[16px] text-[#1e293b]">Hello James 🖐️</h4>
  Welcome back! Here's your financial overview.
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
      >
        <div className="absolute inset-0 bg-white/5 flex items-center justify-center opacity-10">
          <svg className="w-96 h-96 animate-pulse-custom" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.1C64.8,55,53.9,66.2,40.7,74.6C27.4,83,13.7,88.5,-0.4,89.2C-14.4,89.8,-28.9,85.6,-41.3,77.7C-53.8,69.8,-64.2,58.3,-70.8,45.2C-77.3,32.1,-79.9,16,-79.1,0.5C-78.3,-15.1,-74,-30.1,-66.6,-43.9C-59.1,-57.7,-48.5,-70.2,-35.4,-77.9C-22.3,-85.6,-7.7,-88.5,4.1,-85.5C15.8,-82.5,30.7,-83.6,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
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
              <AnimatedCounter end={state.balance} prefix="$" decimals={2} duration={2000} startOnView={false}/>
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
            >
              <Send className="h-4 w-4 mr-2" />
              Send Money
            </Button>
            <Button
              className="bg-white/20 hover:bg-white/30 text-white border-0 transition-all duration-300 hover-scale"
              onClick={() => window.alert("Request Money feature clicked!")}
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
            <AnimatedCard delay={300} className="hover-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600 animate-bounce-custom" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  <AnimatedCounter end={monthlyIncome} prefix="$" decimals={2} duration={1500} startOnView={false}/>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  <span className="text-green-600">+12.5%</span> from last month
                </p>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={400} className="hover-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  <AnimatedCounter end={monthlyExpenses} prefix="$" decimals={2} duration={1500} startOnView={false}/>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  <span className="text-red-600">+5.2%</span> from last month
                </p>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={500} className="hover-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  <AnimatedCounter end={savingsRate} suffix="%" decimals={1} duration={1500} startOnView={false}/>
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
                          <AnimatedCounter end={category.amount} prefix="$" decimals={2} duration={1000} startOnView={false}/>
                        </span>
                      </div>
                    </div>
                    <AnimatedProgress value={category.percentage} color={category.color} duration={1500} startOnView={true}/>
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
                      <AnimatedCounter end={Math.abs(transaction.amount)} prefix="$" decimals={2} duration={800} startOnView={false}/>
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

        <TabsContent value="insights" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income vs Expenses Chart */}
            <AnimatedCard delay={300}>
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>Monthly comparison for the last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <IncomeExpenseChart />
              </CardContent>
            </AnimatedCard>

            {/* Spending Distribution */}
            <AnimatedCard delay={400}>
              <CardHeader>
                <CardTitle>Spending Distribution</CardTitle>
                <CardDescription>Where your money goes</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <SpendingChart categories={state.spendingCategories} />
              </CardContent>
            </AnimatedCard>
          </div>

          {/* Financial Health Card */}
          <FinancialHealthCard score={82} progress={progressValues.health} />
        </TabsContent>

        <TabsContent value="goals" className="space-y-6 mt-6">
          {/* Savings Goals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {state.savingsGoals.map((goal) => (
              <SavingsGoalCard
                key={goal.id}
                title={goal.title}
                target={goal.target}
                current={goal.current}
                progress={Math.round((goal.current / goal.target) * 100)}
                daysLeft={goal.daysLeft}
                icon={goal.icon === "target" ? <Target className="h-5 w-5" /> : <Award className="h-5 w-5" />}
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
