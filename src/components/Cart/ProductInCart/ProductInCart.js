import { useDispatch, useSelector } from "react-redux";
import { decrementCartAC, incrementCartAC, selectCartAC, unselectCartAC } from "../../../redux/actionCreators/cartAC";
import { CounterButton } from "../../Buttons/CounterButton/CounterButton"
import styles from "./styles.module.css"

export function ProductInCart({params}){
    const cart = useSelector((store) => store.cart);
    const [{count, isSelected}] = cart
        .filter((product) => product.id === params._id)

    const dispatch = useDispatch();

    const increment = () => {
        dispatch(incrementCartAC({id: params._id}));
    }
    const decrement = () => {
        dispatch(decrementCartAC({id: params._id}));
    }
    const radioSelect = () => {
        if(isSelected){
            dispatch(unselectCartAC({id: params._id}));
        } else dispatch(selectCartAC({id: params._id}));
    }
    let actualPrice = params.price;
    if (params.discount !== 0){
        actualPrice = params.price - params.price * (params.discount / 100);
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