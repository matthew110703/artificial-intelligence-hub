import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "default",
  message: "",
  flag: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.flag = !state.flag;
    },
  },
});

export const { showToast } = toastSlice.actions;

export default toastSlice.reducer;
