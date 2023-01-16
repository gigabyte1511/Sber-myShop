import { CART_ADD, CART_COUNTER_DECREMENT, CART_COUNTER_INCREMENT, CART_DELETE, CART_SELECT, CART_SELECT_ALL, CART_UNSELECT, CART_UNSELECT_ALL } from "../../types/cartTypes";

export const cartReducer = (state = null, action) => {
    switch(action.type){
    case CART_ADD:
        return [ action.payload, ...state]
    case CART_DELETE:
        return state.filter((elem)=> elem.id !== action.payload.id);
    case CART_COUNTER_INCREMENT:
        return state.map((elem)=> elem.id === action.payload.id && elem.count < elem.stock?  {...elem,
            count: elem.count + 1} : elem);
    case CART_COUNTER_DECREMENT:
        return state
                .map((elem)=> elem.id === action.payload.id && elem.count !== 0? {...elem,
            count: elem.count - 1} : elem)
                .filter((elem)=> elem.count > 0)
    case CART_SELECT:
        return state
                .map((elem)=> elem.id === action.payload.id? {...elem,
            isSelected: true } : elem)
    case CART_UNSELECT:
        return state
                .map((elem)=> elem.id === action.payload.id? {...elem,
            isSelected: false } : elem)
    case CART_SELECT_ALL:
        return state
                .map((elem)=> ({...elem, isSelected: true}))
    case CART_UNSELECT_ALL:
        return state
                .map((elem)=> ({...elem, isSelected: false}))

    default:
        return state;
    }
}
 