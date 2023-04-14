import React, { useContext } from 'react'
import { auth } from '../fb-config'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom";
import { db } from '../fb-config';
import { UserContext, UsernameContext } from '../App';
import Button from './Button';
import spinner from "../images/spinner.svg";
import signUp from "../images/signUp-icon.png";


const SignUp = () => {
    //const [currentUser, setCurrentUser] = React.useState("")
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [currentUser, setCurrentUser] = useContext(UsernameContext)
    const createAccount = (e) => {
        setIsLoading(true)
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //return chatRef('chats').doc(userCredential.user.uid)
                if (userCredential) {
                    navigate("/")
                }

            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })
        setEmail("")
        setPassword("")
        console.log(currentUser)
    }
    return (
        <div className='flex flex-col justify-center'>     
            <form onSubmit={createAccount} className='w-full md:bg-blue-300 md:w-1/2 md:p-6 h-screen'>
            <img src={signUp} className='w-[7rem] md:w-[4rem] mt-4 py-10 pl-4' alt='signUp-icon' />
                <h1 className='text-center mx-auto  text-3xl pt-3'>Create an account</h1>
                <p className='text-center text-[#4b4b50] py-2'>Let's get started with your 30 day free trial. </p>
                <div className='flex flex-col mt-4 mb-4 justify-center mx-1 px-2 py-8'>
                    <input className='m-3 p-3 rounded-sm' onChange={((e) => setCurrentUser(e.target.value))} type="text" value={currentUser} placeholder="Name..." required />
                    <hr></hr>
                    <input className='m-3 p-3 rounded-sm' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email..." required />
                    <hr></hr>
                    <input className='m-3 p-3 rounded-sm' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password..." required />
                    <hr></hr>
                    <Button loading={isLoading}>createAccount</Button>
                </div>
                <div className='w-full justify-center flex'>
                    <h2 className='mr-2 text-lg'>Already have an account?</h2>
                    <Link to="/"><a href='#' className='underline-offset-1 text-lg'>Sign In</a></Link>
                </div>
            </form >
        </div>
    )
}

export default SignUp