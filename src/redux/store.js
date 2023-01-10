import { createStore } from 'redux'
import { rootReducer } from './reducers/rootReducer';


let initialState = {
    cart: [],
    search: "", 
    token: "",
};
if(localStorage.getItem("cart") !== null) {
    initialState.cart = JSON.parse(localStorage.getItem("cart"));
}
if(localStorage.getItem("token") !== null) {
    initialState.token = localStorage.getItem("token");
}

export const store = createStore(rootReducer, initialState);

store.subscribe(() => {
    localStorage.setItem('cart', JSON.stringify(store.getState().cart));
  });
