import * as React from "react";
import { cn } from "../../utils";

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onIncrement?: () => void;
  onDecrement?: () => void;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className,  ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          type="number"
          className={cn(
            "flex h-9 w-20 rounded-md border bg-white px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 outline-none",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
export { NumberInput };

