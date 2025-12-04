import * as React from "react";
import { cn } from "../../utils";

type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  onClose?: () => void;
  open?: boolean;
  duration?: number;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

const getVariantClasses = (variant: ToastVariant = "success") => {
  const variants = {
    success: "bg-white text-gray-900 border border-gray-300 border-b-[4px] border-b-success-500",
    error: "bg-white text-gray-900 border border-gray-300 border-b-[4px] border-b-red-500",
    warning: "bg-white text-gray-900 border border-gray-300 border-b-[4px] border-b-warning-500",
    info: "bg-white text-gray-900 border border-gray-300 border-b-[4px] border-b-information-500",
  };
  return variants[variant];
};

const getIconClasses = (variant: ToastVariant = "success") => {
  const iconVariants = {
    success: "text-success-500 bg-success-100 rounded-lg p-2 border border-success-500",
    error: "text-red-500 bg-error-100 rounded-lg p-2 border border-red-500",
    warning: "text-warning-500 bg-warning-100 rounded-lg p-2 border border-warning-500  ",
    info: "text-information-500 bg-blue-100 rounded-lg p-2 border border-information-500",
  };
  return iconVariants[variant];
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = "success", onClose, open = true, duration, children, icon, title, description, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(open);

    React.useEffect(() => {
      setIsVisible(open);
    }, [open]);

    React.useEffect(() => {
      if (duration && isVisible) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          onClose?.();
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration, isVisible, onClose]);

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "fixed bottom-4 border-1 border-gray-300 right-4 z-50 flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg transition-all duration-300 ease-in-out",
          "min-w-[150px] max-w-[320px]",
          getVariantClasses(variant),
          className
        )}
        {...props}
      >
        {icon && (
          <div className={cn(
            "flex-shrink-0 flex items-center justify-center",
            getIconClasses(variant)
          )}>
            <div className="h-5 w-5 [&_svg]:h-5 [&_svg]:w-5">
              {icon}
            </div>
          </div>
        )}
        <div className="flex-1 min-w-0">
          {title && description && (
            <div className="text-sm text-gray-900 text-left">
              <div className="font-semibold">{title}</div>
              <div className="font-normal text-neutral-500">{description}</div>
            </div>
          )}
          {title && !description && (
            <div className="text-sm font-semibold text-gray-900 text-left">
              {title}
            </div>
          )}
          {!title && description && (
            <div className="text-sm text-gray-900 font-normal text-left">
              {description}
            </div>
          )}
          {!title && !description && children && (
            <div className="text-sm font-semibold text-gray-900">
              {children}
            </div>
          )}
        </div>
      </div>
    );
  }
);
export { Toast };



