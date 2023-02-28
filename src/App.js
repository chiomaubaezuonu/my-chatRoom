import React from 'react'
import { db } from './fb-config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"
import chat1 from "./images/chat1.png"
import sendBtn from "./images/sendBtn.png"
//import { async } from '@firebase/util'
import Login from './components/Login'
//import SignUp from './components/SignUp'
//import AuthDetails from './components/AuthDetails'

//import Create from './components/Create'



const App = () => {
  //let sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date))
  const [chats, setChats] = React.useState([])
  const [newChat, setNewChat] = React.useState("")
  const chatRef = collection(db, "chats")
  const [modal, setModal] = React.useState(true)
  const [user, setUser] = React.useState("")
  
  const signIn = () => {
    setModal(false)
  }
 
  getDocs(chatRef)
    .then((snapshot) => {
      const docs = snapshot.docs
       setChats(docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }))
    })
  //addDoc
  const send = async () => {
    await addDoc(chatRef, { comment: newChat })

  };

  //update
  const update = async (id, comment) => {
    const chatDoc = doc(db, "chats", id)
    const newFields = {
      comment: ""
    }
    await updateDoc(chatDoc, newFields)
  }

  //deleteDoc
  const deleteComment = async (id) => {
    const chatDoc = doc(db, "chats", id)
    await deleteDoc(chatDoc)
  }

  //const auth = getAuth(app);
  // signInWithEmailAndPassword(auth, "chioma@gmail.com, dancy2")
  // .then((cred)=> {
  //   console.log("signed in!!!")
  // })


  return (
    <div className='bg-slate-100 h-screen'>
      <Login />
      {/* {
        modal &&
        <div className="bg-pink-300 w-[30rem] p-3 text-center">
          <h1>Please sign in</h1>
          <input onChange={(e) => { setUser(e.target.value) }} placeholder='Name...' />
          <button onClick={signIn} className='bg-blue-500 text-white px-2 py-[0.1rem] rounded m-2'>Done</button>
        </div>
      } */}
      {
        !modal &&
        <div className='flex'>
          <div>
            <img src={chat1} alt='chat-icon' />
          </div>
          {chats.map((chat) => {
            return <div className='bg-blue-100 rounded-lg p-2 w-[64rem] m-2' key={chat.id}>
              <h1>Name: {setUser(user)}</h1>
              <p>Comment: {chat.comment}</p>
              <p>Time: {chat.time}</p>
              <button onClick={() => { update(chat.id, chat.comment) }}>edit comment</button>
              <button className='bg-red
              
              -600 m-2 px-2 rounded text-white' onClick={() => { deleteComment(chat.id) }}>Delete</button>
            </div>
          })}

        </div>
      }
      {
        !modal &&
        <div className='flex'>
          <div className=''>
            <input onChange={(event) => { setNewChat(event.target.value) }} className='placeholder-slate-400 p-2 rounded-md m-8 w-[40rem]' placeholder='Enter comment' />
          </div>

          <div className='my-auto'>
            <img src={sendBtn} onClick={send} className="w-[2.3rem]" alt="sendBtn" />
          </div>
        </div>
      }
      
      {/* <AuthDetails /> */}
    </div>
  )
}

export default App