"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
  text?: string
}

export function LoadingSpinner({ size = "md", className = "", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-4"
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`${sizeClasses[size]} border-slate-200 border-t-blue-600 rounded-full animate-spin-custom`}
      />
      {text && (
        <p className="mt-2 text-sm text-slate-600 animate-pulse-custom">{text}</p>
      )}
    </div>
  );
}
