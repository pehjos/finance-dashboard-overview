import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationCenter } from "@/components/notification-center";
import { useIsMobile } from "@/hooks/use-mobile";
interface Notification {
  id: string;
  message: string;
  type?: string; 
}

interface AppHeaderProps {
  showNotifications: boolean;
  setShowNotifications: (value: boolean) => void;
  state: {
    notifications: Notification[];
  };
  title: string;
}

function AppHeader({ showNotifications, setShowNotifications, state,title }: AppHeaderProps): React.ReactElement {
  
   
const isMobile = useIsMobile();
    return (
    <div className="flex p-3 bg-white border-b z-10 items-center justify-between animate-slideInFromLeft">
      <div>
        <h1 className="text-[16px] text-[#1E293B] font-regular"> {title}</h1>
       
       
      </div>
      <div className="flex items-center gap-3 animate-slideInFromRight relative">
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
        
        {/* Notification Center */}
        {showNotifications && (
          <NotificationCenter 
            notifications={state.notifications.map((n, idx) => ({
              id: typeof n.id === "number" ? n.id : idx,
              title: n.message, 
              message: n.message,
              type: n.type === "alert" || n.type === "warning" || n.type === "success" ? n.type : "alert"
            }))}
            onClose={() => setShowNotifications(false)} 
          />
        )}
        
        {!isMobile?(<div className="text-right">
          <p className="text-sm text-slate-500">Last updated</p>
          <p className="text-sm font-medium">Just now</p>
        </div>):
        (<SidebarTrigger />)}
      </div>
    </div>
  );
}

export default AppHeader;