import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatId: "",
  history: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    newMessage: (state, action) => {
      state.history.push(action.payload);
    },
    clearChat: (state) => {
      state.chatId = "";
      state.history = [];
    },
    setChat: (state, action) => {
      state.chatId = action.payload.chatId;
      state.history = action.payload.history;
    },
  },
});

export const { setChat, newMessage, clearChat } = chatSlice.actions;

export default chatSlice.reducer;
