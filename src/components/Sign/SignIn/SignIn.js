import { useMutation} from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn} from "../../../API/query";
import { setToken, setUserGroup, setUserID } from "../../../redux/slices/userSlices";
import { UsualButton } from "../../Buttons/UsualButton/UsualButton";
import styles from "./styles.module.css"

import { toast } from 'react-toastify';
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';

const SINGIN_QUERY_KEY = "SINGIN_QUERY_KEY";

function SignIn () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const {mutate, data, error, isSuccess} = useMutation({
        queryKey: [SINGIN_QUERY_KEY], 
        mutationFn: signIn,
        onSuccess: (data)=> {
            toast(`Success sing in`, { type: "success"});
            dispatch(setToken(data.token));
            dispatch(setUserGroup(data.data.group));
            dispatch(setUserID(data.data._id));
            navigate("/main");
        },
        onError: (error)=> toast(`${error.message}`, { type: "error"})
        
    })  
    const trySingIn = (values) =>{
        console.log(values)
        mutate({
            email: values.login,
            password: values.password,
        })
    }
    return (
            <div className={styles.container}>
                <h3 className = {styles.header}>Autorisation</h3>
                <Formik 
                initialValues={{
                    login: "",
                    password: "",
                }}
                validationSchema={Yup.object({
                    login: Yup
                        .string()
                        .email('Not valid email')
                        .required('Required to fill!'),
                    password: Yup.string()
                        .required('Required to fill!')
                        .min(5),   
                })}
                onSubmit={(values) => {
                    trySingIn(values);
                }}
            >   
                {({ errors, touched }) => (
                 <Form className={styles.form}>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="login">Login</label>
                        <Field id="login" name="login" placeholder="user@mail.com"/>
                        {errors.login && touched.login ? (
                            <div className={styles.formErrorContainer}>{errors.login}</div>
                        ) : null}
                    </div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="password">Password</label>
                        <Field id="password" name="password" placeholder="password" type="password" />
                        {errors.password && touched.password ? (
                            <div className={styles.formErrorContainer}>{errors.password}</div>
                        ) : null}
                    </div>
                    <UsualButton type="submit" text="Sing in"/>
                </Form>
                )}
            </Formik>
            </div>   
    )
}
export {
    SignIn,
}