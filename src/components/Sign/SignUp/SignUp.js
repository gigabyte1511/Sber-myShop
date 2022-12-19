import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../API/query";
import { UsualButton } from "../../Buttons/UsualButton/UsualButton";
import styles from "./styles.module.css"

const SINGUP_QUERY_KEY = "SINGUP_QUERY_KEY";

function SignUp () {
    const navigate = useNavigate();

    const {isSuccess, isError, mutate, data, error} = useMutation({
        queryKey: [SINGUP_QUERY_KEY], 
        mutationFn: signUp,
    })

    const trySingUp = () =>{
        mutate({
            email: document.getElementById("login").value,
            password: document.getElementById("password").value,
            group: document.getElementById("group").value
          })
    }

    if(isSuccess){
        localStorage.setItem("token", data.token);
        navigate("/main");
    }
    if(isError){
        return (
            <div className={styles.container}>
                        <h3 className={styles.header}>Registration</h3>
                        <input id="login" placeholder="Email"></input>
                        <input id="password" placeholder="Password"></input>
                        <input id="group" placeholder="Group"></input>
                        <UsualButton text = "Send" do = { trySingUp } />
                        <p className={styles.errorMessage}>{error.message}</p>
            </div>   
    )
    }

    
    return (
            <div className={styles.container}>
                        <h3 className={styles.header}>Registration</h3>
                        <input id="login" placeholder="Email"></input>
                        <input id="password" placeholder="Password"></input>
                        <input id="group" placeholder="Group"></input>
                        <UsualButton text = "Send" do = { trySingUp } />
            </div>   
    )
}
export {
    SignUp,
}