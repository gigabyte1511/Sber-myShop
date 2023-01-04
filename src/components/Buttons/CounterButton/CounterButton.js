import styles from "./styles.module.css"

export function CounterButton (){
    return(
        <div className={styles.container}>
            <button className={styles.left}>-</button>
            <p className={styles.text}>1</p>
            <button className ={styles.right}>+</button>
        </div>
    )
}