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
 // const [newName, setNewName] = React.useState("")
  const [currentUser, setCurrentUser] = React.useState("")

  return (
    <div>
      <UsernameContext.Provider value= {[currentUser, setCurrentUser]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="chatroom" element={<ChatRoom />} />
            <Route path="login" element={<Login />} />
            <Route path="authdetails" element={<AuthDetails />} />
          </Routes>
        </BrowserRouter>
      </UsernameContext.Provider>

    </div>
  )
}

export default App