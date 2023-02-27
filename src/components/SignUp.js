import React from 'react'
import { auth } from '../fb-config'
import { createUserWithEmailAndPassword } from "firebase/auth"

const SignUp = () => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
  
   const createAccount = (e) =>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential)
    })
    .catch((error) => {
        console.log(error)
    })
   }
  return (
    <div>
        <form onSubmit={createAccount}>
                <h1 className='w-[5rem] text-center m-3 p-1 '>Sign Up</h1>
                <input className='m-2 p-1 rounded-sm' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email..." />
                <input className='m-2 p-1 rounded-sm' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password..." />
                <button className='cursor-pointer bg-blue-500 text-white py-1 px-3 rounded' type='submit'>Sign Up</button>
            </form>
    </div>
  )
}

export default SignUp