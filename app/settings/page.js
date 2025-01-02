import { Menu } from "@/app/components/common/Menu";
import { EditUserTable } from "@/app/components/settings/EditUserTable";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { LucideInfo } from "lucide-react";

export default function Settings() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-between items-center w-full">
        <p className="text-3xl font-semibold">Settings</p>
        <Menu />
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row gap-4 items-center">
          <h2 className="font-semibold text-lg">My in-n-out Table</h2>
          <Popover modal={true}>
            <PopoverTrigger>
              {" "}
              <LucideInfo />{" "}
            </PopoverTrigger>
            <PopoverContent>
              <p>
                For instance, you can have a "Food" category that can collect
                data on the following tags: "Breakfast", "Lunch", and "Dinner"
              </p>
            </PopoverContent>
          </Popover>
        </div>
        <p>
          Customize your in-n-out table here by choosing meaningful categories
          that will aggregate spending based on the provided tags.
        </p>
      </div>
      <EditUserTable />
    </div>
  );
}
