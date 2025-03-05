import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isGuest: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isGuest = false;
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.isGuest = false;
    },
    loginAsGuest: (state) => {
      state.isGuest = true;
      state.isAuthenticated = false;
      state.token = "";
    },
  },
});

export const { login, logout, loginAsGuest } = authSlice.actions;

export default authSlice.reducer;
