import { Clock, Grid, User, Bell, Api } from "../assets/icons";
import { Button } from "./Button";

export const Sidebar= () => {
  return (
    <div className="fixed left-0 top-0 h-full w-[78px] bg-white flex flex-col items-center py-6 border-r border-gray-200">
      <div className="flex flex-col items-center justify-center space-y-4 h-full">
        <Button variant="link" size="icon" className="p-3">
          <Clock className="w-6 h-6 stroke-2" />
        </Button>

        <Button variant="link" size="icon" className="p-3">
          <Grid className="w-6 h-6 stroke-2" />
        </Button>


        <Button variant="link" size="icon" className="p-3">
          <User className="w-6 h-6 stroke-2" />
        </Button>

        <Button variant="link" size="icon" className="p-3">
          <Api className="w-6 h-6 stroke-2" />
        </Button>
      </div>

      <div className="mt-auto">
        <Button variant="link" size="icon" className="p-3">
          <Bell className="w-6 h-6 stroke-2" />
        </Button>
      </div>
    </div>
  );
};
