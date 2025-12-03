import * as React from "react";
import { cn } from "../utils";

// Custom Icons
const ChevronUpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onIncrement?: () => void;
  onDecrement?: () => void;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, onIncrement, onDecrement, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          type="number"
          className={cn(
            "flex h-9 w-20 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute right-1 flex flex-col">
          <button
            type="button"
            onClick={onIncrement}
            className="h-3 w-4 flex items-center justify-center border-b border-gray-300 hover:bg-gray-100 rounded-t"
            tabIndex={-1}
          >
            <ChevronUpIcon className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={onDecrement}
            className="h-3 w-4 flex items-center justify-center hover:bg-gray-100 rounded-b"
            tabIndex={-1}
          >
            <ChevronDownIcon className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";

export { NumberInput };

