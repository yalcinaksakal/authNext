import { createSlice } from "@reduxjs/toolkit";
import { calculateRemainingTime, retriveStoredToken } from "../lib/helper";

const initialState = {
  isLoggedIn: false,
  token: null,
  remainingTime: 0,
  userName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { token, expirationTime, userName } = action.payload;
      state.token = token;
      state.isLoggedIn = true;
      state.userName = userName;
      state.remainingTime = Math.trunc(
        calculateRemainingTime(expirationTime) / 1000
      );

      localStorage.setItem(
        "token",
        JSON.stringify({
          token,
          expirationTime,
          userName,
        })
      );
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.remainingTime = 0;
      state.userName = null;
      localStorage.removeItem("token");
    },
    remainingTimeHandler(state) {
      state.remainingTime--;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
