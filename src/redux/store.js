import { createStore } from 'redux'
import { rootReducer } from './reducers/rootReducer';


let initialState = {
    cart: [],
    search: "", 
};
if(localStorage.getItem("cart") !== null) {
    initialState.cart = JSON.parse(localStorage.getItem("cart"));
}


export const store = createStore(rootReducer, initialState);

store.subscribe(() => {
    localStorage.setItem('cart', JSON.stringify(store.getState().cart));
  });
