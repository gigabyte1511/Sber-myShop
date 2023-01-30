import styles from './styles.module.css';
import { Formik, Field, Form } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { editProduct } from '../../API/query';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { UsualButton } from '../Buttons/UsualButton/UsualButton';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';

export const EDIT_PRODUCT_QUERY_KEY = "EDIT_PRODUCT_QUERY_KEY";

export function ProductEdit(){
    const {state:params} = useLocation();
    const [url, setUrl] = useState(params.pictures);

    const { token, group } = useSelector((store) => store.user);
    const navigate = useNavigate()

    const {isSuccess, isLoading,isError, mutate, error} = useMutation({
        queryKey: [EDIT_PRODUCT_QUERY_KEY], 
        mutationFn: editProduct,
    })
    const tryEdit = (values) =>{
        mutate([values, token, params._id]);
    }
    if(isLoading) return <Loader />
    if(isSuccess) {
        toast(`Success edit product info.`, { type: "success"});
        navigate(`/main/${params._id}`);
    };
    if(isError) {
        console.log("errors",error);
        toast(`${error}`, { type: "error"});
    }


    return(
        <div className={styles.container}>
            <h1>Edit product</h1>
            <div className={styles.bodyContainer}>
            <img className={styles.imageContainer} src = {url} alt = "123"></img>
            <Formik 
                initialValues={{
                    available: true,
                    pictures: params.pictures,
                    name: params.name,
                    price: params.price,
                    discount: params.discount,
                    stock: params.stock,
                    wight: params.wight,
                    description: params.description,
                }}
                validationSchema={Yup.object({
                    available: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    pictures: Yup.string()
                        .required('Required'),
                    name: Yup.string()
                        .max(40, 'Must be 40 characters or less')
                        .required('Required'),
                    price: Yup.number()
                        .max(15000, 'Max price: 15000')
                        .required('Required'),
                    discount: Yup.number()
                        .max(99, 'Max discount: 99%')
                        .required('Required'),
                    stock: Yup.number()
                        .max(1000, 'Max stock: 1000')
                        .required('Required'),
                    wight: Yup.number()
                        .max(10000, 'Max wigth: 10000')
                        .required('Required'),
                    description: Yup.string()
                        .max(100, 'Must be 100 characters or less')
                        .required('Required'),
                  })}
                handleChange ={(e) => console.log(e)}
                onSubmit={(values) => {
                    tryEdit(values);
                }}
            >   
                {({ errors, touched }) => (
                 <Form className={styles.form}>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="vailable">Available</label>
                        <Field id="available" name="available" placeholder="true"/>
                        {errors.available && touched.available ? (
                            <div className={styles.formErrorContainer}>{errors.available}</div>
                        ) : null}
                        </div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="pictures">Pictures</label>
                        <Field id="pictures" name="pictures" placeholder="pictures" validate= {(e)=> setUrl(e)}/>
                        {errors.pictures && touched.pictures ? (
                            <div className={styles.formErrorContainer}>{errors.pictures}</div>
                        ) : null}
                        </div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="name">Name</label>
                        <Field id="name" name="name" placeholder="name" />
                        {errors.name && touched.name ? (
                            <div className={styles.formErrorContainer}>{errors.name}</div>
                        ) : null}
                    </div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="price">Price</label>
                        <Field id="price" name="price" placeholder="price" />                    
                        {errors.price && touched.price ? (
                            <div className={styles.formErrorContainer}>{errors.price}</div>
                        ) : null}
                        </div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="discount">Discount</label>
                        <Field id="discount" name="discount" placeholder="discount" />
                        {errors.discount && touched.discount ? (
                            <div className={styles.formErrorContainer}>{errors.discount}</div>
                        ) : null}
                        </div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="stock">Stock</label>
                        <Field id="stock" name="stock" placeholder="stock" />
                        {errors.stock && touched.stock ? (
                            <div className={styles.formErrorContainer}>{errors.stock}</div>
                        ) : null}
                        </div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="wight">Wight</label>
                        <Field id="wight" name="wight" placeholder="wight" />
                        {errors.wight && touched.wight ? (
                            <div className={styles.formErrorContainer}>{errors.wight}</div>
                        ) : null}
                        </div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="description">Description</label>
                        <Field id="description" name="description" placeholder="description" />
                        {errors.description && touched.description ? (
                            <div className={styles.formErrorContainer}>{errors.description}</div>
                        ) : null}
                    </div>
                    <UsualButton type="submit" text="Edit"/>
                </Form>
                )}
            </Formik>
            </div>
        </div>
    )
}