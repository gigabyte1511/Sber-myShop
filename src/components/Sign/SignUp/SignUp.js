import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../../API/serverApi";
import { UsualButton } from "../../Buttons/UsualButton/UsualButton";
import styles from "./styles.module.css"

function SignUp () {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    //Попытка выполнить регистрацию
    const trySingUp = () =>{
        const params = {
            email: document.getElementById("login").value,
            password: document.getElementById("password").value,
            group: document.getElementById("group").value
            
        }
        const api = new Api(params);
        api.signUp(params)
        .then((response) => {
            //Попытка выполнить авторизацию
            const api2 = new Api(params);
            api2.signIn(params)
            .then((response) => {
                  navigate("/main");
            })
            .catch((e) => {
                setError(e.message);
            })
        })
        .catch((e) => {
            setError(e.message);
        })
    }

    return (
            <div className={styles.container}>
                        <h3 className={styles.header}>Registration</h3>
                        <input id="login" placeholder="Email"></input>
                        <input id="password" placeholder="Password"></input>
                        <input id="group" placeholder="Group"></input>
                        <UsualButton text = "Send" do = { trySingUp } />
                        <p className={styles.errorMessage}>{error}</p>
            </div>   
    )
}
export {
    SignUp,
}