"use client";

interface LoadingSkeletonProps {
  className?: string
  lines?: number
  type?: "text" | "card" | "avatar" | "chart" | "table"
  count?: number
}

export function LoadingSkeleton({ 
  className = "", 
  lines = 1, 
  type = "text",
  count = 1 
}: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div className={`skeleton skeleton-card ${className}`} />
        );
      
      case "avatar":
        return (
          <div className={`skeleton skeleton-avatar ${className}`} />
        );
      
      case "chart":
        return (
          <div className={`skeleton skeleton-chart ${className}`} />
        );
      
      case "table":
        return (
          <div className="space-y-3">
            {Array.from({ length: lines }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="skeleton skeleton-avatar w-8 h-8" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton skeleton-text h-4" style={{ width: `${Math.random() * 40 + 60}%` }} />
                  <div className="skeleton skeleton-text h-3" style={{ width: `${Math.random() * 30 + 40}%` }} />
                </div>
                <div className="skeleton skeleton-text h-4 w-16" />
              </div>
            ))}
          </div>
        );
      
      case "text":
      default:
        return (
          <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
              <div
                key={index}
                className={`skeleton skeleton-text stagger-${Math.min(index + 1, 5)}`}
                style={{ width: `${Math.random() * 40 + 60}%` }}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={index > 0 ? "mt-4" : ""}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
}
