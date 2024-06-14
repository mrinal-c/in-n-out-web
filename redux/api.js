import { addQueryParams } from "./utils";


export const fetchTransactionsAPI = async (month, user) => {
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

export const editTransactionAPI = async (transaction, month, user) => {
  let params = {
    month: month,
    uid: user.uid,
    _id: transaction._id,
  };
  let url = addQueryParams(`${process.env.APP_URL}/transaction`, params);
  let response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accesstoken: user.accessToken,
    },
    body: JSON.stringify(transaction),
  });

  return response.status == 200;
};

export const deleteTransactionAPI = async (transaction, month, user) => {
  let params = {
    _id: transaction._id,
    uid: user.uid,
    month: month,
  };
  let url = addQueryParams(`${process.env.APP_URL}/transaction`, params);
  let response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      accesstoken: user.accessToken,
    },
  });

  let data = await response.json();
  return data;
};

export const changeYearAPI = async (newYear, user) => {
  await fetch(`${process.env.APP_URL}/changeYear?year=${newYear}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accesstoken: user.accessToken,
    },
  });
};

export const addOutAPI = async (transaction, user, month) => {
  let query = {
    month: month,
    uid: user.uid,
  };
  let url = addQueryParams(`${process.env.APP_URL}/transaction`, query);
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accesstoken: user.accessToken,
    },
    body: JSON.stringify(transaction),
  });
  return response.status == 200;
};

export const fetchDataAPI = async (month, user) => {
  let params = {
    month: month,
    uid: user.uid,
  };

  let url = addQueryParams(`${process.env.NEXT_PUBLIC_APP_URL}/tableData`, params);
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accesstoken: user?.accessToken,
    }
  });
  let data = await response.json();
  return data.tableData;
};
