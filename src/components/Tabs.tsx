import * as React from "react";
import { cn } from "../utils";

// Icons
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Context for sharing tab state
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a <Tabs> provider");
  }
  return context;
};

// Tabs Root
interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ 
  defaultValue = '', 
  value, 
  onValueChange, 
  className, 
  children 
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const activeTab = value ?? internalValue;

  const setActiveTab = (newValue: string) => {
    if (value === undefined) {
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

// TabsList
type TabsListProps = React.HTMLAttributes<HTMLDivElement>;

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
TabsList.displayName = "TabsList";

// TabsTrigger
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab, setActiveTab } = useTabsContext();
    const isActive = activeTab === value;
    
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isActive && "bg-white text-gray-900 shadow-sm",
          className
        )}
        onClick={() => setActiveTab(value)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

// TabsContent
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab } = useTabsContext();
    
    if (activeTab !== value) return null;
    
    return (
      <div
        ref={ref}
        className={cn(
          "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
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

// QualifiedTabs - preset component
interface QualifiedTabsProps {
  qualifiedContent?: React.ReactNode;
  disqualifiedContent?: React.ReactNode;
  defaultTab?: "qualified" | "disqualified";
}

const QualifiedTabs: React.FC<QualifiedTabsProps> = ({
  qualifiedContent,
  disqualifiedContent,
  defaultTab = "qualified",
}) => (
  <Tabs defaultValue={defaultTab} className="w-full">
    <TabsList className="bg-transparent p-0 h-auto gap-2">
      <TabsTrigger
        value="qualified"
        className="data-[state=active]:bg-transparent data-[state=active]:text-green-700 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-green-600 rounded-none px-4 py-2 aria-selected:bg-transparent aria-selected:text-green-700 aria-selected:shadow-none aria-selected:border-green-600"
      >
        <CheckIcon className="mr-2 h-4 w-4" />
        Qualified
      </TabsTrigger>
      <TabsTrigger
        value="disqualified"
        className="data-[state=active]:bg-transparent data-[state=active]:text-red-700 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-red-600 rounded-none px-4 py-2 aria-selected:bg-transparent aria-selected:text-red-700 aria-selected:shadow-none aria-selected:border-red-600"
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
