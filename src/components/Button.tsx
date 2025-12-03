import * as React from "react";
import { cn } from "../utils";

type ButtonVariant = 
  | "neutral"
  | "default" 
  | "primary" 
  | "destructive" 
  | "outline" 
  | "secondary" 
  | "ghost" 
  | "link" 
  | "response-yes" 
  | "response-no"
  | "icon"
  | "icon-active";

type ButtonSize = "default" | "sm" | "lg" | "icon";

const getVariantClasses = (variant: ButtonVariant = "default") => {
  const variants = {
    neutral: "bg-transparent text-blue-600 border-none shadow-none hover:bg-blue-50 focus:ring-0 focus:ring-offset-0 p-2",
    default: "bg-blue-600 text-white shadow hover:bg-blue-700",
    primary: "bg-blue-600 text-white shadow hover:bg-blue-700",
    destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700",
    outline: "border border-gray-300 bg-white shadow-sm hover:bg-gray-50 text-gray-700",
    secondary: "bg-gray-100 text-gray-700 shadow-sm hover:bg-gray-200",
    ghost: "hover:bg-gray-100 text-gray-700",
    link: "text-blue-600 underline-offset-4 hover:underline",
    "response-yes": "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 rounded-lg",
    "response-no": "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 rounded-lg",
    icon: "bg-transparent text-blue-600 hover:bg-gray-50 border-none shadow-none focus:ring-0 focus:ring-offset-0",
    "icon-active": "bg-blue-50 text-blue-600 border-none shadow-none focus:ring-0 focus:ring-offset-0",
  };
  return variants[variant];
};

const getSizeClasses = (size: ButtonSize = "default") => {
  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  };
  return sizes[size];
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  count?: number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, count, children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
    
    if (asChild && React.isValidElement(children)) {
      // For asChild functionality, we'll render the children directly with the classes
      const childProps = children.props as any;
      return React.cloneElement(children, {
        className: cn(baseClasses, getVariantClasses(variant), getSizeClasses(size), className, childProps.className),
        ref,
        ...props,
      } as any);
    }

    return (
      <button
        className={cn(baseClasses, getVariantClasses(variant), getSizeClasses(size), className)}
        ref={ref}
        {...props}
      >
        {children}
        {count !== undefined && (
          <span className={cn(
            "ml-2 rounded-md px-2 py-0.5 text-xs font-medium",
            variant === "response-yes" || variant === "response-no"
              ? "bg-gray-100 text-gray-700"
              : variant === "default" || variant === "primary" 
              ? "bg-white/20 text-white" 
              : "bg-gray-200 text-gray-700"
          )}>
            {count}
          </span>
        )}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };
