import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        return serializedState ? JSON.parse(serializedState) : [];
    } catch (e) {
        return [];
    }
};

const initialState = {
    items: loadCart(),
    toastMessage: null, // Using this to trigger toasts from actions
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
                state.toastMessage = `Updated quantity for ${product.title}`;
            } else {
                state.items.push({ ...product, quantity: 1 });
                state.toastMessage = `Added ${product.title} to cart`;
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            state.toastMessage = 'Item removed from cart';
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            if (quantity < 1) return;
            const item = state.items.find((item) => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.setItem('cart', JSON.stringify([]));
        },
        clearToast: (state) => {
            state.toastMessage = null;
        }
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, clearToast } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
export const selectCartTotal = (state) => state.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
export const selectToastMessage = (state) => state.cart.toastMessage;

export default cartSlice.reducer;
