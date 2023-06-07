import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import messagePopupSlice from "./messagePopupSlice"

const store = configureStore({
    reducer: {
        user: userSlice,
        messagePopup: messagePopupSlice.reducer,
    }
})

export default store