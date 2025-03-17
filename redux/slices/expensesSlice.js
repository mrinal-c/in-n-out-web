import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addQueryParams } from "../utils";

const initialState = {
  transactions: [],
  inTableData: {},
  outTableData: {},
  error: null,
  loading: false,
};

export const getTransactions = createAsyncThunk(
  "expense/getTransactions",
  async (data, thunkAPI) => {
    const month = thunkAPI.getState().date.month;
    const year = thunkAPI.getState().date.year;
    const params = {
      month: month,
      year: year,
    };
    const url = addQueryParams("/api/transaction", params);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Unknown error happened");
      }
      const transactionData = await response.json();

      return transactionData;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addTransaction = createAsyncThunk(
  "expense/addTransaction",
  async (data, thunkAPI) => {
    const transaction = data;
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
    const params = {
      _id: data._id,
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
    const transaction = data;
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
        state.inTableData = action.payload.inTableData;
        state.outTableData = action.payload.outTableData;
        state.transactions = action.payload.transactions.sort(
          (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
        );
        state.error = null;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.error = action.payload.error;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
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
      })
      .addMatcher(
        isAnyOf(
          addTransaction.pending,
          deleteTransaction.pending,
          editTransaction.pending,
          getTransactions.pending
        ),
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          addTransaction.fulfilled,
          deleteTransaction.fulfilled,
          editTransaction.fulfilled,
          getTransactions.fulfilled
        ),
        (state, action) => {
          state.loading = false;
        }
      );
  },
});

export default expenseSlice.reducer;
