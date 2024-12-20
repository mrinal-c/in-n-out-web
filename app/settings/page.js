import { Menu } from "@/app/components/Menu";
import { UserOutTable } from "@/app/components/UserOutTable";
import { EditOutTableForm } from "@/app/components/EditOutTableForm";

export default function Settings() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-between items-center w-full">
        <p className="text-3xl font-semibold">Settings</p>
        <Menu />
      </div>
      <div className="w-full flex flex-col gap-4">
        <h2 className="font-semibold text-lg">My Out Table</h2>
        <p>Customize your out table here by choosing meaningful categories that will aggregate spending based on the provided tags</p>
      </div>
      <UserOutTable className="rounded-md border w-full md:w-1/2" />
      <EditOutTableForm />
    </div>
  );
}
