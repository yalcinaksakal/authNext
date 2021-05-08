import { createSlice } from "@reduxjs/toolkit";
import { calculateRemainingTime, retriveStoredToken } from "../lib/helper";

const initialState = { isLoggedIn: false, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { token, expirationTime } = action.payload;
      state.token = token;
      state.isLoggedIn = true;
      localStorage.setItem(
        "token",
        JSON.stringify({
          token,
          expirationTime,
        })
      );
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

// if (typeof window !== "undefined") console.log("we are running on the client");

export const authActions = authSlice.actions;

export default authSlice.reducer;
