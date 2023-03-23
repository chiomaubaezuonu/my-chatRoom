import React, { useContext } from 'react'
import { auth } from '../fb-config'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom";
import { db } from '../fb-config';
import { UserContext } from '../App';


const SignUp = () => {
    const [currentUser, setCurrentUser] =  useContext(UserContext)
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    // const [currentUser, setCurrentUser] = React.useState("")

    const createAccount = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
                if (userCredential) {
                    navigate("/")
                    console.log(userCredential);
                }

            })
            .catch((error) => {
                console.log(error)
            })
        setEmail("")
        setPassword("")
    }
    return (
        <div>
            <form onSubmit={createAccount} className='w-full bg-blue-300 md:w-1/2 mx-auto md:p-6 h-screen'>
                <h1 className='text-center mx-auto text-4xl pt-16  p-1'>Sign Up</h1>
                <div className='flex flex-col mt-24 justify-center mx-4 px-4 py-12 bg-green-200'>
                    <input className='m-2 p-1 rounded-sm' onChange={((e) => setCurrentUser(e.target.value))} type="text" value={currentUser} placeholder="Display name..." required />
                    <input className='m-2 p-1 rounded-sm' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email..." />

                    <input className='m-2 p-1 rounded-sm' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password..." />
                    <button className='bg-blue-500 w-[10rem] mx-auto mt-4 mb-4 text-white py-1 px-3 rounded' type='submit'>Sign Up</button>
                </div>
                <div className='mt-8'>
                    <h2 className='p-3 text-lg'>Already have an account?
                        <Link to="/"><button className='bg-green-500 w-[10rem] mx-auto text-white py-1 px-3 rounded ml-3'>Sign In</button></Link> </h2>
                </div>
            </form >
        </div>
    )
}

export default SignUp