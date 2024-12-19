"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OutTable } from "@/app/components/OutTable";
import { OutForm } from "@/app/components/OutForm";
import { Menu } from "@/app/components/Menu";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks";
import { getTransactions, addOut } from "@/redux/slices/expensesSlice";
import { setMonth, setYear } from "@/redux/slices/dateSlice";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const HomeView = () => {
  //hooks
  const dispatch = useAppDispatch();
  const router = useRouter();

  //redux state
  const tableData = useAppSelector((state) => state.expense.tableData);
  const { month, year } = useAppSelector((state) => state.date);

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

  const viewTransactions = () => {
    router.push("/view");
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

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-between items-center w-full">
        <p className="text-3xl font-semibold">Dashboard</p>
        <Menu />
      </div>

      <div className="flex gap-6 justify-center">
        <Select defaultValue={month} onValueChange={handleMonth}>
          <SelectTrigger className="w-min">
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
          <SelectTrigger className="w-min">
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

      <OutTable tableData={tableData} className="rounded-md border w-1/3" />

      <div className="flex gap-4">
        <OutForm />

        <Button onClick={() => router.push("/view")}>View</Button>
      </div>
    </div>
  );
};
