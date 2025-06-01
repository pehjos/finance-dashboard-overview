"use client";

import React from "react";
import { LoadingSpinner } from "@/components/loading-spinner";

interface PageLoaderProps {
  text?: string
  fullScreen?: boolean
}

export function PageLoader({ text = "Loading...", fullScreen = false }: PageLoaderProps): React.ReactElement {
  const containerClass = fullScreen 
    ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50" 
    : "absolute inset-0 bg-white/80 backdrop-blur-sm";

  return (
    <div className={`${containerClass} flex items-center justify-center`}>
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-lg font-medium text-slate-700">{text}</p>
        <p className="mt-1 text-sm text-slate-500">Please wait a moment</p>
      </div>
    </div>
  );
}
