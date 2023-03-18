// This file checks whether a user is signed in and which user it is
import React, { useEffect, useState } from 'react'
import { auth } from "../fb-config";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from "react-router-dom";
import SignOutBtn from './SignOutBtn';

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

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
        signOut(auth).then(() => {
            //navigate("/")
            console.log("signed out successful")
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div>
            {authUser ? <> <p>{`signed in as ${authUser.email}`}</p>
                <button className='bg-blue-500 p-2 text- white rounded' onClick={userSignOut}>sign out</button> </> : <p>signed out</p>}
        
        </div>
    )
}

export default AuthDetails