import * as React from "react";
import { cn } from "../../utils";
import { Button } from "./Button";
import { Close } from "../../assets/icons";

interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onOpenChange, children }) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange?.(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {children}
    </div>
  );
};

const ModalTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
));

const ModalClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => (
  <button ref={ref} {...props} >
    {children}
  </button>
));

const ModalOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-gradient-to-tr from-primary-500/60 to-primary-200/40", className)}
    {...props}
  />
));

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, children, onClose, ...props }, ref) => (
    <>
      <ModalOverlay onClick={onClose} />
      <div
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded-lg border border-gray-200",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
        <Button
          variant="link"
          color="secondary"
          size="icon"
          onClick={onClose}
          className="absolute right-2 top-6 opacity-70 hover:opacity-100 focus:ring-0 focus:ring-offset-0"
        >
          <Close className="h-8 w-8" />
          </Button>
        </div>
    </>
  )
);

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4", className)} {...props} />
);

const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex justify-end space-x-2 mt-4", className)} {...props} />
);
ModalFooter.displayName = "ModalFooter";

const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold mb-2 pb-4 border-b border-gray-200 text-left", className)}
    {...props}
  />
));
ModalTitle.displayName = "ModalTitle";

const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-neutral-500 text-left pt-4", className)}
    {...props}
  />
));

interface DeleteModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
}) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent onClose={() => onOpenChange?.(false)}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button
            variant="outline"
            color="secondary"
            onClick={() => onOpenChange?.(false)}
          >
            {cancelText}
          </Button>
          <Button
            variant="solid"
            color="destructive"
            onClick={() => {
              onConfirm?.();
              onOpenChange?.(false);
            }}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export {
  Modal,
  ModalOverlay,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  DeleteModal,
};

