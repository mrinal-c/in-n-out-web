"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OutCard } from "@/app/components/OutCard";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks";
import {
  editTransaction,
  getTransactions,
  deleteTransaction,
} from "@/redux/slices/expensesSlice";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";



export const OutsView = () => {
  //hooks
  const dispatch = useAppDispatch();
  const router = useRouter();

  //redux state
  const transactions = useAppSelector((state) => state.expense.expenses);
  const { isLoggedIn, user } = useAppSelector((state) => state.user);

  //local state
  const [searchText, setSearchText] = useState("");

  //fetch transactions on page load
  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filterTransactions = () => {
    if (searchText == "") {
      return transactions;
    }
    return transactions.filter((transaction) => {
      return (
        transaction.description
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        transaction.amount.toString().includes(searchText) ||
        transaction.payment.toLowerCase().includes(searchText.toLowerCase()) ||
        transaction.date.toLowerCase().includes(searchText.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <Button onClick={() => router.push("/home")}>Home</Button>
        <Input
          placeholder="Filter"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filterTransactions().map((transaction) => (
          <OutCard key={transaction._id} out={transaction} />
        ))}
      </div>
    </div>
  );
};
