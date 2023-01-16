import styles from "./styles.module.css"

function UsualButton(props){
    //console.log(props)
    return(
        <button className={styles.button} style= {props.style} onClick = { () => props.do() }>{props.text}</button>
    )
}
export {
    UsualButton,
}