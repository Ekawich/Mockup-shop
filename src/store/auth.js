import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    toggleLogin: false,
    isLoggedIn: false,
    user: null
}

const loginSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        showModal(state) {
            state.toggleLogin = !state.toggleLogin
        },
        setUser(state, action) {
            const userdata = action.payload
            console.log(userdata)
            state.user = userdata
            state.isLoggedIn = true
            state.toggleLogin = false
        },
        userLogout(state) {
            state.isLoggedIn = false
            state.user = null
        }
    }
})

export const authActions = loginSlice.actions

export default loginSlice.reducer