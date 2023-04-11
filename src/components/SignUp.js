import React, { useContext } from 'react'
import { auth } from '../fb-config'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom";
//import { db } from '../fb-config';
import { UserContext, UsernameContext } from '../App';
import Button from './Button';
import spinner from "../images/spinner.svg";


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
                console.log(userCredential)
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
        <div>
            <form onSubmit={createAccount} className='w-full bg-blue-300 md:w-1/2 mx-auto md:p-6 h-screen'>
                <h1 className='text-center mx-auto text-4xl pt-16  p-1'>Sign Up</h1>
                <div className='flex flex-col mt-24 justify-center mx-4 px-4 py-12 bg-green-200'>
                    <input className='m-2 p-1 rounded-sm' onChange={((e) => setCurrentUser(e.target.value))} type="text" value={currentUser} placeholder="Display name..." required />
                    <input className='m-2 p-1 rounded-sm' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email..." />

                    <input className='m-2 p-1 rounded-sm' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password..." />
                    {/* <button className='bg-blue-500 w-[10rem] mx-auto mt-4 mb-4 text-white py-1 px-3 rounded' type='submit'>Sign Up</button> */}
                    <Button loading={isLoading}>Sign Up</Button>
                </div>
                <div className='mt-4 w-full justify-center flex'>
                    <h2 className='p-3 text-base'>Already have an account?</h2>
                    <Link to="/"><Button>Sign In</Button></Link>
                </div>
            </form >
        </div>
    )
}

export default SignUp