import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
});
export default appStore;
