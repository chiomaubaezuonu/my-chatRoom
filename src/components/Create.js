// import React from 'react'
// import { auth } from '../fb-config'
// import { createUserWithEmailAndPassword } from "firebase/auth"
// //import {Formik, Form, Field, ErrorMesagge} from 'formik'
// import { useNavigate, Link } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup'

// const Create = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = React.useState("")
//     const [password, setPassword] = React.useState("")

    

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
//         onSubmit: (values) => {
//             console.log(values)

//         }
//     }


//     return (
//         <div>

//             <Formik {...submitCred}>
//                 {({ handleSubmit }) => (
//                     <Form onSubmit={handleSubmit} className='bg-blue-300 w-1/2 mx-auto p-6 h-screen'>
//                         <div className='bg-blue-300 h-screen flex flex-col items-center justify-center'>
//                             <div className='bg-green-200 w-[20rem] p-3 flex flex-col items-center justify-center'>
//                                 <h1 className=' w-[5rem] text-center mx-auto text-xl mt-5  p-1'>Sign Up</h1>
//                                 <Field className="m-2 p-1 rounded-sm" placeholder="Email" name="email" />
//                                 <div><ErrorMessage name='email' /></div>
//                                 <Field className="m-2 p-1 rounded-sm" placeholder="password" name="password" />
//                                 <div><ErrorMessage name='password' /></div>
//                                 <Field className="m-2 p-1 rounded-sm" placeholder="confirm password" name="confirmPassword" />
//                                 <div><ErrorMessage name='confirmPassword' /></div>
//                                 <button className='bg-blue-500 text- white px-2 text-center rounded mt-3 text-white py-1' type='submit'>submit</button>
//                             </div>
//                             {/* <Field name="name" placeholder= "Name" className="bg-red-600" />
//                             <div><ErrorMessage name='name' /></div> */}
//                         </div>
//                     </Form>
//                 )}
//             </Formik>


//         </div>
//     )
// }


// export default Create