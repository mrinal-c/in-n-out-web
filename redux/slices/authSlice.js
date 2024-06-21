import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { logIn, signUp } from "features/auth/thunks";

const initialState = {
  isLoggedIn: false,
  user: {
    refreshToken: "",
    name: "",
    email: "",
    uid: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(signUp.fulfilled, logIn.fulfilled),
      (state, { payload }) => {
        state.isLoggedIn = true;
        state.user = payload;
      },
    );
  },
});

export default authSlice.reducer;