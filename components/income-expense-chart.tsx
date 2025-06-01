"use client";

import { useEffect, useState } from "react";

const data = [
  { name: "Jan", income: 10500, expenses: 7800 },
  { name: "Feb", income: 11200, expenses: 8100 },
  { name: "Mar", income: 10800, expenses: 8400 },
  { name: "Apr", income: 11500, expenses: 8200 },
  { name: "May", income: 12000, expenses: 8500 },
  { name: "Jun", income: 12500, expenses: 8750 },
];

export function IncomeExpenseChart(): React.ReactElement {
  const [animateChart, setAnimateChart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateChart(true);
    }, 300);
    return (): void => { clearTimeout(timer); };
  }, []);

  const maxValue = Math.max(...data.flatMap((d) => [d.income, d.expenses]));

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-sm">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-sm">Expenses</span>
        </div>
      </div>

      <div className="flex-1 flex items-end justify-between gap-2 px-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex flex-col items-center gap-2 flex-1">
            <div className="flex gap-1 items-end h-40">
              <div
                className={`bg-green-500 rounded-t transition-all duration-1000 ease-out w-4 ${
                  animateChart ? "" : "h-0"
                }`}
                style={{
                  height: animateChart ? `${(item.income / maxValue) * 160}px` : "0px",
                  transitionDelay: `${index * 100}ms`,
                }}
                title={`Income: $${item.income}`}
              />
              <div
                className={`bg-red-500 rounded-t transition-all duration-1000 ease-out w-4 ${
                  animateChart ? "" : "h-0"
                }`}
                style={{
                  height: animateChart ? `${(item.expenses / maxValue) * 160}px` : "0px",
                  transitionDelay: `${index * 100 + 50}ms`,
                }}
                title={`Expenses: $${item.expenses}`}
              />
            </div>
            <span className="text-xs text-slate-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
