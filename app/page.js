import { OutView } from "./components/OutView";
import { addQueryParams } from "./utils";

export default function Home() {
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

  const fetchData = async (month, user) => {
    "use server";
    let params = {
      month: month,
      uid: user?.uid,
    };

    let url = addQueryParams(`${process.env.APP_URL}/tableData`, params);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accesstoken: user?.accessToken,
      },
    });
    let data = await response.json();
    return data.tableData;
  };

  const changeYear = async (newYear, user) => {
    "use server";
    await fetch(`${process.env.APP_URL}/changeYear?year=${newYear}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accesstoken: user?.accessToken,
      },
    });
  };

  const addOut = async (transaction, user, month) => {
    'use server'
    let query = {
      month: month,
      uid: user?.uid,
    };
    let url = addQueryParams(`${process.env.APP_URL}/transaction`, query);
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accesstoken: user?.accessToken,
      },
      body: JSON.stringify(transaction),
    });
    return response.status == 200;
  };

  return (
    <div>
      <OutView
        defaultMonth={months[new Date().getMonth()]}
        defaultYear={new Date().getFullYear().toString()}
        getTableData={fetchData}
        changeYear={changeYear}
        addOut={addOut}
      />
    </div>
  );
}
