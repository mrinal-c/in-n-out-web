import { ExpensesView } from "./ExpensesView";
import { addQueryParams } from "../../redux/utils";
import { Suspense } from "react";

export default function View() {
  const sortTransactions = (transactions) => {
    transactions.sort((a, b) => {
      return a.date < b.date ? 1 : -1;
    });
  };

  const fetchTransactions = async (month, user) => {
    "use server";
    let params = {
      month: month,
      uid: user?.uid,
    };
    let url = addQueryParams(`${process.env.APP_URL}/transaction`, params);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accesstoken: user?.accessToken,
      },
    });

    let data = await response.json();
    return data;
  };

  const editTransaction = async (transaction, month, user) => {
    "use server";
    let params = {
      month: month,
      uid: user?.uid,
      _id: transaction._id,
    };
    let url = addQueryParams(`${process.env.APP_URL}/transaction`, params);
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accesstoken: user?.accessToken,
      },
      body: JSON.stringify(transaction)
    });

    let data = await response.json();
    return data;
  };

  const deleteTransaction = async (transaction, month, user) => {
    "use server";
    let params = {
      _id: transaction._id,
      uid: user?.uid,
      month: month
    };
    let url = addQueryParams(`${process.env.APP_URL}/transaction`, params);
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accesstoken: user?.accessToken,
      },
    });

    let data = await response.json();
    return data;
  
  }
  return (
    <div>
      <Suspense>
        <ExpensesView fetchTransactions={fetchTransactions} deleteTransaction={deleteTransaction} editTransaction={editTransaction}/>
      </Suspense>
    </div>
  );
}
