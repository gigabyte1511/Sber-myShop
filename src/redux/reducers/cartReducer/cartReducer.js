import { CART_ADD, CART_COUNTER_DECREMENT, CART_COUNTER_INCREMENT, CART_DELETE } from "../../types/cartTypes";

export const cartReducer = (state = null, action) => {
    switch(action.type){
    case CART_ADD:
        return [ action.payload, ...state]
    case CART_DELETE:
        return state.filter((elem)=> elem.id !== action.payload.id);
    case CART_COUNTER_INCREMENT:
        return state.map((elem)=> elem.id === action.payload.id? {...elem,
            count: elem.count + 1} : elem);
    case CART_COUNTER_DECREMENT:
        return state.map((elem)=> elem.id === action.payload.id? {...elem,
            count: elem.count - 1} : elem);

    default:
        return state;
    }
}
 