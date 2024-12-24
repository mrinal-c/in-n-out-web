import { DashboardView } from "@/app/components/dashboard/DashboardView";
import { Menu } from "@/app/components/common/Menu";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex justify-between items-center w-full">
        <p className="text-3xl font-semibold">Dashboard</p>
        <Menu />
      </div>
      <DashboardView />
    </div>
    
  );
}
