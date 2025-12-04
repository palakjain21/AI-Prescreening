import type { ButtonHTMLAttributes } from "react";
import { cn } from "../utils";

type ButtonVariant = "solid" | "outline" | "link";
type ButtonColor = "primary" | "informative" | "success" | "secondary" | "destructive";
type ButtonSize = "default" | "sm" | "lg" | "icon";

const variantColorClasses: Record<ButtonColor, Record<ButtonVariant, string>> = {
  primary: {
    solid: "bg-primary-500 text-primary-100 shadow hover:bg-primary-500/90 focus:ring-primary-500/20 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:shadow-none",
    outline: "border border-primary-500 bg-transparent text-primary-500 shadow-sm hover:bg-primary-50 disabled:border-neutral-200 disabled:text-neutral-400 disabled:bg-transparent disabled:shadow-none",
    link: "text-primary-500 hover:ring-primary-500/20 focus:ring-primary-500/20 disabled:text-neutral-400 disabled:no-underline",
  },
  informative: {
    solid: "bg-deep-blue text-white shadow hover:bg-deep-blue/90 focus:deep-blue/20 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:shadow-none",
    outline: "border border-information-500 bg-transparent text-information-500 shadow-sm hover:bg-blue-50 disabled:border-neutral-200 disabled:text-neutral-400 disabled:bg-transparent disabled:shadow-none",
    link: "text-information-500 focus:ring-information-500/20 hover:ring-information-500/20 disabled:text-neutral-400 disabled:no-underline",
  },
  success: {
    solid: "bg-success-500 text-white shadow hover:bg-success-500/90 focus:ring-success-500/20 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:shadow-none",
    outline: "border border-success-500 bg-transparent text-success-500 shadow-sm hover:bg-success-50 disabled:border-neutral-200 disabled:text-neutral-400 disabled:bg-transparent disabled:shadow-none",
    link: "text-success-500 focus:ring-success-500/20 hover:ring-success-500/20 disabled:text-neutral-400 disabled:no-underline",
  },
  secondary: {
    solid: "bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-200 focus:ring-neutral-500/20 disabled:bg-neutral-100 disabled:text-neutral-300 disabled:shadow-none",
    outline: "border border-neutral-900 bg-transparent text-neutral-900 shadow-sm hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-300 disabled:bg-transparent disabled:shadow-none",
    link: "text-neutral-900 focus:ring-neutral-500/20 hover:ring-neutral-500/20 disabled:text-neutral-300 disabled:no-underline",
  },
  destructive: {
    solid: "bg-error-500 text-white shadow-sm hover:bg-error-500/90 focus:ring-error-500/20 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:shadow-none",
    outline: "border border-error-500 bg-transparent text-error-500 shadow-sm hover:bg-error-50 disabled:border-neutral-200 disabled:text-neutral-400 disabled:bg-transparent disabled:shadow-none",
    link: "text-error-500 focus:ring-error-500/20 hover:ring-error-500/20 disabled:text-neutral-400 disabled:no-underline",
  },
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9",
};

const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-regular transition-colors focus-visible:outline-none focus:ring-0 focus:ring-offset-0 disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
}

export function Button({ className, variant = "solid", color = "primary", size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(baseClasses, variantColorClasses[color][variant], sizeClasses[size], className)}
      {...props}
    />
  );
}
