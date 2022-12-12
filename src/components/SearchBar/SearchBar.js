import styles from "./styles.module.css"
function SearchBar(){
    return(
        <input type="textfield" className={styles.input} placeholder = "Search..."></input>
    )
}
export {
    SearchBar,
}