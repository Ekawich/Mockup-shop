import { createSlice } from "@reduxjs/toolkit";

const initailSearchState = {
    value: ""
}

const searchSlice = createSlice({
    name: "search",
    initialState: initailSearchState,
    reducers: {
        searchValue(state, action) {
            let text = action.payload
            state.value = text
        }
    }
})

export const searchActions = searchSlice.actions;

export default searchSlice.reducer