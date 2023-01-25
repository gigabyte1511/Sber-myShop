import styles from './styles.module.css';
import { Formik, Field, Form } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { createProduct } from '../../API/query';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { UsualButton } from '../Buttons/UsualButton/UsualButton';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export const CREATE_PRODUCT_QUERY_KEY = "CREATE_PRODUCT_QUERY_KEY";

export function CreateProduct(){
    const token = useSelector((store) => store.user.token);
    const navigate = useNavigate()
    const [url, setUrl] = useState("");
    const {isSuccess, isLoading,isError, mutate, data, error} = useMutation({
        queryKey: [CREATE_PRODUCT_QUERY_KEY], 
        mutationFn: createProduct,
    })
    const tryCreateProduct = (values) =>{
        mutate([values,token]);
    }
    if(isLoading) return <Loader />
    if(isSuccess) {
        toast(`Product "${data.name.slice(0,20)}..." has been created.`, { type: "success"});
        navigate(`/productDetailed/${data._id}`, { state: data});
    };
    if(isError) {
        console.log("errors",error);
        toast(`${error}`, { type: "error"});
    }


    return(
        <div className={styles.container}>
            {/* <button onClick={()=> navigate("/productDetailed/622c779c77d63f6e70967d1c", { state: params})}>Test</button> */}
            <h1>Add new product</h1>
            <div className={styles.bodyContainer}>
            <img className={styles.imageContainer} src = {url}></img>
            <Formik 
                initialValues={{
                    available: true,
                    pictures: "",
                    name: "",
                    price: "",
                    discount: "",
                    stock: "",
                    wight: "",
                    description: '',
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
                        .max(80, 'Must be 80 characters or less')
                        .required('Required'),
                  })}
                handleChange ={(e) => console.log(e)}
                onSubmit={(values) => {
                    tryCreateProduct(values);
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

                    {/* <button type="submit">Submit</button> */}
                    <UsualButton type="submit" text="Create"/>
                </Form>
                )}
            </Formik>
            </div>
        </div>
    )
}