import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../API/query";
import { setToken, setUserGroup, setUserID } from "../../../redux/slices/userSlices";
import { UsualButton } from "../../Buttons/UsualButton/UsualButton";
import styles from "./styles.module.css"

import { toast } from 'react-toastify';
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';


const SINGUP_QUERY_KEY = "SINGUP_QUERY_KEY";

function SignUp () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {isError, mutate, data, error} = useMutation({
        queryKey: [SINGUP_QUERY_KEY], 
        mutationFn: signUp,
        onSuccess: (data) => {  
            toast(`Success sing in`, { type: "success"});
            dispatch(setToken(data.token));
            dispatch(setUserGroup(data.data.group));
            dispatch(setUserID(data.data._id));
            navigate("/main");
        },
        onError: (error) => {
            toast(`${error.message}`, { type: "error"});  
        }
    })

    const trySingUp = (values) =>{
        mutate({
            email: values.login,
            password: values.password,
            group: values.group
          })
    }
  
    return (
            <div className={styles.container}>
                <h3 className={styles.header}>Registration</h3>
                <Formik 
                initialValues={{
                    login: "",
                    password: "",
                    group: "",
                }}
                validationSchema={Yup.object({
                    login: Yup
                        .string()
                        .email('Not valid email')
                        .required('Required to fill!'),
                    password: Yup.string()
                        .required('Required to fill!')
                        .min(5),   
                    group: Yup.string()
                        .required('Required to fill!')   
                })}
                onSubmit={(values) => {
                    trySingUp(values);
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
                    <div className={styles.fieldContainer}>
                        <label htmlFor="group">Group</label>
                        <Field id="group" name="group" placeholder="group" type="group" />
                        {errors.group && touched.group ? (
                            <div className={styles.formErrorContainer}>{errors.group}</div>
                        ) : null}
                    </div>
                    <UsualButton type="submit" text="Sing up"/>
                </Form>
                )}
            </Formik>
            </div>   
    )
}
export {
    SignUp,
}