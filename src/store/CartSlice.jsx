import { createSlice } from '@reduxjs/toolkit'

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    // Adds a plant to the cart; if it already exists, increments its quantity
    addItem: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },

    // Removes a plant from the cart entirely by its id
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },

    // Updates the quantity of a plant in the cart
    // Payload: { id, quantity }  — set quantity to 0 to remove the item
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.id !== id)
        } else {
          item.quantity = quantity
        }
      }
    },
  },
})

export const { addItem, removeItem, updateQuantity } = CartSlice.actions

export const selectCartItems  = state => state.cart.items
export const selectTotalItems = state =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
export const selectTotalCost  = state =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export default CartSlice.reducer
