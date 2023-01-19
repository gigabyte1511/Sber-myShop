import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './slices/cartSlices';
import { favouriteReducer } from './slices/favouriteSlices';
import { searchReducer } from './slices/searchSlices';
import { userReducer } from './slices/userSlices';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        favourite: favouriteReducer,
        search: searchReducer,
        user: userReducer,
    }
})
store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()));
  });
