import styles from "./styles.module.css"
import { SignIn } from "./SignIn/SignIn"
import { DoubleSelector } from "../Buttons/DoubleSelector/DoubleSelector"
import { SignUp } from "./SignUp/SignUp"
import { useState } from "react";

function Sign () {
    const [$modal, setModal] = useState(<SignIn />);
    const openSignInModal = () =>{
        setModal(<SignIn />);
    }
    const openSignUpModal = () =>{
        setModal(<SignUp />);
    }
    return (
        <div className={styles.container}>
            <DoubleSelector className = {styles.selectorContainer} 
            text = {{left:"Autorisation", right:"Registration"}} do = {{left:openSignInModal,right:openSignUpModal}}/>
            {$modal}
        </div>
    )
}
export {
    Sign,
}