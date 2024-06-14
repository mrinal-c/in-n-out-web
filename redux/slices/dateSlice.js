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
export const changeYear = createAsyncThunk(
  "date/changeYear",
  async (data, thunkAPI) => {
    const user = data.user;
    const params = {
      year: data.year,
      accessToken: user.accessToken,
    };
    const url = addQueryParams("/api/changeYear", params);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await response.json();
      return data.year.toString();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

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
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeYear.fulfilled, (state, action) => {
        state.year = action.payload;
      })
      .addCase(changeYear.rejected, (state, action) => {
        state.error = action.payload.error;
      });
  },
});

export const { setMonth, setError } = dateSlice.actions;

export default dateSlice.reducer;
