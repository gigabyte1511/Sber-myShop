import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './slices/cartSlices';
import { searchReducer } from './slices/searchSlices';
import { userReducer } from './slices/userSlices';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        search: searchReducer,
        user: userReducer,
    }
})
store.subscribe(() => {
    localStorage.setItem('cart', JSON.stringify(store.getState().cart));
  });
