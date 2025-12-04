import * as React from "react";
import { Button } from "./Button";
import { Left, ArrowLeft, ChevronDown, FileText, Tune } from "../assets/icons";
export interface HeaderProps {
  className?: string;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className = "" }, ref) => {
    return (
      <div ref={ref} className={`bg-white border-gray-200 m-0 p-0 w-full ${className}`}>
        <div className="px-0">
          <div className="flex items-center mb-4 h-[60px] border-b border-gray-200 ">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-6 h-6 cursor-pointer">
                <ArrowLeft className="text-neutral-500 text-base" />
              </div>
              <span className="text-neutral-500 text-sm font-medium">
                Sales Executive Workflow / Launch Agent
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3 w-[800px] max-w-[800px] mx-auto px-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-6 h-6">
                <Left className="text-neutral-500 text-base" />
              </div>
              <h1 className="text-lg font-semibold text-neutral-900">
                Sales Executive Questions ...
              </h1>
            </div>

            <div className="flex items-center space-x-2 px-1">
              <Button variant="outline" color="secondary" size="default" className="border-gray-300 text-gray-500">
                Skip
              </Button>
              <Button variant="solid" color="informative" size="default">
                Approve
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between w-[800px] max-w-[800px] mx-auto px-4">
            <div className="flex items-center px-1 space-x-2">
              <Button variant="outline" color="secondary" size="default" className="border-gray-300 text-gray-500">
                <FileText />
                Attempts
                <ChevronDown />
              </Button>

              <Button variant="outline" color="secondary" size="default" className="border-gray-300 text-gray-500">
                Languages Supported (5)
                <ChevronDown />
              </Button>
            </div>

            <div className="flex items-center px-1">
              <Button variant="link" color="secondary" size="icon">
                <Tune />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export { Header };
