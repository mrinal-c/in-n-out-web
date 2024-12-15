"use client";
import { useState, useEffect } from "react";
import { ExpenseCell } from "./ExpenseCell";


import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch, useAppStore } from "../../redux/hooks";
import {
  editTransaction,
  getTransactions,
  deleteTransaction,
} from "../../redux/slices/expensesSlice";

export const ExpensesView = () => {
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
  <div className="h-screen p-8">
    You have made {transactions.length} outs this month
    <div className="grid grid-cols-4 gap-4">
      {transactions.map((transaction) => (
        <ExpenseCell key={transaction._id} out={transaction}/>
      ))}
    </div>
  </div>);
}
