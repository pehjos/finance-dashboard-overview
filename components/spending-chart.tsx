"use client";

import { useEffect, useState } from "react";

interface Category {
  name: string
  amount: number
  percentage: number
  color: string
}

interface SpendingChartProps {
  categories: Category[]
}

export function SpendingChart({ categories }: SpendingChartProps) {
  const [animateChart, setAnimateChart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateChart(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      "bg-blue-500": "bg-blue-500",
      "bg-green-500": "bg-green-500",
      "bg-purple-500": "bg-purple-500",
      "bg-orange-500": "bg-orange-500",
      "bg-gray-500": "bg-gray-500",
    };
    return colorMap[color] || "bg-gray-500";
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-48 h-48">
          <div className="w-full h-full rounded-full border-8 border-slate-200 relative overflow-hidden">
            {categories.map((category, index) => {
              const prevPercentages = categories.slice(0, index).reduce((sum, cat) => sum + cat.percentage, 0);
              const rotation = (prevPercentages / 100) * 360;
              const segmentAngle = (category.percentage / 100) * 360;

              return (
                <div
                  key={category.name}
                  className={`absolute inset-0 rounded-full transition-all duration-1000 ease-out ${getColorClass(category.color)}`}
                  style={{
                    clipPath: animateChart
                      ? `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(((segmentAngle - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((segmentAngle - 90) * Math.PI) / 180)}%, 50% 50%)`
                      : "polygon(50% 50%, 50% 0%, 50% 0%, 50% 50%)",
                    transform: `rotate(${rotation}deg)`,
                    transitionDelay: `${index * 200}ms`,
                  }}
                />
              );
            })}
          </div>
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold">Total</div>
              <div className="text-sm text-slate-600">Expenses</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        {categories.map((category, index) => (
          <div key={category.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${getColorClass(category.color)}`}></div>
              <span className="text-sm">{category.name}</span>
            </div>
            <span className="text-sm font-medium">{category.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
