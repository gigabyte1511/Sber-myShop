import styles from "./styles.module.css"

function DoubleSelector(props){
    return(
        <div>
            <button className={styles.buttonLeft} 
            onClick = {()=>{props.do.left()}} >{props.text.left}</button>
            <button className={styles.buttonRight} 
            onClick = {()=>{props.do.right()}}>{props.text.right}</button>
        </div>
    )
}
export {
    DoubleSelector,
}