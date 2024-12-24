"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionTable } from "@/app/components/dashboard/TransactionTable";
import { TransactionForm } from "@/app/components/common/TransactionForm";
import { Menu } from "@/app/components/common/Menu";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks";
import { getTransactions, addOut } from "@/redux/slices/expensesSlice";
import { setMonth, setYear } from "@/redux/slices/dateSlice";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingTable } from "@/app/components/loading/LoadingTable";

export const DashboardView = () => {
  //hooks
  const dispatch = useAppDispatch();
  const router = useRouter();

  //redux state
  const { outTableData, inTableData, loading } = useAppSelector(
    (state) => state.expense
  );
  const { month, year } = useAppSelector((state) => state.date);

  //local state
  const [tab, setTab] = useState("outs");

  //fetch transactions on page load and when month/year change
  useEffect(() => {
    dispatch(getTransactions());
  }, [month, year]);

  const handleMonth = (newMonth) => {
    dispatch(setMonth(newMonth));
  };

  const handleYear = (newYear) => {
    dispatch(setYear(newYear));
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const years = ["2024"];

  if (loading) {
    return (
      <div className="flex flex-col gap-10 w-full mt-12 justify-center items-center">
        <LoadingTable />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 w-full mt-12 justify-center items-center">
      <div className="flex gap-6 justify-center">
        <Select defaultValue={month} onValueChange={handleMonth}>
          <SelectTrigger className="px-8">
            <SelectValue>{month}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue={year} onValueChange={handleYear}>
          <SelectTrigger className="px-8">
            <SelectValue>{year}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs
        defaultValue="outs"
        className="w-3/4 md:w-[400px]"
        onValueChange={setTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="outs">Outs</TabsTrigger>
          <TabsTrigger value="ins">Ins</TabsTrigger>
        </TabsList>

        <TabsContent value="outs">
          <TransactionTable
            tableData={outTableData}
            className="rounded-md border"
          />
        </TabsContent>
        <TabsContent value="ins">
          <TransactionTable
            tableData={inTableData}
            className="rounded-md border"
          />
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <TransactionForm isOut={tab == "outs" ? true : false} />

        <Button onClick={() => router.push("/transactions")}>View</Button>
      </div>
    </div>
  );
};
