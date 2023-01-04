import { CART_ADD, CART_DELETE } from "../../types/cartTypes";

export const cartReducer = (state = null, action) => {
    switch(action.type){
    case CART_ADD:
        return [ action.payload, ...state]
    case CART_DELETE:
        return state.filter((elem)=> elem !== action.payload);

    default:
        return state;
    }
}
 