import { cartReducer } from './cartReducer/cartReducer';
import { combineReducers } from 'redux'

  export const rootReducer = combineReducers({
    //user: userReducer,
    cart: cartReducer,
  });