import React, { useContext, useState } from 'react'
import { auth } from '../fb-config'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom";
import { db } from '../fb-config';
import { UserContext, UsernameContext } from '../App';
import Button from './Button';
import spinner from "../images/spinner.svg";
import signUp from "../images/signUp-icon.png";
import letsChat from "../images/letsChat-img.jpg"


const SignUp = () => {
    //const [currentUser, setCurrentUser] = React.useState("")
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [newUser, setNewUser] = useContext(UsernameContext);
    const auth = getAuth();
    const createAccount = (e) => {

        setIsLoading(true)
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (userCredential.user.displayName === null) {
                    updateProfile(auth.currentUser, {
                        displayName: newUser, photoURL: "https://example.com/jane-q-user/profile.jpg"

                    }).then(() => {
                        // Profile updated!
                        // ...
                        const theName = userCredential.user.displayName
                    }).catch((error) => {
                        console.log(error)
                    });
                }

                //Update profile for user
                if (userCredential) {
                    navigate("/login")
                }

            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })
        setEmail("")
        setPassword("")
    }
    return (
        // <div className='bg-purple-600 py-12'>
        <div className='block lg:flex lg:items-center md:bg-green-600 lg:border-8 lg:p-8 h-min md:h-full bg-gray-100'>
            <form onSubmit={createAccount} className='bg-white md:bg-green-300 lg:bg-blue-300 w-full mb-0 px-2 md:py-10 py-2 md:w-full h-full md:h-screen lg:h-fit lg:py-3 xl:py-7 xl:bg-purple-400 lg:w-1/2'>
                <img src={signUp} className='w-[7rem] md:w-[4rem] mt-1 py-2 pl-4' alt='signUp-icon' />
                <h1 className='text-center mx-auto  text-3xl  pt-3 md:text-5xl lg:text-4xl'>Create an account</h1>
                <p className='text-center text-[#4b4b50] md:text-3xl lg:text-2xl'>Let's get started with your 30 day free trial. </p>
                <div className='flex flex-col mt-4 justify-center mx-1 px-2 py-2 md:py-6'>
                    <input className='m-3 p-2 rounded-sm md:py-6 lg:py-2' id='name' onChange={((e) => setNewUser(e.target.value))} type="text" value={newUser} placeholder="Name..." required />
                    <hr></hr>
                    <input className='m-3 p-2 rounded-sm md:py-6 lg:py-2' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email..." required />
                    <hr></hr>
                    <input className='m-3 p-2 rounded-sm md:py-6 lg:py-2' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password..." required />
                    <hr></hr>
                    <Button loading={isLoading}>createAccount</Button>
                </div>
                <div className='w-full mb-0 mt-0 md:mt-10 lg:mt-0 justify-center flex'>
                    <h2 className='mr-2 mt-2 lg:mt-2 md:mt-1 text-base md:text-4xl lg:text-2xl'>Already have an account?</h2>
                    <Link className='text-lg md:text-4xl lg:text-2xl mt-1 underline' to="login">Sign In</Link>
                </div>
            </form >
            <div className='hidden md:hidden  lg:flex w-1/2 left-0 top-0 '>
                <img src={letsChat} className='hidden md:hidden lg:flex  w-full' alt="app-img" />
            </div>
        </div>

        // </div>
    )
}

export default SignUp