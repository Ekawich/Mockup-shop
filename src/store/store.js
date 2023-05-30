import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart'
import searchReducer from './search'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        search: searchReducer
    }
})


export default store