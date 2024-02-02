import { ExpensesView } from "./ExpensesView";
import { addQueryParams } from "../utils";

export default function View() {
  const sortTransactions = (transactions) => {
    transactions.sort((a, b) => {
      return a.date < b.date ? 1 : -1;
    });
  };

  const fetchTransactions = async (month, user) => {
    'use server'
    let params = {
      month: month,
      uid: user.uid,
    };
    let url = addQueryParams(`${process.env.APP_URL}/transaction`, params);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accesstoken: user.accessToken,
      },
    });

    let data = await response.json();
    return data;
  };
  return (
    <div>
      <ExpensesView fetchTransactions={fetchTransactions}/>
    </div>
  );
}
