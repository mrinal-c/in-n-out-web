import { createSlice, isAnyOf, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {
    refreshToken: "",
    name: "",
    email: "",
    uid: "",
  },
  error: null,
};

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return responseData;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const signup = createAsyncThunk(
  "user/signup",
  async (data, thunkAPI) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      return responseData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (data, thunkAPI) => {
    try {
      const response = await fetch("/api/logout");

      if (!response.ok) {
        throw new Error("Error while logging out");
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateUserOutTable = createAsyncThunk(
  "user/updateOutTable",
  async (data, thunkAPI) => {
    try {
      const response = await fetch("/api/user/outTable", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({outTable: data}),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      return responseData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clearError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state, action) => {
        console.log("isLoggedIn is false from logout")
        state.isLoggedIn = false;
        state.user = {};
        state.error = null;
      })
      .addCase(updateUserOutTable.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(login.rejected, signup.rejected), (state, action) => {
        console.log("login/signup rejected so no logged in")
        state.isLoggedIn = false;
        state.user = {};
        state.error = action.error.message;
      })
      .addMatcher(
        isAnyOf(login.fulfilled, signup.fulfilled),
        (state, action) => {
          state.isLoggedIn = true;
          state.user = action.payload;
          state.error = null;
        }
      );
  },
});
export const { clearError } = userSlice.actions;
export default userSlice.reducer;
