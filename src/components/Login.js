import React, { useEffect, useContext } from 'react'
import { auth } from '../fb-config'
import { signInWithEmailAndPassword } from "firebase/auth"
import ChatRoom from './ChatRoom'
import { useNavigate, Link } from "react-router-dom";
import app from '../fb-config'
import { UserContext } from '../App';
//import ChatRoom from '../components/ChatRoom';

const Login = () => {
    // const user = useContext(UserContext)
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [currentUser, setCurrentUser] = useContext(UserContext)
    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //console.log(userCredential);

                if (userCredential) {
                    console.log(userCredential);
                    navigate("/chatroom")
                }
                if (window.screen.width < 768) {
                     navigate("/chatroom")
                  }

            })
            .catch((error) => {
                console.log(error);
            })
    }

    // function handleLogin() {

    //     navigate("/chatroom")
    // }
    return (


        <div>
            <form onSubmit={login} className='bg-blue-300 w-1/2 mx-auto p-6 h-screen'>
                <h1 className=' w-[5rem] text-center mx-auto text-2xl mt-10  p-1'>Log in {currentUser}</h1>
                <div className=' flex flex-col mt-24 p-6 bg-green-200'>
                    <input className='m-2 p-1 rounded-sm' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email..." />
                    <input className='m-2 p-1 rounded-sm' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password..." />
                    {/* <Link to="/chatroom"> */}
                    <button className='bg-blue-500 w-[10rem] mx-auto mb-4 text-white py-1 px-3 rounded' type='submit'>Log in</button>
                    {/* </Link> */}
                </div>
                <div className='mt-8'>
                    <h2 className='p-3'>Don't have an account? <Link to="/SignUp">
                        <button className='bg-green-500 w-[10rem] mx-auto text-white py-1 px-3 rounded ml-3'>Sign Up</button></Link> </h2>
                </div>
            </form >
        </div >

    )
}

export default Login