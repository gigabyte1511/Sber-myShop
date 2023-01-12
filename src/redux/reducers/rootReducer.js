import { cartReducer } from './cartReducer/cartReducer';
import { combineReducers } from 'redux'
import { searchReducer } from './searchReducer/searchReducer';
import { userReducer } from './userReducer/userReducer';

  export const rootReducer = combineReducers({
    //user: userReducer,
    cart: cartReducer,
    search: searchReducer,
    user: userReducer,
  });