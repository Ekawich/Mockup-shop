import { createSlice } from '@reduxjs/toolkit'

const initialCounterState = {
    items: [],
    totalAmount: 0,
    toggleCart: false
}

const addCartSlice = createSlice({
    name: "cart",
    initialState: initialCounterState,
    reducers: {
        addItems(state, action) {
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id)

            if (existingItem) {
                existingItem.quantity += newItem.quantity
                state.totalAmount += parseFloat(newItem.price).toFixed(2) * newItem.quantity;
            } else {
                state.items.push(newItem)
                state.totalAmount += parseFloat(newItem.price).toFixed(2) * newItem.quantity
            }
        },
        removeItem(state, action) { },
        toggleCart(state) {
            state.toggleCart = !state.toggleCart
            console.log(state.toggleCart)
        }
    }
})

export const cartActions = addCartSlice.actions;

export default addCartSlice.reducer