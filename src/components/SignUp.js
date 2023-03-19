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
            <form onSubmit={createAccount} className='bg-blue-300 w-1/2 mx-auto p-6 h-screen'>
                <h1 className=' w-[5rem] text-center mx-auto text-xl mt-4  p-1'>Sign Up</h1>
                <div className=' flex flex-col mt-24 p-6 bg-green-200'>
                    <input className='m-2 p-1 rounded-sm' onChange={((e) => setCurrentUser(e.target.value))} type="text" value={currentUser} placeholder="Display name..." required />
                    <input className='m-2 p-1 rounded-sm' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email..." />

                    <input className='m-2 p-1 rounded-sm' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password..." />
                    <button className='bg-blue-500 w-[10rem] mx-auto mb-4 text-white py-1 px-3 rounded' type='submit'>Sign Up</button>
                </div>
                <div className='mt-8'>
                    <h2 className='p-3'>Already have an account?
                        <Link to="/"><button className='bg-green-500 w-[10rem] mx-auto text-white py-1 px-3 rounded ml-3'>Sign In</button></Link> </h2>
                </div>
            </form >
        </div>
    )
}

export default SignUp