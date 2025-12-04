import * as React from "react";
import { cn } from "../utils";

type BadgeVariant = 
  | "default"
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
    destructive: "border-transparent bg-red-50 text-red-700 hover:bg-red-100",
    outline: "rounded-[6px] px-3 py-2 text-gray-900 border-gray-300",
    "single-choice": "border-transparent bg-blue-100 text-information-500",
    "multiple-choice": "border-transparent bg-blue-100 text-information-500",
    "free-text": "border-transparent bg-blue-100 text-information-500",
    eligibility: "border-transparent bg-yellow-100 text-yellow-500",
    "technical-skills": "border-transparent bg-yellow-100 text-yellow-500",
    "work-experience": "border-transparent bg-yellow-100 text-yellow-500",
    "notice-period": "border-transparent bg-yellow-100 text-yellow-500",
    disqualifier: "border-transparent bg-error-100 text-error-500",
    qualified: "border-transparent bg-success-150 text-green-500",
  };
  return variants[variant];
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors m-0";
  
  return (
    <div 
      className={cn(baseClasses, getVariantClasses(variant), className)} 
      {...props} 
    />
  );
}

export { Badge };
