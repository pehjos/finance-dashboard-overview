"use client";

import type React from "react";

import { useState } from "react";
import { Card } from "@/components/ui/card";

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export function AnimatedCard({ children, className = "", delay = 0, hover = true }: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`
        animate-fadeIn transition-all duration-300 
        ${hover ? "hover-lift hover-glow cursor-pointer" : ""}
        ${isHovered ? "scale-[1.02]" : "scale-100"}
        ${className}
      `}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Card>
  );
}
