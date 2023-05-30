import { createSlice } from '@reduxjs/toolkit'

const initialCartState = {
    items: [],
    totalAmount: 0,
    toggleCart: false
}

const addCartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addItems(state, action) {
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id)

            if (existingItem) {
                existingItem.quantity += parseInt(newItem.quantity)
                state.totalAmount += parseFloat(newItem.price - newItem.discount).toFixed(2) * parseInt(newItem.quantity);
            } else {
                state.items.push(newItem)
                state.totalAmount += parseFloat(newItem.price - newItem.discount).toFixed(2) * parseInt(newItem.quantity)
            }
        },
        removeItem(state, action) {
            const itemId = action.payload
            const updatedItems = state.items.filter(item => item.id !== itemId);
            const removedItem = state.items.find(item => item.id === itemId);
            if (removedItem) {
                state.totalAmount -= parseFloat(removedItem.price - removedItem.discount).toFixed(2) * parseInt(removedItem.quantity)
            }
            state.items = updatedItems;
        },
        toggleCart(state) {
            state.toggleCart = !state.toggleCart
        }

    }
})

export const cartActions = addCartSlice.actions;

export default addCartSlice.reducer