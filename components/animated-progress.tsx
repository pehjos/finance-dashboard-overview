"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedProgressProps {
  value: number
  max?: number
  className?: string
  color?: string
  showValue?: boolean
  duration?: number
  startOnView?: boolean
}

export function AnimatedProgress({
  value,
  max = 100,
  className = "",
  color = "bg-blue-500",
  showValue = false,
  duration = 1500,
  startOnView = true,
}: AnimatedProgressProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setCurrentValue(value);
            setHasAnimated(true);
          }, 100);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated, startOnView]);

  useEffect(() => {
    if (!startOnView && !hasAnimated) {
      setTimeout(() => {
        setCurrentValue(value);
        setHasAnimated(true);
      }, 100);
    }
  }, [value, startOnView, hasAnimated]);

  const percentage = Math.min((currentValue / max) * 100, 100);

  return (
    <div ref={elementRef} className={`relative ${className}`}>
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
        <span className="absolute right-0 top-3 text-xs font-medium animate-fadeIn">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}
