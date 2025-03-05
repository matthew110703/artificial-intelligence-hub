import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from "./authSlice";
import toastReducer from "./toastSlice";
import chatReducer from "./chatSlice";
import accountReducer from "./accountSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    chat: chatReducer,
    account: accountReducer,
  },
});

export default store;
