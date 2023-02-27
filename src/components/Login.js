import React from 'react'
import { auth } from '../fb-config'
import { signInWithEmailAndPassword } from "firebase/auth"

const Login = () => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    
    return (
        <div>
            <form onSubmit={login} className='bg-blue-300 w-1/2 mx-auto p-3 h-screen'>
                <h1 className=' w-[5rem] text-center mx-auto text-2xl mt-10  p-1'>Log in</h1>
                <div className=' flex flex-col mt-24 bg-green-200'>
                    <input className='m-2 p-1 rounded-sm' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email..." />
                    <input className='m-2 p-1 rounded-sm' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password..." />
                    <button className='bg-blue-500 w-[10rem] mx-auto text-white py-1 px-3 rounded' type='submit'>Log in</button>
                </div>
            </form>
        </div>
    )
}

export default Login