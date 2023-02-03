import { useSelector } from "react-redux";
import { UsualButton } from "../../Buttons/UsualButton/UsualButton";
import styles from "./styles.module.css"

export function TotalContainer() {
    const cart = useSelector((store) => store.cart);    
    const price = cart.reduce((summ, product) => 
        (product.isSelected)? summ + product.actualPrice * product.count: 
            summ , 0);
    const discount = cart.reduce((discount, product) =>
            (product.isSelected)? discount + (product.price - product.actualPrice) * product.count: 
            discount , 0);
    const actualPrice = price - discount;
    return(
        <div className={styles.container}>
            <h1>Total</h1>
            <p>Price:</p>
            <p>{price}</p>
            <p className={styles.discount}>Discount:</p>
            <p className={styles.discount}>{discount}</p>
            <p className={styles.total}>Total price:</p>
            <p className={styles.total}>{actualPrice}</p>
            <UsualButton text = "Submit" />
            
        </div>
    );
}
