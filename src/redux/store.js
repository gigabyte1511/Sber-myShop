import { createStore } from 'redux'
import { rootReducer } from './reducers/rootReducer';

const initialState = {
    cart: []
}
export const store = createStore(rootReducer, initialState);
