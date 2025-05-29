"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Bell, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { useAppContext } from "@/src/context/AppContext";

interface NotificationCenterProps {
  notifications: Array<{
    id: number
    title: string
    message: string
    type: "warning" | "success" | "alert"
  }>
  onClose: () => void
}

export function NotificationCenter({ notifications, onClose }: NotificationCenterProps) {
  const { markNotificationAsRead } = useAppContext();

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-amber-50";
      case "success":
        return "bg-green-50";
      case "alert":
        return "bg-red-50";
      default:
        return "bg-blue-50";
    }
  };

  return (
    <div className="absolute right-0 top-16 z-50 w-80 shadow-lg rounded-lg overflow-hidden animate-in slide-in-from-top-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-2">
          <CardTitle className="text-sm font-medium">Notifications</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <div className="py-6 text-center text-sm text-slate-500">No new notifications</div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b last:border-b-0 ${getBackgroundColor(notification.type)} transition-colors hover:opacity-80 cursor-pointer`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="mt-0.5">{getIcon(notification.type)}</div>
                    <div>
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <p className="text-xs text-slate-600">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-2">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  View All Notifications
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
