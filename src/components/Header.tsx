import * as React from "react";
import { Button } from "./Button";
import { LeftOutlined, MoreOutlined, FileTextOutlined, DownOutlined, MenuOutlined } from '@ant-design/icons';

export interface HeaderProps {
  className?: string;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className = "" }, ref) => {
    return (
      <div ref={ref} className={`bg-white border-gray-200 w-full ${className}`}>
        <div className="px-6">
          {/* Top Row - Back Navigation */}
          <div className="flex items-center mb-6 h-[82px] border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-6 h-6 cursor-pointer">
                <LeftOutlined className="text-gray-600 text-base" />
              </div>
              <span className="text-gray-600 text-sm font-medium">
                Sales Executive Workflow / Launch Agent
              </span>
            </div>
          </div>

          {/* Second Row - Section Title + Actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-6 h-6">
                <LeftOutlined className="text-gray-600 text-base" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">
                Sales Executive Questions
              </h1>
              <div className="flex items-center ml-2">
                <MoreOutlined className="text-gray-400 text-lg" />
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
              <button className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                <FileTextOutlined className="mr-2" />
                Attempts
                <DownOutlined className="ml-1" />
              </button>
              
              <button className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                Languages Supported (5)
                <DownOutlined className="ml-1" />
              </button>
            </div>

            <div className="flex items-center">
              <button className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors">
                <MenuOutlined className="text-gray-500" />
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
