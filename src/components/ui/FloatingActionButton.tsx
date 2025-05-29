"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Send, Download, CreditCard, X } from "lucide-react";

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Send, label: "Send Money", color: "bg-blue-500 hover:bg-blue-600" },
    { icon: Download, label: "Request Money", color: "bg-green-500 hover:bg-green-600" },
    { icon: CreditCard, label: "Pay Bills", color: "bg-purple-500 hover:bg-purple-600" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      <div
        className={`flex flex-col gap-3 mb-3 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {actions.map((action, index) => (
          <div key={action.label} className={`flex items-center gap-3 animate-slideInFromRight stagger-${index + 1}`}>
            <span className="bg-white px-3 py-1 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap">
              {action.label}
            </span>
            <Button
              size="icon"
              className={`${action.color} text-white shadow-lg hover-lift rounded-full w-12 h-12`}
              onClick={() => window.alert(`${action.label} clicked!`)}
            >
              <action.icon className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <Button
        size="icon"
        className={`bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full w-14 h-14 transition-all duration-300 hover-lift ${
          isOpen ? "rotate-45" : "rotate-0"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </Button>
    </div>
  );
}
