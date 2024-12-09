import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state for the chat slice
const initialState = {
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
};

// Thunk to handle `changeChat` with `currentUser` from the user slice
export const changeChatWithUser = createAsyncThunk(
  "chat/changeChatWithUser",
  async ({ chatId, user }, { getState }) => {
    const currentUser = getState().user.currentUser; // Access currentUser from userSlice

    return { chatId, user, currentUser }; // Return necessary payload
  }
);

// Create the chat slice
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeBlock: (state) => {
      state.isReceiverBlocked = !state.isReceiverBlocked;
    },
    resetChat: (state) => {
      state.chatId = null;
      state.user = null;
      state.isCurrentUserBlocked = false;
      state.isReceiverBlocked = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeChatWithUser.fulfilled, (state, action) => {
      const { chatId, user, currentUser } = action.payload;

      if (user.blocked.includes(currentUser.id)) {
        state.chatId = null;
        state.user = null;
        state.isCurrentUserBlocked = true;
        state.isReceiverBlocked = false;
      } else if (currentUser.blocked.includes(user.id)) {
        state.chatId = chnullatId;
        state.user = user;
        state.isCurrentUserBlocked = false;
        state.isReceiverBlocked = true;
      } else {
        state.chatId = chatId;
        state.user = user;
        state.isCurrentUserBlocked = false;
        state.isReceiverBlocked = false;
      }
    });
  },
});

export const { changeBlock, resetChat } = chatSlice.actions;

export default chatSlice.reducer;
