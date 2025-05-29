"use client";

import { useState } from "react";
import { DashboardOverview } from "@/components/dashboard-overview";
import { TransactionHistory } from "@/components/transaction-history";
import { FundTransfer } from "@/components/fund-transfer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppProvider } from "@/src/context/AppContext";
import { PageLoader } from "@/components/page-loader";
import { useAppContext } from "@/src/context/AppContext";

function WalletAppContent() {
  const [activeView, setActiveView] = useState("dashboard");
  const { state } = useAppContext();

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardOverview />;
      case "transactions":
        return <TransactionHistory />;
      case "transfer":
        return <FundTransfer />;
      default:
        return <DashboardOverview />;
    }
  };

  // Show page loader during initial app loading
  if (state.isLoading && !state.user) {
    return <PageLoader text="Loading your financial dashboard..." fullScreen />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 p-6 relative">
          {renderActiveView()}
        </main>
      </div>
    </SidebarProvider>
  );
}

export default function WalletApp() {
  return (
    <AppProvider>
      <WalletAppContent />
    </AppProvider>
  );
}
