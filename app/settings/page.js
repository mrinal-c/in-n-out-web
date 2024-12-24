import { Menu } from "@/app/components/common/Menu";
import { EditUserTable } from "@/app/components/settings/EditUserTable";

export default function Settings() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-between items-center w-full">
        <p className="text-3xl font-semibold">Settings</p>
        <Menu />
      </div>
      <div className="w-full flex flex-col gap-4">
        <h2 className="font-semibold text-lg">My in-n-out Table</h2>
        <p>Customize your in-n-out table here by choosing meaningful categories that will aggregate spending based on the provided tags</p>
      </div>
      <EditUserTable  />
      
    </div>
  );
}
