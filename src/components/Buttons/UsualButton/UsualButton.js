import styles from "./styles.module.css"

function UsualButton(props){
    return(
        <button className={styles.button} onClick = { () => {props.do()} }>{props.text}</button>
    )
}
export {
    UsualButton,
}