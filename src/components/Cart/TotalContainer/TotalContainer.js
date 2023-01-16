import { useSelector } from "react-redux";
import { UsualButton } from "../../Buttons/UsualButton/UsualButton";
import styles from "./styles.module.css"

export function TotalContainer() {
    const cart = useSelector((store) => store.cart);    
    const totalPrice = cart.reduce((summ, product) => 
        (product.isSelected)? summ + product.actualPrice * product.count: 
            summ , 0);
    return(
        <div className={styles.container}>
            <h1>Total</h1>
            <p>Total price:</p>
            <p>{totalPrice}</p>
            <UsualButton text = "Submit" />
            
        </div>
    );
}
