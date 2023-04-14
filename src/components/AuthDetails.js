// This file checks whether a user is signed in and which user it is
import React, { useEffect, useState, useContext } from 'react'
import { auth } from "../fb-config";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import Button from './Button';
import { UsernameContext, AuthContext } from '../App';
import spinner from "../images/spinner.svg";

const AuthDetails = (props) => {
    const [currentUser, setCurrentUser] = useContext(UsernameContext)
    const [authUser, setAuthUser] = useState(null);
    const [email, setEmail] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false)
    const navigate = useNavigate()
    const { title } = props
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {

            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null);
            }
        })
        return () => {
            listen();
        }
    }, [])

    const userSignOut = () => {
        setIsLoading(true)
        signOut(auth).then(() => {
            setEmail("")
            navigate("/")
            console.log("signed out successful")
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div>
            {authUser ? <> <p className='text-center'>{`signed in as ${authUser.email}`}</p>
                <Button loading={isLoading} className='bg-blue-500 p-2 text- white rounded' onClick={userSignOut}>sign out</Button> </> : <p>signed out</p>}
        </div>
    )
}

export default AuthDetails;
