import { CART_ADD, CART_COUNTER_DECREMENT, CART_COUNTER_INCREMENT, CART_DELETE } from "../types/cartTypes"

export const addToCartAC = ({id, count}) => ({
    type: CART_ADD,
    payload: {
        id,
        count,
    }
})

export const deleteFromCartAC = ({id}) => ({
    type: CART_DELETE,
    payload: {
        id
    }
})

export const incrementCartAC = ({id}) => ({
    type: CART_COUNTER_INCREMENT,
    payload: {
        id
    }
})

export const decrementCartAC = ({id}) => ({
    type: CART_COUNTER_DECREMENT,
    payload: {
        id
    }
})