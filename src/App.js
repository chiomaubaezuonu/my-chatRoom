import React, { createContext } from 'react'
//import { async } from '@firebase/util'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login'
import ChatRoom from './components/ChatRoom'
import SignUp from './components/SignUp'
import AuthDetails from './components/AuthDetails'
import './App.css'

//import Create from './components/Create'

export const UsernameContext = createContext(["", () => { }])
export const AuthContext = createContext(["", () => { }])

const App = () => {
  const [email, setEmail] = React.useState("")
  const [currentUser, setCurrentUser] = React.useState("")

  return (
    <div className='md:bg-slate-100 h-screen'>
      {/* <UserContext.Provider value= {[currentUser, setCurrentUser]}> */}
      <UsernameContext.Provider value={[currentUser, setCurrentUser]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="chatroom" element={<ChatRoom />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="authdetails" element={<AuthDetails />} />
          </Routes>
        </BrowserRouter>
      </UsernameContext.Provider>

    </div>
  )
}

export default App