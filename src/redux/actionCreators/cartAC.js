import { CART_ADD, CART_COUNTER_DECREMENT, CART_COUNTER_INCREMENT, CART_DELETE, CART_SELECT, CART_SELECT_ALL, CART_UNSELECT, CART_UNSELECT_ALL } from "../types/cartTypes"

export const addToCartAC = ({id, count, price, actualPrice, stock}) => ({
    type: CART_ADD,
    payload: {
        id,
        count,
        price,
        actualPrice,
        stock,
        isSelected: true
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

export const selectCartAC = ({id}) => ({
    type: CART_SELECT,
    payload: {
        id
    }
})

export const unselectCartAC = ({id}) => ({
    type: CART_UNSELECT,
    payload: {
        id
    }
})

export const selectAllCartAC = () => ({
    type: CART_SELECT_ALL,
})

export const unselectAllCartAC = () => ({
    type: CART_UNSELECT_ALL,
})