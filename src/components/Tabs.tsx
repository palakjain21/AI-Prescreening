import * as React from "react";
import { cn } from "../utils";

// Custom Icons
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

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ 
  defaultValue, 
  value, 
  onValueChange, 
  className, 
  children 
}) => {
  const [activeTab, setActiveTab] = React.useState(value || defaultValue || '');

  React.useEffect(() => {
    if (value !== undefined) {
      setActiveTab(value);
    }
  }, [value]);

  const handleTabChange = (newValue: string) => {
    if (value === undefined) {
      setActiveTab(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { 
            activeTab, 
            onTabChange: handleTabChange 
          } as any);
        }
        return child;
      })}
    </div>
  );
};

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, activeTab, onTabChange, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { 
            activeTab, 
            onTabChange 
          } as any);
        }
        return child;
      })}
    </div>
  )
);
TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, activeTab, onTabChange, children, ...props }, ref) => {
    const isActive = activeTab === value;
    
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isActive ? "bg-white text-gray-900 shadow-sm" : "",
          className
        )}
        onClick={() => onTabChange?.(value)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  activeTab?: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, activeTab, children, ...props }, ref) => {
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

interface QualifiedTabsProps {
  qualifiedContent?: React.ReactNode;
  disqualifiedContent?: React.ReactNode;
  defaultTab?: "qualified" | "disqualified";
}

const QualifiedTabs: React.FC<QualifiedTabsProps> = ({
  qualifiedContent,
  disqualifiedContent,
  defaultTab = "qualified",
}) => {
  return (
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
};

export { Tabs, TabsList, TabsTrigger, TabsContent, QualifiedTabs };

