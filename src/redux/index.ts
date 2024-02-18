import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import messagePopupSlice from "./messagePopupSlice";

export interface I_RootState {
  user: { value: I_User };
}

const store = configureStore({
  reducer: {
    user: userSlice,
    messagePopup: messagePopupSlice.reducer,
  },
});

export default store;
