import logo from "./img/logo.svg"
import styles from "./styles.module.css"
function Logo(){
    return(
        <div>
            <div className={styles.logoContainer}>
                <img src={logo} alt=""></img>
                <h1>MyShop</h1>
            </div>

        </div>
    )
}
export {
    Logo,
}