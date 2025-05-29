"use client";

interface CardSkeletonProps {
  showHeader?: boolean
  showFooter?: boolean
  lines?: number
  className?: string
}

export function CardSkeleton({ 
  showHeader = true, 
  showFooter = false, 
  lines = 3,
  className = "" 
}: CardSkeletonProps) {
  return (
    <div className={`border rounded-lg p-6 ${className}`}>
      {showHeader && (
        <div className="mb-4">
          <div className="skeleton skeleton-text h-6 w-3/4 mb-2" />
          <div className="skeleton skeleton-text h-4 w-1/2" />
        </div>
      )}
      
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div key={index} className="skeleton skeleton-text h-4" style={{ width: `${Math.random() * 40 + 60}%` }} />
        ))}
      </div>

      {showFooter && (
        <div className="mt-4 pt-4 border-t">
          <div className="skeleton skeleton-text h-10 w-24" />
        </div>
      )}
    </div>
  );
}
