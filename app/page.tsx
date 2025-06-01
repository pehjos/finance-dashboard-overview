"use client";

import { useState } from "react";
import { DashboardOverview } from "@/components/dashboard-overview";
import { TransactionHistory } from "@/components/transaction-history";
import { FundTransfer } from "@/components/fund-transfer";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { AppProvider } from "@/src/context/AppContext";
import { PageLoader } from "@/components/page-loader";
import { useAppContext } from "@/src/context/AppContext";

function WalletAppContent(): React.ReactElement {
  const [activeView, setActiveView] = useState("dashboard");
  const { state } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);
const notificationState = {
    notifications: [
      { id: "1", message: "New transaction recorded", type: "warning" },
      { id: "2", message: "Monthly report available", type: "info" },
      { id: "3", message: "Budget limit reached", type: "alert" },
      { id: "4", message: "New feature added", type: "success" },
      { id: "5", message: "System maintenance scheduled", type: "info" },
      { id: "6", message: "Transaction limit increased", type: "success" },
    ]
  };

  const renderActiveView = (): React.ReactElement => {
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
      <main className="flex flex-col flex-1">
        <AppHeader
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          state={notificationState}
          title={activeView.charAt(0).toUpperCase() + activeView.slice(1)}
      
        />
        <section className="flex-1 p-6 relative">
          {renderActiveView()}
        </section>
      </main>
    </div>
  </SidebarProvider>
);
}

export default function WalletApp(): React.ReactElement {
  return (
    <AppProvider>
      <WalletAppContent />
    </AppProvider>
  );
}
