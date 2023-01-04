import { CounterButton } from "../../Buttons/CounterButton/CounterButton"
import styles from "./styles.module.css"

export function ProductInCart({params}){
    // console.log(params)
    return(
        <>
         <div className={styles.container}>
            <div className={styles.infoContainer}>
                <img src={params.pictures} alt = "123"></img>
                <p>{params.name}</p>
            </div>
            <div className={styles.priceContainer}>
                <p>{params.price}</p>
                <CounterButton />
            </div>
        </div>
        <hr className={styles.hr}></hr>
        </>
    )
}