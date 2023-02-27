// This file checks whether a user is signed in and which user it is
import React, { useEffect, useState } from 'react'
import { auth} from "../fb-config";   
import { onAuthStateChanged, signOut } from 'firebase/auth';

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
            console.log("signed out successful")
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div>
            { authUser ? <> <p>{`signed in as ${authUser.email}`}</p><button onClick={userSignOut
            }>sign out</button></> : <p>signed out</p>}
        </div>
    )
}

export default AuthDetails