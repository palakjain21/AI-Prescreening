import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils";

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

const variantStyles: Record<ButtonVariant, string> = {
  neutral: "bg-transparent text-primary border-none shadow-none hover:bg-primary-muted p-2",
  default: "bg-primary text-primary-foreground shadow hover:bg-primary-hover",
  primary: "bg-primary text-primary-foreground shadow hover:bg-primary-hover",
  destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive-hover",
  outline: "border border-border bg-card shadow-sm hover:bg-muted text-foreground",
  secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-hover",
  ghost: "hover:bg-muted text-foreground",
  link: "text-primary underline-offset-4 hover:underline",
  "response-yes": "border border-border bg-card hover:bg-muted text-foreground rounded-lg",
  "response-no": "border border-border bg-card hover:bg-muted text-foreground rounded-lg",
  icon: "bg-transparent text-primary hover:bg-muted border-none shadow-none",
  "icon-active": "bg-primary-muted text-primary border-none shadow-none",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  count?: number;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", count, children, ...props }, ref) => {
    const showBadge = count !== undefined;
    const badgeStyle =
      variant === "default" || variant === "primary"
        ? "bg-white/20 text-primary-foreground"
        : "bg-muted text-foreground";

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors",
          "focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
        {showBadge && (
          <span className={cn("ml-2 rounded-md px-2 py-0.5 text-xs font-medium", badgeStyle)}>
            {count}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
