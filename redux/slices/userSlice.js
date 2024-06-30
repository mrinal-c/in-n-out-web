import { createSlice, isAnyOf, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {
    refreshToken: "",
    name: "",
    email: "",
    uid: "",
  },
};

export const login = createAsyncThunk("user/login", async (data) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  return responseData;
});

export const signup = createAsyncThunk("user/signup", async (data) => {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  return responseData;
});

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addMatcher(isAnyOf(login.rejected, login.pending), (state, action) => {
        state.isLoggedIn = false;
      })
      .addMatcher(isAnyOf(signup.rejected, signup.pending), (state, action) => {
        state.isLoggedIn = false;
      });
  },
});

export default userSlice.reducer;