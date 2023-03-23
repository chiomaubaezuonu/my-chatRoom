import React, { useEffect, useContext } from 'react'
import { auth } from '../fb-config'
import { signInWithEmailAndPassword } from "firebase/auth"
import ChatRoom from './ChatRoom'
import { useNavigate, Link } from "react-router-dom";
import app from '../fb-config'
import { UserContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import ChatRoom from '../components/ChatRoom';

const Login = () => {
    // const user = useContext(UserContext)
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [currentUser, setCurrentUser] = useContext(UserContext)
    const [isLoading, setIsLoading] = React.useState(false)
    const login = (e) => {
        toast.success("login successful")
        setIsLoading(true)
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                if (userCredential) {
                    console.log(userCredential);
                    navigate("/chatroom")
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
                toast.error("Authentication failed");
            })

    }

    // function handleLogin() {

    //     navigate("/chatroom")
    // }
    return (


        <div>
            <form onSubmit={login} className='w-full bg-blue-300 md:w-[50rem] mx-auto md:p-6 h-screen'>
                <h1 className='text-center mx-auto text-4xl pt-16  p-1'>Log in {currentUser}</h1>
                <div className='flex flex-col mt-24 justify-center mx-4 px-4 py-12 bg-green-200'>
                    <input className='m-2 p-1 rounded-sm' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email..." required />
                    <input className='m-2 p-1 rounded-sm' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password..." required />
                    {/* <Link to="/chatroom"> */}
                    <button className='bg-blue-500 w-[10rem] mx-auto mt-4 mb-4 text-white py-1 px-3 rounded' type='submit'>Log in</button>
                    {/* </Link> */}
                    <img
                        src="your-loader-url"
                    />
                </div>
                <div className='mt-4 w-full flex'>
                    <h2 className='p-3 md:text-lg'>Don't have an account? <Link to="/SignUp">
                        <button className='bg-green-500 w-[6rem] md:w-[10rem] mx-auto text-white py-1 px-3 rounded ml-3'>Sign Up</button></Link> </h2>
                </div>
                {/* {isLoading ? "loading" : toast.success("Signed up succesfully", { position: toast.POSITION.TOP_RIGHT }) } */}
            </form >
            <ToastContainer />
        </div >

    )
}

export default Login