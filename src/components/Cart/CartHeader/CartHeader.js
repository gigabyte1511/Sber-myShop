import { useDispatch, useSelector } from "react-redux";
import { cartSelectAll, cartUnseceletectAll } from "../../../redux/slices/cartSlices";

import styles from "./styles.module.css"

export function CartHeader(){
    const cart = useSelector((store) => store.cart);

    const dispatch = useDispatch();
    const unselectAll = () => {
        dispatch(cartUnseceletectAll());
    }
    const selectAll = () => {
        dispatch(cartSelectAll());
    }
    
    //Вариации радиокнопки "Select All"
    let $radioSelect;
    if(cart
        .filter((product) => product.isSelected === false)
        .length === 0){
            $radioSelect = <label onClick={unselectAll}><input type = "radio" checked={true}></input> Select all</label>
        } else $radioSelect = <label onClick={selectAll}><input type = "radio" checked={false}></input> Select all</label>
    
    return(
        <div className={styles.container}>
            <h1>Cart</h1>
            {$radioSelect}
        </div>
)
}
