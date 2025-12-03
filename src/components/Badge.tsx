import * as React from "react";
import { cn } from "../utils";

type BadgeVariant = 
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "single-choice"
  | "multiple-choice"
  | "free-text"
  | "eligibility"
  | "technical-skills"
  | "work-experience"
  | "notice-period"
  | "disqualifier"
  | "qualified";

const getVariantClasses = (variant: BadgeVariant = "default") => {
  const variants = {
    default: "border-transparent bg-blue-600 text-white shadow hover:bg-blue-700",
    secondary: "border-transparent bg-purple-50 text-purple-700 hover:bg-purple-100",
    destructive: "border-transparent bg-red-50 text-red-700 hover:bg-red-100",
    outline: "rounded-[6px] px-3 py-2 text-gray-900 border-gray-300",
    // Question type variants (blue)
    "single-choice": "border-transparent bg-blue-50 text-blue-700",
    "multiple-choice": "border-transparent bg-blue-50 text-blue-700",
    "free-text": "border-transparent bg-blue-50 text-blue-700",
    // Category variants (purple/lavender for eligibility)
    eligibility: "border-transparent bg-purple-50 text-purple-700",
    "technical-skills": "border-transparent bg-purple-50 text-purple-700",
    "work-experience": "border-transparent bg-purple-50 text-purple-700",
    "notice-period": "border-transparent bg-purple-50 text-purple-700",
    // Disqualifier variant (red)
    disqualifier: "border-transparent bg-red-50 text-red-700",
    // Qualified variant (green)
    qualified: "border-transparent bg-green-50 text-green-700",
  };
  return variants[variant];
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
  
  return (
    <div 
      className={cn(baseClasses, getVariantClasses(variant), className)} 
      {...props} 
    />
  );
}

export { Badge };
