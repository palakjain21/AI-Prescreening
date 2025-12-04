import * as React from "react";
import { cn } from "../../utils";

interface RadioGroupOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioGroupOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  name?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, value, onValueChange, className, name, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 hover:bg-muted",
              value === option.value && "bg-primary-muted"
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onValueChange?.(e.target.value)}
              className="h-4 w-4 text-primary focus:ring-ring"
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
