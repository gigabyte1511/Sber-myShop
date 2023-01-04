import { useDispatch, useSelector } from "react-redux";
import { decrementCartAC, incrementCartAC } from "../../../redux/actionCreators/cartAC";
import { CounterButton } from "../../Buttons/CounterButton/CounterButton"
import styles from "./styles.module.css"

export function ProductInCart({params}){
    const cart = useSelector((store) => store.cart);
    console.log('Product in cart',cart);

    const [count] = cart
        .filter((product) => product.id === params._id)
        .map((elem)=> elem.count)
        
    const dispatch = useDispatch();

    const increment = () => {
        dispatch(incrementCartAC({id: params._id}));
    }
    const decrement = () => {
        dispatch(decrementCartAC({id: params._id}));
    }

    return(
        <>
         <div className={styles.container}>
            <div className={styles.infoContainer}>
                <img src={params.pictures} alt = "123"></img>
                <p>{params.name}</p>
            </div>
            <div className={styles.priceContainer}>
                <p>{params.price}</p>
                <CounterButton increment = {increment} decrement = {decrement} value = {count} />
            </div>
        </div>
        <hr className={styles.hr}></hr>
        </>
    )
}