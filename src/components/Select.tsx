import * as React from "react";
import { cn } from "../utils";

// Custom ChevronDown Icon
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

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  optionsClassName?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, value, onValueChange, placeholder = "Select...", className, disabled, icon, optionsClassName, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const selectedOption = options.find((opt) => opt.value === value);
    const selectRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
      onValueChange?.(optionValue);
      setIsOpen(false);
    };

    return (
      <div className="relative" ref={selectRef}>
        <button
          ref={ref}
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-regular shadow-sm hover:bg-gray-50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon && <span className="text-gray-500">{icon}</span>}
            <span className={cn(!selectedOption && "text-gray-500")}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <ChevronDownIcon className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
        </button>
        
        {isOpen && (
          <div className={cn(
            "absolute z-50 mt-1 min-w-[200px] w-full overflow-hidden rounded-md border border-gray-200 bg-white p-2 shadow-lg",
            optionsClassName
          )}>
            {options.map((option) => (
              <button
                key={option.value}
                className={cn(
                  "relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2.5 text-sm outline-none hover:bg-gray-50 focus:bg-gray-50",
                  value === option.value && "bg-blue-50"
                )}
                onClick={() => handleSelect(option.value)}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                    value === option.value 
                      ? "border-blue-600 bg-blue-600" 
                      : "border-gray-300 bg-white"
                  )}>
                    {value === option.value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-gray-900">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };

