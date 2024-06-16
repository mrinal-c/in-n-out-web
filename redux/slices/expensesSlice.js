import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addQueryParams } from "../utils";

const initialState = {
  expenses: [],
  tableData: {},
  currentExpense: {},
  error: null,
};

export const getTableData = createAsyncThunk(
  "expense/getTableData",
  async (data, thunkAPI) => {
    const user = data.user;
    const month = thunkAPI.getState().date.month;
    const params = {
      uid: user.uid,
      accessToken: user.accessToken,
      month: month,
    };
    const url = addQueryParams("/api/tableData", params);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data.tableData;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const addOut = createAsyncThunk(
  "expense/addOut",
  async (data, thunkAPI) => {
    const user = data.user;
    const month = thunkAPI.getState().date.month;
    const params = {
      uid: user.uid,
      accessToken: user.accessToken,
      month: month,
    };
    const transaction = data.transaction;
    const url = addQueryParams("/api/transaction", params);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });
      const data = await response.json();
      let success = data.success;
      if (success) {
        thunkAPI.dispatch(getTableData({ user: user}));
      } else {
        return thunkAPI.rejectWithValue({ error: "Failed to add expense" });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  "expense/fetchTransactions",
  async (data, thunkAPI) => {
    const user = data.user;
    const month = thunkAPI.getState().date.month;
    const params = {
      uid: user.uid,
      accessToken: user.accessToken,
      month: month,
    };
    const url = addQueryParams("/api/transaction", params);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "expense/deleteTransaction",
  async (data, thunkAPI) => {
    const user = data.user;
    const month = thunkAPI.getState().date.month;
    const transaction = data.transaction;
    const params = {
      uid: user.uid,
      accessToken: user.accessToken,
      month: month,
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
      const data = await response.json();
      let success = data.success;
      if (success) {
        console.log("deleted, now refreshing transactions")
        thunkAPI.dispatch(fetchTransactions({ user: user}));
      } else {
        return thunkAPI.rejectWithValue({ error: "Failed to add expense" });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const editTransaction = createAsyncThunk(
  "expense/editTransaction",
  async (data, thunkAPI) => {
    const user = data.user;
    const month = thunkAPI.getState().date.month;
    const transaction = data.transaction;
    const params = {
      uid: user.uid,
      accessToken: user.accessToken,
      month: month,
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
      const data = await response.json();
      let success = data.success;
      if (success) {
        thunkAPI.dispatch(fetchTransactions({ user: user}));
      } else {
        return thunkAPI.rejectWithValue({ error: "Failed to add expense" });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTableData.fulfilled, (state, action) => {
        state.tableData = action.payload;
        state.error = null;
      })
      .addCase(getTableData.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addOut.rejected, (state, action) => {
        state.error = action.payload.error;
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
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.expenses = action.payload;
        state.error = null;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.error = action.payload.error;
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
