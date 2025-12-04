import * as React from "react";
import { cn } from "../../utils";

// Custom Icons
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

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  ({ options, value, onValueChange, placeholder = "Select...", className, disabled, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const selectedOption = options.find((opt) => opt.value === value);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
      <div className="relative" ref={dropdownRef}>
        <button
          ref={ref}
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm font-medium shadow-sm hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          <span className={cn(!selectedOption && "text-muted-foreground")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDownIcon className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
        </button>
        
        {isOpen && (
          <div className="absolute z-50 mt-1 min-w-[8rem] w-full overflow-hidden rounded-md border border-border bg-popover p-1 shadow-md">
            {options.map((option) => (
              <button
                key={option.value}
                className={cn(
                  "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-popover-foreground outline-none hover:bg-muted focus:bg-muted",
                  value === option.value && "bg-muted"
                )}
                onClick={() => handleSelect(option.value)}
              >
                {value === option.value && (
                  <CheckIcon className="mr-2 h-4 w-4" />
                )}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
Dropdown.displayName = "Dropdown";

export { Dropdown };
