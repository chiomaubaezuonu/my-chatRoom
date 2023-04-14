import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../fb-config'
import { signInWithEmailAndPassword } from "firebase/auth"
import ChatRoom from './ChatRoom'
import { useNavigate, Link } from "react-router-dom";
//import app from '../fb-config'
import { UsernameContext } from '../App';
//import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import spinner from "../images/spinner.svg";
import Button from "./Button"
import loginImg from "../images/loginImg.png"

const Login = () => {
    const [currentUser, setCurrentUser] = useContext(UsernameContext)
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("")
    const [btnTitle, setBtnTitle] = React.useState("Welcome")
    const [password, setPassword] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [successMsg, setSuccessMsg] = useState("")
    const style = {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: "2", 
        cursor: "pointer"
    }
    const login = (e) => {
        setIsLoading(true)
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                if (userCredential) {
                    setSuccessMsg("Successfully logged in")
                    navigate("/chatroom")
                }
            })

            .catch((error) => {
                setIsLoading(false);
                console.log(error);
                //toast.error("Authentication failed");
                if (error) {
                    setModal(true)
                }
                else {
                    setModal(false)
                }

            })
        setCurrentUser(currentUser)
        setEmail("")
        setPassword("")
    }
    return (

        // <div>
        //     <form onSubmit={login} className='w-full z-10 relative bg-blue-300 md:w-[50rem] mx-auto md:p-6 h-screen'>
        //         {/* {password &&
        //             <div className='bg-green-600 absolute right-24 w-[10rem] text-center text-white'>Login Successful</div>
        //         } */}
        //         {modal &&
        //             <div className='absolute p-12 top-56 left-16 md:left-72 md:top-64 text-lg bg-white flex justify-center items-center w-[18rem] rounded text-center text-red-500'>Login failed <button className='absolute top-0 right-5' onClick={() => { setModal(false) }}>x</button></div>
        //         }
        //         <h1 className='text-center mx-auto text-4xl pt-16  p-1'>{btnTitle} {currentUser}</h1>
        //         <div className='flex flex-col mt-24 justify-center mx-4 px-4 py-12 bg-green-200'>
        //             <input className='m-2 p-1 rounded-sm' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email..." required />
        //             <input className='m-2 p-1 rounded-sm' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password..." required />
        //             {/* <Button loading={isLoading} title={btnTitle} /> */}
        //             <Button loading={isLoading}>
        //                 Login
        //             </Button>
        //         </div>
        //         <div className='mt-4 w-full justify-center flex'>
        //             <h2 className='flex p-3 md:text-lg pt-4'>Don't have an account?</h2>
        //             <Link to="/SignUp"><Button>Sign Up</Button></Link>
        //         </div>
        //     </form >
        //     {/* <ToastContainer /> */}
        // </div >

        <div className='flex flex-col justify-center'>     
        <form onSubmit={login} className='w-full p-6 md:bg-blue-300 md:w-1/2 md:p-6 h-screen'>
        <img src={loginImg} className='w-[4rem] md:w-[4rem] mt-4 py-3 pl-4' alt='login-icon' />
            <h1 className='text-center mx-auto  text-4xl mt-1 pt-1'>{btnTitle} {currentUser}</h1>
            {/* <p className='text-center text-xl text-[#4b4b50] py-4'>Let's get started with your 30 day free trial. </p> */}
            <div className='flex flex-col mt-6 justify-center mx-1 px-1 py-12'>
                <input className='m-4 p-4 rounded-sm' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email..." required />
                <hr></hr>
                <input className='m-4 p-4 rounded-sm' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password..." required />
                <hr></hr>
                <Button loading={isLoading}>Login</Button>
            </div>
            <div className='w-full my-8 justify-center flex pb-3'>
                <h2 className='mr-2 text-xl'>Don't have an account?</h2>
                <Link to="/SignUp">Sign Up</Link>
            </div>
        </form >
    </div>

    )
}

export default Login