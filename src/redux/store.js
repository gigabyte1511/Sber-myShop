import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './slices/cartSlices';
import { favouriteReducer } from './slices/favouriteSlices';
import { searchReducer } from './slices/searchSlices';
import { sortReducer } from './slices/sortSlices';
import { userReducer } from './slices/userSlices';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        favourite: favouriteReducer,
        search: searchReducer,
        sort: sortReducer,
        user: userReducer,
    }
})
store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()));
    var searchParams = new URLSearchParams(window.location.search)
    searchParams.set("search", store.getState().search);
    searchParams.set("sort", store.getState().sort);
    var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    window.history.pushState(null, '', newRelativePathQuery);
  });

  
