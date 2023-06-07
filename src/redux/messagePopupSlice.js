import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: [],
    inactive: []
}

const messagePopupSlice = createSlice({
    name: 'messagePopup',
    initialState: initialState,
    reducers: {
        openPopup: (state, action) => {
            let selectedItem = state.inactive.find(i => i._id == action.payload)
            state.inactive = state.inactive.filter(i => i._id !== action.payload)
            state.active.push(selectedItem)
        },
        closePopup: (state, action) => {
            let selectedItem = state.active.find(i => i._id == action.payload)
            state.active = state.active.filter(i => i._id !== action.payload)
            state.inactive.push(selectedItem)
        },
        createPopup: (state, action) => {
            let newItem = action.payload
            if (state.active.find(i => i._id == newItem._id)) return
            else if (state.inactive.find(i => i._id == newItem._id)) {
                state.inactive = state.inactive.filter(i => i._id !== newItem._id)
            }
            state.active.push(newItem)
        },
        removePopup: (state, action) => {
            state.active = state.active.filter(i => i._id !== action.payload)
            state.inactive = state.inactive.filter(i => i._id !== action.payload)
        }
    }
})
// export const actions = messagePopupSlice.actions
export default messagePopupSlice