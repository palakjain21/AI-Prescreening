import * as React from "react";
import { cn } from "../utils";

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
              "flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 hover:bg-gray-50",
              value === option.value && "bg-blue-50"
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onValueChange?.(e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
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

