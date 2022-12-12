import styles from "./styles.module.css"
function SingInModal () {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <p>Autorisation modal</p>
                <form>
                    <p>Login</p>
                    <input></input>
                    <p>Password</p>
                    <input></input>
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}
export {
    SingInModal,
}