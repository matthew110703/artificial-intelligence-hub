import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {},
  showModal: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
  },
});

export const { setAccount, toggleModal } = accountSlice.actions;

export default accountSlice.reducer;
