import { useDispatch, useSelector } from "react-redux";
import { cartCounterDecrement, cartCounterIncrement, cartSelect, cartUnselect } from "../../../redux/slices/cartSlices";
import { CounterButton } from "../../Buttons/CounterButton/CounterButton"
import styles from "./styles.module.css"

import { toast } from 'react-toastify';

export function ProductInCart({params}){
    const cart = useSelector((store) => store.cart);
    const [{count, isSelected, actualPrice, stock}] = cart
        .filter((product) => product.id === params._id)

    const dispatch = useDispatch();
    //Увеличить count товара
    const increment = () => {
        if(count < stock){
            dispatch(cartCounterIncrement({id: params._id}));
            return;
        }
        toast(`More items are not available`, { type: "warning"});
    }
    //Уменьшить count товара
    const decrement = () => {
        dispatch(cartCounterDecrement({id: params._id}));
    }
    //Изменение статуса товара
    const radioSelect = () => {
        if(isSelected){
            dispatch(cartUnselect({id: params._id}));
        } else dispatch(cartSelect({id: params._id}));
    }
    return(
        <>
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <input type="radio" checked={isSelected} onClick={radioSelect}></input>
                <img src={params.pictures} alt = "123"></img>
                <div className={styles.propertiesContainer}>
                    <div className={styles.nameContainer}>
                        <p>{params.name}</p>
                    </div>
                    <p> Price for one: {params.price}</p>
                    <p style={{color: "red"}}> Price for one with discount: {actualPrice}</p>
                    <p>Available: {params.stock}pc</p>                    </div>
                </div>
            <div className={styles.priceContainer}>
                <p>{actualPrice * count}</p>
                <CounterButton increment = {increment} decrement = {decrement} value = {count} />
            </div>
        </div>
        <hr className={styles.hr}></hr>
        </>
    )
}