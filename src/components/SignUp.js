import React, { useContext } from 'react'
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
        //console.log(currentUser)
    }
    return (    
        <div className=''>
            <div className='block lg:flex lg:border-8 lg:p-8 h-min bg-gray-100'>
                <form onSubmit={createAccount} className='w-full mb-0 px-2 py-4 bg-white md:w-full h-full md:h-screen md:py-6 lg:w-1/2'>
                    <img src={signUp} className='w-[7rem] md:w-[4rem] mt-4 py-2 pl-4' alt='signUp-icon' />
                    <h1 className='text-center mx-auto  text-3xl  pt-3 md:text-5xl lg:text-4xl'>Create an account</h1>
                    <p className='text-center text-[#4b4b50] md:text-3xl lg:text-2xl'>Let's get started with your 30 day free trial. </p>
                    <div className='flex flex-col mt-4 justify-center mx-1 px-2 py-2 md:py-6'>
                        <input className='m-3 p-2 rounded-sm md:py-2 lg:py-3' id='name' onChange={((e) => setNewUser(e.target.value))} type="text" value={newUser} placeholder="Name..." required />
                        <hr></hr>
                        <input className='m-3 p-2 rounded-sm md:py-2 lg:py-3' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email..." required />
                        <hr></hr>
                        <input className='m-3 p-2 rounded-sm md:py-2 lg:py-3' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password..." required />
                        <hr></hr>
                        <Button loading={isLoading}>createAccount</Button>
                    </div>
                    <div className='w-full mb-0 mt-0 justify-center flex'>
                        <h2 className='mr-2 text-lg md:text-3xl'>Already have an account?</h2>
                        <Link className='text-xl lg:text-3xl underline' to="login">Sign In</Link>
                    </div>
                </form >
                <div className='hidden md:hidden lg:flex w-1/2 lg:h-screen lg:bg-blue-600 left-0 top-0 '>
                    <img src={letsChat} className='hidden md:hidden lg:h-full lg:flex h-fit w-full' alt="app-img" />
                </div>
            </div>

        </div>
    )
}

export default SignUp