import { CART_ADD } from "../types/cartTypes"

export const addToCartAC = ({id, count}) => ({
    type: CART_ADD,
    payload: {
        id,
        count,
    }
})