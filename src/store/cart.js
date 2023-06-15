import { createSlice } from '@reduxjs/toolkit'

const initialCartState = {
    items: [],
    totalPrice: 0,
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
                existingItem.quantity += newItem.quantity
            } else {
                state.items.push(newItem)
            }

            state.totalPrice += (newItem.price - newItem.discount) * newItem.quantity
        },
        removeItem(state, action) {
            const itemId = action.payload
            const existingItemIndex = state.items.findIndex(item => item.id === itemId)

            if (existingItemIndex !== -1) {
                const existingItem = state.items[existingItemIndex]
                state.totalPrice -= (existingItem.price - existingItem.discount) * existingItem.quantity
                state.items.splice(existingItemIndex, 1)
            }
        },
        toggleCart(state) {
            state.toggleCart = !state.toggleCart
        },
        updateQuantity(state, action) {
            const { itemId, newQuantity } = action.payload
            const itemToUpdate = state.items.find(item => item.id === itemId)

            if (itemToUpdate && newQuantity > 0) {
                const quantityDiff = newQuantity - itemToUpdate.quantity;
                itemToUpdate.quantity = newQuantity
                state.totalPrice += ((itemToUpdate.price - itemToUpdate.discount) * quantityDiff)
            }
        },
        loadCart(state, action) {
            console.log(action.payload)
            const { items, totalPrice, toggleCart } = action.payload
            // state.totalPrice = totalPrice
            // state.toggleCart = toggleCart
        }
    }
})

export const cartActions = addCartSlice.actions;

export default addCartSlice.reducer