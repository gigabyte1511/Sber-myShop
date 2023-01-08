import { createStore } from 'redux'
import { rootReducer } from './reducers/rootReducer';

// const initialState = {
//     cart: []
// }

// let initialState;
// if(localStorage.getItem("cart") !== null) {
//     initialState = JSON.parse(localStorage.getItem("cart"));
// } else initialState.cart = [];
let initialValues;
if(localStorage.getItem("cart")!== null) initialValues = JSON.parse(localStorage.getItem("cart"));
else initialValues = [];

const initialState = {
    cart: initialValues,
}

export const store = createStore(rootReducer, initialState);

store.subscribe(() => {
    localStorage.setItem('cart', JSON.stringify(store.getState().cart));
  });
