// import React from 'react'
// // import { auth } from '../fb-config'
// // import { createUserWithEmailAndPassword } from "firebase/auth"
// //import {Formik, Form, Field, ErrorMesagge} from 'formik'
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup'

// const Create = () => {
//     const [email, setEmail] = React.useState("")
//     const [password, setPassword] = React.useState("")

//     // const createAccount = (e) => {
//     //     e.preventDefault();
//     //     createUserWithEmailAndPassword(auth, email, password)
//     //         .then((userCredential) => {
//     //             console.log(userCredential);
//     //         })
//     //         .catch((error) => {
//     //             console.log(error);
//     //         })
//     // }

//     const submitCred = {
//         initialValues: {
//             name: "",
//             email: "",
//             password: "",
//             confirmPassword: ""

//         },

//         validationSchema: Yup.object({
//             name: Yup.string().required("Field cannot be empty"),
//             email: Yup.string().email("invalid email").required("Field cannot be empty"),
//             password: Yup.string().min(5, "Password is too short").required("Field cannot be empty"),
//             confirmPassword: Yup.string().oneOf(["", Yup.ref("password")], "Password does not match!!!")
//         }),
//         onSubmit:(values)=>{
//             console.log(values)
//         }
//     }
    

//     return (
//         <div>
            
//                 <Formik {...submitCred}>
//                     {({handleSubmit}) => (
//                     <Form onSubmit={handleSubmit} className='p-2 m-2 bg-green-200'>
//                         <Field name="name" />
//                         <div><ErrorMessage name='name' /></div>
//                         <Field className="border-red-400" placeholder="Name" name="email" />
//                         <div><ErrorMessage name='email' /></div>
//                         <Field placeholder="password" name="password" />
//                         <div><ErrorMessage name='password' /></div>
//                         <Field placeholder="confirm password" name="confirmPassword" />
//                         <div><ErrorMessage name='confirmPassword' /></div>
//                         <button className='bg-blue-500 text- white px-2 text-center rounded text-white py-1' type='submit'>submit</button>
//                     </Form>
//                     )}
//                 </Formik>

            
//         </div>
//     )
// }


// export default Create