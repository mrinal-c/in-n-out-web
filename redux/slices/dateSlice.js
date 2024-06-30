import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addQueryParams } from "../utils";

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

const initialState = {
  month: months[new Date().getMonth()],
  year: new Date().getFullYear().toString(),
  error: null,
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setMonth: (state, action) => {
      state.month = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  }
});

export const { setMonth, setError, setYear } = dateSlice.actions;

export default dateSlice.reducer;
