import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from '../fb-config'
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
import { getAuth } from "firebase/auth";
import letsChat from "../images/letsChat-img.jpg"

const Login = () => {
    const [newUser, setNewUser] = useContext(UsernameContext)
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("")
    const [btnTitle, setBtnTitle] = React.useState("Hello")
    const [password, setPassword] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const auth = getAuth();
   
    const login = (e) => {
        setIsLoading(true)
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (userCredential) {
                    console.log(userCredential)
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
        setNewUser(newUser)
        setEmail("")
        setPassword("")
    }
    return (

        <div className='block lg:flex lg:items-center lg:border-8 lg:p-8 h-min md:h-full lg:h-screen md:w-full  bg-gray-100'>
            <form onSubmit={login} className='bg-white  w-full mb-0 px-2  md:py-10 lg:py-0 py-8 md:w-full h-screen md:h-screen lg:h-full lg:px-0 lg:w-1/2'>
                <img src={loginImg} className='w-[4rem] md:w-[4rem] mt-4 py-3 pl-4' alt='login-icon' />
                <h1 className='text-center mx-auto  text-3xl  pt-3 md:text-4xl'>{btnTitle} {newUser}</h1>
                <p className="text-center text-[#4b4b50] md:text-2xl lg:text-lg">
                    To continue, please login with your email and password
                </p>
                {/* <p className='text-center text-xl text-[#4b4b50] py-4'>Let's get started with your 30 day free trial. </p> */}
                <div className='flex flex-col mt-4 justify-center mx-1 px-2 py-2 md:py-6'>
                    <input className='my-3 p-2 rounded-sm md:py-6 lg:py-1 xl:py-2' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email..." required />
                    <hr></hr>
                    <input className='my-3 p-2 rounded-sm md:py-6 lg:py-1 xl:py-2' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password..." required />
                    <hr></hr>
                    <Button loading={isLoading}>Login</Button>
                </div>
                <div className='w-full mb-0 mt-0 justify-center flex'>
                    <h2 className='mr-2 mt-2 lg:mt-2 md:mt-1 text-xl md:text-4xl lg:text-2xl'>Don't have an account?</h2>
                    <Link className='text-xl md:text-4xl lg:text-2xl mt-1 underline' to="/">Sign Up</Link>
                </div>
            </form >
            <div className='hidden lg:block bg-white w-full mb-0 px-2  md:py-10 lg:py-0 py-2 md:w-full h-full md:h-screen lg:h-full lg:px-0 lg:w-1/2'>
                <img src={letsChat} className='hidden md:hidden lg:h-full lg:flex h-fit w-full' alt="app-img" />
            </div>
        </div>

    )
}

export default Login