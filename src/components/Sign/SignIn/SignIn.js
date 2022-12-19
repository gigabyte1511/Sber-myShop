import { useMutation} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signIn} from "../../../API/query";
// import Api from "../../../API/serverApi";
import { UsualButton } from "../../Buttons/UsualButton/UsualButton";
import styles from "./styles.module.css"

const SINGIN_QUERY_KEY = "SINGIN_QUERY_KEY";

function SignIn () {
    const navigate = useNavigate();
    
    const {isSuccess, isError, mutate, data, error} = useMutation({
        queryKey: [SINGIN_QUERY_KEY], 
        mutationFn: signIn,
    })
    const trySingIn = () =>{
        mutate({
            email: document.getElementById("login").value,
            password: document.getElementById("password").value,
        })
    }

    if(isSuccess){
        console.log("Success");
        console.log(data)
        localStorage.setItem("token", data.token);
        navigate("/main");
    }

    if(isError){
        console.log("Error");
        console.log(error.message);
        return(
            <div className={styles.container}>
                <h3 className = {styles.header}>Autorisation</h3>
                <input id="login" placeholder = "Email"></input>
                <input id="password"placeholder = "Password"></input>
                <UsualButton text = "Send" do = { trySingIn }/>
                <p className={styles.errorMessage}>{error.message}</p>
            </div> 
        )
    }

    return (
            <div className={styles.container}>
                <h3 className = {styles.header}>Autorisation</h3>
                <input id="login" placeholder = "Email"></input>
                <input id="password"placeholder = "Password"></input>
                <UsualButton text = "Send" do = { trySingIn }/>
            </div>   
    )
}
export {
    SignIn,
}