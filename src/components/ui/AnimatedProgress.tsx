"use client";

import { useEffect, useState } from "react";

interface AnimatedProgressProps {
  value: number
  max?: number
  className?: string
  color?: string
  showValue?: boolean
  duration?: number
}

export function AnimatedProgress({
  value,
  max = 100,
  className = "",
  color = "bg-blue-500",
  showValue = false,
  duration = 1500,
}: AnimatedProgressProps) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentValue(value);
    }, 100);

    return () => clearTimeout(timer);
  }, [value]);

  const percentage = Math.min((currentValue / max) * 100, 100);

  return (
    <div className={`relative ${className}`}>
      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all ease-out`}
          style={{
            width: `${percentage}%`,
            transitionDuration: `${duration}ms`,
          }}
        />
      </div>
      {showValue && (
        <span className="absolute right-0 top-3 text-xs font-medium animate-fadeIn">{Math.round(percentage)}%</span>
      )}
    </div>
  );
}
