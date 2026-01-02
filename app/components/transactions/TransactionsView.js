"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TransactionCard } from "@/app/components/transactions/TransactionCard";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks";
import {
  editTransaction,
  getTransactions,
  deleteTransaction,
} from "@/redux/slices/expensesSlice";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const TransactionsView = () => {
  //hooks
  const dispatch = useAppDispatch();
  const router = useRouter();

  //redux state
  const { transactions } = useAppSelector((state) => state.expense);

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
    const searchLower = searchText.toLowerCase();
    return transactions.filter((transaction) => {
      // Search in description
      const descriptionMatch = transaction.description
        ?.toLowerCase()
        .includes(searchLower) || false;
      
      // Search in amount
      const amountMatch = transaction.amount
        ?.toString()
        .includes(searchText) || false;
      
      // Search in payment method
      const paymentMatch = transaction.payment
        ?.toLowerCase()
        .includes(searchLower) || false;
      
      // Search in transaction date (multiple formats)
      const dateStr = transaction.transactionDate || "";
      const dateMatch = dateStr.toLowerCase().includes(searchLower);
      
      // Enhanced date search - also check formatted date
      let formattedDateMatch = false;
      if (dateStr) {
        try {
          const date = new Date(dateStr);
          const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }).toLowerCase();
          const shortDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }).toLowerCase();
          const monthName = date.toLocaleDateString('en-US', { month: 'long' }).toLowerCase();
          const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
          
          formattedDateMatch = 
            formattedDate.includes(searchLower) ||
            shortDate.includes(searchLower) ||
            monthName.includes(searchLower) ||
            dayName.includes(searchLower);
        } catch (e) {
          // If date parsing fails, just use the string match
        }
      }
      
      // Search in tags (array of strings)
      const tagsMatch = transaction.tags
        ? transaction.tags.some(tag => 
            tag?.toLowerCase().includes(searchLower)
          )
        : false;
      
      // Search in transaction type (in/out)
      const typeMatch = transaction.out !== undefined
        ? (transaction.out ? "out" : "in").includes(searchLower)
        : false;
      
      return (
        descriptionMatch ||
        amountMatch ||
        paymentMatch ||
        dateMatch ||
        formattedDateMatch ||
        tagsMatch ||
        typeMatch
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <Button onClick={() => router.push("/dashboard")}>Home</Button>
        <Input
          placeholder="Filter"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filterTransactions().map((transaction) => (
          <TransactionCard key={transaction._id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};
