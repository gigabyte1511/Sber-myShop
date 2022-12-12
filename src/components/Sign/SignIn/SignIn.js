import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../../API/serverApi";
import { UsualButton } from "../../Buttons/UsualButton/UsualButton";
import styles from "./styles.module.css"

function SignIn () {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    //Попытка выполнить авторизацию
    const trySingIn = () =>{
        const params = {
            email: document.getElementById("login").value,
            password: document.getElementById("password").value
            
        }
        const api = new Api(params);
        api.signIn(params)
        .then((response) => {
              console.log(response);
              navigate("/main");
        })
        .catch((e) => {
            setError(e.message);
        })
    }

    return (
            <div className={styles.container}>
                        <h3 className = {styles.header}>Autorisation</h3>
                        <input id="login" placeholder = "Email"></input>
                        <input id="password"placeholder = "Password"></input>
                        <UsualButton text = "Send" do = { trySingIn }/>
                        <p className={styles.errorMessage}>{error}</p>

            </div>   
    )
}
export {
    SignIn,
}