"use client";

import { CreditCard, Home, ArrowUpDown, History, Settings, User, Wallet } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAppContext } from "@/src/context/AppContext";

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    id: "dashboard",
  },
  {
    title: "Transactions",
    icon: History,
    id: "transactions",
  },
  {
    title: "Transfer",
    icon: ArrowUpDown,
    id: "transfer",
  },
  {
    title: "Cards",
    icon: CreditCard,
    id: "cards",
  },
  {
    title: "Settings",
    icon: Settings,
    id: "settings",
  },
];

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  const { state } = useAppContext();

  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">FinanceWallet</h1>
            <p className="text-sm text-slate-500">Personal Finance</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 rounded-lg bg-slate-100 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300">
            <User className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{state.user?.name || "Loading..."}</p>
            <p className="text-xs text-slate-500">{state.user?.email || ""}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
