"use client";
import * as React from "react";

export function ChartSkeleton({ className = "" }: { className?: string }): React.ReactElement {
  return (
    <div className={`border rounded-lg p-6 ${className}`}>
      {/* Chart Header */}
      <div className="mb-6">
        <div className="skeleton skeleton-text h-6 w-1/3 mb-2" />
        <div className="skeleton skeleton-text h-4 w-1/2" />
      </div>

      {/* Chart Area */}
      <div className="relative h-64">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton skeleton-text h-3 w-8" />
          ))}
        </div>

        {/* Chart bars/lines */}
        <div className="ml-12 h-full flex items-end justify-between">
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={index} 
              className="skeleton w-8 rounded-t"
              style={{ height: `${Math.random() * 80 + 20}%` }}
            />
          ))}
        </div>

        {/* X-axis labels */}
        <div className="ml-12 mt-2 flex justify-between">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="skeleton skeleton-text h-3 w-8" />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="skeleton w-3 h-3 rounded" />
            <div className="skeleton skeleton-text h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
