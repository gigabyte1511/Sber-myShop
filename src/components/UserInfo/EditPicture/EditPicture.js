import styles from './styles.module.css';
import { Formik, Field, Form } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { editUserPicture } from '../../../API/query';
import Loader from '../../Loader/Loader';
import { UsualButton } from '../../Buttons/UsualButton/UsualButton';
import { GET_USERINFO_QUERY_KEY } from '../UserInfo';
import { useState } from 'react';
export const EDIT_USER_PICTURE_QUERY_KEY = "EDIT_USER_PICTURE_QUERY_KEY";

export function EditPicture(){
    const {state:params} = useLocation();
    const queryClient = useQueryClient()
    const [pictureUrl, setPictureUrl] = useState(params.avatar);

    const { token, group } = useSelector((store) => store.user);
    const navigate = useNavigate()

    const {mutate} = useMutation({
        queryKey: [EDIT_USER_PICTURE_QUERY_KEY], 
        mutationFn: editUserPicture,
        onSuccess: ()=> {
            toast(`Success edit user info.`, { type: "success"});
            queryClient.invalidateQueries({ queryKey: [GET_USERINFO_QUERY_KEY] })
            navigate(`/userInfo`);
        },
        onError: (error)=> {
            toast(`${error}`, { type: "error"});
        }
    })
    const tryEdit = (values) =>{
        console.log(values,group,token)
        mutate([values, token, group]);
    }

    return(
        <>
            <div className={styles.hover} onClick = {()=> navigate(`/userInfo`)}>
            </div>
        <div className={styles.container}>
            <h1>Edit user avatar</h1>
            <img className={styles.imageContainer}src={pictureUrl} alt = "123"></img>
            <Formik className={styles.form}
                initialValues={{
                    avatar: params.avatar,
                }}
                validationSchema={Yup.object({
                    avatar: Yup.string()
                        .required('Required')
                  })}

                onSubmit={(values) => {
                    tryEdit(values);
                }}
            >   
                {({ errors, touched }) => (
                 <Form className={styles.form}>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="avatar">Avatar url</label>
                        <Field id="avatar" name="avatar" validate = {(e)=> setPictureUrl(e)}/>
                        {errors.avatar && touched.avatar ? (
                            <div className={styles.formErrorContainer}>{errors.avatar}</div>
                        ) : null}
                    </div>
                    <UsualButton type="submit" text="Edit avatar"/>
                </Form>
                )}
            </Formik>
        </div>
        </>
    )
}