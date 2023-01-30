// import styles from './styles.module.css';
// import { Formik, Field, Form } from 'formik';
// import * as Yup from 'yup';


// export function FormGenerator({params}){
//     console.log("FormGenerator",params[0].name);

//     const initialValuesObj = {}
//     params.forEach((e)=>{
//         initialValuesObj[e.name] = e.initialValues;

//     })
//     console.log("initialValues",initialValuesObj);

//     const validationSchemaObj = {};
//     params.forEach((e)=>{
//         validationSchemaObj[e.name] = e.validationSchema.type()
//             .max(e.validationSchema.max, `Must be ${e.validationSchema.max} characters or less`)
//             .required('Required')
//     })
//     console.log("validationSchema",validationSchemaObj);





//     return(
//         <>test</>
//     )
// }
// <FormGenerator params = {[{
//     name: "available",
//     initialValues: true, 
//     validationSchema: {
//         type: Yup.string,
//         max: 15,
//         required: true
//     },
//     validate: "TEST"
// },
// {
//     name: "pictures",
//     initialValues: "", 
//     validationSchema: {
//         type: "string",
//         max: 15,
//         required: true
//     },
//     validate: "TEST"
// }
// ]} /> 