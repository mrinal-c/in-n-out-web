import { Menu } from "@/app/components/Menu";
import { UserOutTable } from "@/app/components/UserOutTable";
import { EditOutTableForm } from "@/app/components/EditOutTableForm";


export default function Settings() {
  return (
    <div className="h-screen py-10 px-32">
      <div className="flex flex-col items-center gap-6">
        <div className="flex justify-between items-center w-full">
          <p className="text-3xl font-semibold">Settings</p>
          <Menu />
        </div>
        <UserOutTable className="rounded-md border w-1/2" />
        <EditOutTableForm />
      </div>
    </div>
  );
}
