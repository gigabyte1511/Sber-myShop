import styles from "./styles.module.css"

export function CounterButton (props){

    return(
        <div className={styles.container}>
            <button className={styles.left} onClick = {() => props.decrement()}>-</button>
            <p className={styles.text}>{props.value}</p>
            <button className ={styles.right} onClick = {() => props.increment()}>+</button>
        </div>
    )
}