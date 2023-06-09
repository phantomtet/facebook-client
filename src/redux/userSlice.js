import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: null
    },
    reducers: {
        storeUser: (state, action) => {
            state.value = action.payload
        },
        clearUser: () => {
            state.value = null
            localStorage.removeItem('token')
        }
    }
})
export const ReduxUserActions = userSlice.actions
export default userSlice.reducer