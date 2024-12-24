"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserTable } from "./UserTable";
import { EditUserTableForm } from "@/app/components/settings/EditUserTableForm";
import { useState } from "react";

export const EditUserTable = () => {
  //local state
  const [tab, setTab] = useState("outs");

  return (
    <div className="flex flex-col gap-6 justify-center">
      <Tabs defaultValue="outs" className="w-3/4 md:w-[600px]" onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="outs">Out Table</TabsTrigger>
          <TabsTrigger value="ins">In Table</TabsTrigger>
        </TabsList>
        <TabsContent value="outs">
          <UserTable isOut={true} className="rounded-md border" />
        </TabsContent>
        <TabsContent value="ins">
          <UserTable isOut={false} className="rounded-md border" />
        </TabsContent>
      </Tabs>
      <EditUserTableForm isOut={tab === "outs"}/>
    </div>
  );
};
