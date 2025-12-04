import * as React from "react";
import { cn } from "../../utils";

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
    default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary-hover",
    secondary: "border-transparent bg-purple-muted text-purple-text hover:bg-purple-muted/80",
    destructive: "border-transparent bg-destructive-muted text-destructive hover:bg-destructive-muted/80",
    outline: "rounded-[6px] px-3 py-2 text-foreground border-border",
    // Question type variants (blue)
    "single-choice": "border-transparent bg-primary-muted text-primary",
    "multiple-choice": "border-transparent bg-primary-muted text-primary",
    "free-text": "border-transparent bg-primary-muted text-primary",
    // Category variants (purple/lavender for eligibility)
    eligibility: "border-transparent bg-purple-muted text-purple-text",
    "technical-skills": "border-transparent bg-purple-muted text-purple-text",
    "work-experience": "border-transparent bg-purple-muted text-purple-text",
    "notice-period": "border-transparent bg-purple-muted text-purple-text",
    // Disqualifier variant (red)
    disqualifier: "border-transparent bg-destructive-muted text-destructive",
    // Qualified variant (green)
    qualified: "border-transparent bg-success-muted text-success",
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
