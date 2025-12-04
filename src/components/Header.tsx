import * as React from "react";
import { Button } from "./ui/Button";

export interface HeaderProps {
  className?: string;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className = "" }, ref) => {
    return (
      <div ref={ref} className={`bg-card border-border w-full ${className}`}>
        <div className="px-6">
          {/* Top Row - Back Navigation */}
          <div className="flex items-center mb-6 h-[82px] border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-6 h-6 cursor-pointer">
                <span className="text-muted-foreground text-base font-medium">&larr;</span>
              </div>
              <span className="text-muted-foreground text-sm font-medium">
                Sales Executive Workflow / Launch Agent
              </span>
            </div>
          </div>

          {/* Second Row - Section Title + Actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-6 h-6">
                <span className="text-muted-foreground text-base font-medium">&larr;</span>
              </div>
              <h1 className="text-lg font-semibold text-foreground">
                Sales Executive Questions
              </h1>
              <div className="flex items-center ml-2">
                <span className="text-muted-foreground text-lg">•••</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="default">
                Skip
              </Button>
              <Button variant="primary" size="default">
                Approve
              </Button>
            </div>
          </div>

          {/* Third Row - Filter Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium border border-border bg-card text-foreground hover:bg-muted transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Attempts
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <button className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium border border-border bg-card text-foreground hover:bg-muted transition-colors">
                Languages Supported (5)
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <div className="flex items-center">
              <button className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors">
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Header.displayName = "Header";

export { Header };
