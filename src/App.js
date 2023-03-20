import React, { createContext } from 'react'
//import { async } from '@firebase/util'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login'
import ChatRoom from './components/ChatRoom'
import SignUp from './components/SignUp'
import AuthDetails from './components/AuthDetails'
import './App.css'

//import Create from './components/Create'

export const UserContext = createContext(["", () => {}])

const App = () => {
  //const auth = getAuth(app);
  // signInWithEmailAndPassword(auth, "chioma@gmail.com, dancy2")
  // .then((cred)=> {
  //   console.log("signed in!!!")
  // })

  const [currentUser, setCurrentUser] = React.useState("")
  return (
    <div className='md:bg-slate-100 h-screen'>
      <UserContext.Provider value= {[currentUser, setCurrentUser]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="chatroom" element={<ChatRoom />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="authdetails" element={<AuthDetails />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>

      {/* <button className='bg-blue-500 w-[10rem] mx-auto mb-4 text-white py-1 px-3 rounded' type='submit'>Sign Up</button> */}
      {/* <AuthDetails /> */}

    </div>
  )
}

export default App