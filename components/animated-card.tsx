"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  hover?: boolean
  startOnView?: boolean
}

export function AnimatedCard({ 
  children, 
  className = "", 
  delay = 0, 
  hover = true,
  startOnView = true 
}: AnimatedCardProps): React.ReactElement {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(!startOnView);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return (): void => observer.disconnect();
  }, [startOnView]);

  return (
    <Card
      ref={elementRef}
      className={`
        transition-all duration-300 
        ${isVisible ? "animate-fadeIn" : "opacity-0"}
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
