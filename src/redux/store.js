import { createStore } from 'redux'
import { rootReducer } from './reducers/rootReducer';


let initialState = {
    cart: [],
    search: "",
    user:{
        group: "",
        token: "",
    } 
};
if(localStorage.getItem("cart") !== null) {
    initialState.cart = JSON.parse(localStorage.getItem("cart"));
}
if(localStorage.getItem("token") !== null) {
    initialState.user.token = localStorage.getItem("token");
}
if(localStorage.getItem("group") !== null) {
    initialState.user.group = localStorage.getItem("group");
}

export const store = createStore(rootReducer, initialState);

store.subscribe(() => {
    localStorage.setItem('cart', JSON.stringify(store.getState().cart));
  });
