import styles from './styles.module.css';
import { Formik, Field, Form } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { editUserInfo } from '../../../API/query';
import Loader from '../../Loader/Loader';
import { UsualButton } from '../../Buttons/UsualButton/UsualButton';
import { GET_USERINFO_QUERY_KEY } from '../UserInfo';

export const EDIT_USER_PARAMS_QUERY_KEY = "EDIT_USER_PARAMS_QUERY_KEY";

export function EditInfo(){
    const {state:params} = useLocation();
    const queryClient = useQueryClient()

    const { token, group } = useSelector((store) => store.user);
    const navigate = useNavigate()

    const {isSuccess, isLoading,isError, mutate, data, error} = useMutation({
        queryKey: [EDIT_USER_PARAMS_QUERY_KEY], 
        mutationFn: editUserInfo,
    })
    const tryEdit = (values) =>{
        console.log(values,group,token)
        mutate([values, token, group]);
    }
    if(isLoading) return <Loader />
    if(isSuccess) {
        toast(`Success edit user info.`, { type: "success"});
        queryClient.invalidateQueries({ queryKey: [GET_USERINFO_QUERY_KEY] })
        navigate(`/userInfo`);
    };
    if(isError) {
        console.log("errors",error);
        toast(`${error}`, { type: "error"});
    }


    return(
        <>
            <div className={styles.hover} onClick = {()=> navigate(`/userInfo`)}>
            </div>
        <div className={styles.container}>
            <h1>Edit user info</h1>
            <div className={styles.bodyContainer}>
            <Formik 
                initialValues={{
                    name: params.name,
                    about: params.about,
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(40, 'Must be 40 characters or less')
                        .required('Required'),
                    about: Yup.string()
                        .max(80, 'Must be 80 characters or less')
                        .required('Required'),
                  })}

                onSubmit={(values) => {
                    tryEdit(values);
                }}
            >   
                {({ errors, touched }) => (
                 <Form className={styles.form}>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="name">Name</label>
                        <Field id="name" name="name" />
                        {errors.name && touched.name ? (
                            <div className={styles.formErrorContainer}>{errors.name}</div>
                        ) : null}
                    </div>
                   
                    <div className={styles.fieldContainer}>
                        <label htmlFor="about">About</label>
                        <Field id="about" name="about" />
                        {errors.about && touched.about ? (
                            <div className={styles.formErrorContainer}>{errors.about}</div>
                        ) : null}
                    </div>
                    <UsualButton type="submit" text="Create"/>
                </Form>
                )}
            </Formik>
            </div>
        </div>
        </>
    )
}