import * as React from "react";
import { Clock, Grid, User, Key, Bell } from "./icons";
import { Button } from "./Button";

export const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-[78px] bg-white flex flex-col items-center py-6 border-r border-gray-200">
      {/* Top icon group */}
      <div className="flex flex-col items-center justify-center space-y-4 h-full">
        {/* Clock/Analytics icon */}
        <Button variant="icon" size="icon" className="p-3">
          <Clock className="w-6 h-6 stroke-2" />
        </Button>
        
        {/* Grid icon - Active state */}
        <Button variant="icon-active" size="icon" className="p-3">
          <Grid className="w-6 h-6 stroke-2" />
        </Button>
        
        {/* User icon */}
        <Button variant="icon" size="icon" className="p-3">
          <User className="w-6 h-6 stroke-2" />
        </Button>
        
        {/* Key/Permissions icon */}
        <Button variant="icon" size="icon" className="p-3">
          <Key className="w-6 h-6 stroke-2" />
        </Button>
      </div>
      
      {/* Bottom icon - Bell with mt-auto to push to bottom */}
      <div className="mt-auto">
        <Button variant="icon" size="icon" className="p-3">
          <Bell className="w-6 h-6 stroke-2" />
        </Button>
      </div>
    </div>
  );
};
