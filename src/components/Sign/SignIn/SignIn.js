import { useMutation} from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn} from "../../../API/query";
import { setToken, setUserGroup, setUserID } from "../../../redux/slices/userSlices";
import { UsualButton } from "../../Buttons/UsualButton/UsualButton";
import styles from "./styles.module.css"

import { toast } from 'react-toastify';

const SINGIN_QUERY_KEY = "SINGIN_QUERY_KEY";

function SignIn () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
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
        dispatch(setToken(data.token));
        dispatch(setUserGroup(data.data.group));
        dispatch(setUserID(data.data._id));
        toast(`Success sing in`, { type: "success"});
        navigate("/main");
    }

    if(isError){
        console.log("Error", error.message);
        toast(`${error.message}`, { type: "error"});
        return(
            <div className={styles.container}>
                <h3 className = {styles.header}>Autorisation</h3>
                <input id="login" placeholder = "Email"></input>
                <input id="password" placeholder = "Password" type='password' ></input>
                <UsualButton text = "Send" do = { trySingIn }/>
                <p className={styles.errorMessage}>{error.message}</p>
            </div> 
        )
    }

    return (
            <div className={styles.container}>
                <h3 className = {styles.header}>Autorisation</h3>
                <input id="login" placeholder = "Email"></input>
                <input id="password"placeholder = "Password" type='password'></input>
                <UsualButton text = "Send" do = { trySingIn }/>
            </div>   
    )
}
export {
    SignIn,
}