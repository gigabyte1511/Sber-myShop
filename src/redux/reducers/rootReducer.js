import { cartReducer } from './cartReducer/cartReducer';
import { combineReducers } from 'redux'
import { searchReducer } from './searchReducer/searchReducer';

  export const rootReducer = combineReducers({
    //user: userReducer,
    cart: cartReducer,
    search: searchReducer,
  });