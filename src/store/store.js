import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart'
import searchReducer from './search'
import authReducer from './auth'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        search: searchReducer,
        auth: authReducer
    }
})


export default store