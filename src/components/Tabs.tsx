import { createContext, useContext, useState, forwardRef, type ReactNode, type HTMLAttributes, type ButtonHTMLAttributes } from "react";
import { cn } from "../utils";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Context for tabs state
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
};

// Main Tabs component
interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: ReactNode;
}

const Tabs = ({ defaultValue = "", value, onValueChange, className, children }: TabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : internalValue;

  const setActiveTab = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

// TabsList component
const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
TabsList.displayName = "TabsList";

// TabsTrigger component
interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, onClick, ...props }, ref) => {
    const { activeTab, setActiveTab } = useTabsContext();
    const isActive = activeTab === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          isActive && "bg-card text-foreground shadow-sm",
          className
        )}
        onClick={(e) => {
          setActiveTab(value);
          onClick?.(e);
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

// TabsContent component
interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab } = useTabsContext();

    if (activeTab !== value) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        data-state={activeTab === value ? "active" : "inactive"}
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent";

// Pre-built QualifiedTabs component
interface QualifiedTabsProps {
  qualifiedContent?: ReactNode;
  disqualifiedContent?: ReactNode;
  defaultTab?: "qualified" | "disqualified";
}

const QualifiedTabs = ({ qualifiedContent, disqualifiedContent, defaultTab = "qualified" }: QualifiedTabsProps) => (
  <Tabs defaultValue={defaultTab} className="w-full">
    <TabsList className="bg-transparent p-0 h-auto gap-2">
      <TabsTrigger
        value="qualified"
        className="data-[state=active]:bg-transparent data-[state=active]:text-success data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-success rounded-none px-4 py-2"
      >
        <CheckIcon className="mr-2 h-4 w-4" />
        Qualified
      </TabsTrigger>
      <TabsTrigger
        value="disqualified"
        className="data-[state=active]:bg-transparent data-[state=active]:text-destructive data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-destructive rounded-none px-4 py-2"
      >
        <XIcon className="mr-2 h-4 w-4" />
        Disqualified
      </TabsTrigger>
    </TabsList>
    <TabsContent value="qualified" className="mt-4">
      {qualifiedContent}
    </TabsContent>
    <TabsContent value="disqualified" className="mt-4">
      {disqualifiedContent}
    </TabsContent>
  </Tabs>
);

export { Tabs, TabsList, TabsTrigger, TabsContent, QualifiedTabs };
