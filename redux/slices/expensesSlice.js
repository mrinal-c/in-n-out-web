import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addQueryParams } from "../utils";

const initialState = {
  expenses: [],
  tableData: {},
  currentExpense: {},
  error: null,
};

export const getTransactions = createAsyncThunk(
  "expense/getTransactions",
  async (data, thunkAPI) => {
    const month = thunkAPI.getState().date.month;
    const year = thunkAPI.getState().date.year;
    const params = {
      month: month,
      year: year,
      out: "true"
    };
    const url = addQueryParams("/api/transaction", params);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error("Unknown error happened");
      }
      const { transactions, tableData } = await response.json();

      return {transactions: transactions, tableData: tableData}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addOut = createAsyncThunk(
  "expense/addOut",
  async (data, thunkAPI) => {
    const transaction = { ...data, out: true}
    const month = thunkAPI.getState().date.month;
    const year = thunkAPI.getState().date.year;
    const params = {
      month: month,
      year: year,
    };
    const url = addQueryParams("/api/transaction", params);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });
      if (!response.ok) {
        throw new Error("Unknown error happened");
      }
      thunkAPI.dispatch(getTransactions());
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "expense/deleteTransaction",
  async (data, thunkAPI) => {
    const transaction = data.transaction;
    const params = {
      _id: transaction._id,
    };
    const url = addQueryParams("/api/transaction", params);
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Unknown error happened");
      }
      thunkAPI.dispatch(getTransactions());
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editTransaction = createAsyncThunk(
  "expense/editTransaction",
  async (data, thunkAPI) => {
    const transaction = data.transaction;
    const params = {
      _id: transaction._id,
    };
    const url = addQueryParams("/api/transaction", params);
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });
      if (!response.ok) {
        throw new Error("Unknown error happened");
      }
      thunkAPI.dispatch(getTransactions());
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.tableData = action.payload.tableData;
        state.expenses = action.payload.transactions.sort((a,b) => new Date(b.date) - new Date(a.date));
        state.error = null;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addOut.rejected, (state, action) => {
        state.error = action.payload.error || action.payload;
      })
      .addCase(addOut.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.error = action.payload.error;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.error = action.payload.error;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.error = null;
      });
  },
});

export default expenseSlice.reducer;
