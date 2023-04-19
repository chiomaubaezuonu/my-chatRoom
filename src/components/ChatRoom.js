import React, { useEffect, useContext, useRef } from 'react'
import { db } from '../fb-config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, serverTimestamp, query, onSnapshot } from "firebase/firestore"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../fb-config'
import { UsernameContext, AuthContext } from '../App';
import AuthDetails from './AuthDetails';
import moment, { Moment } from 'moment/moment';
import chat1 from "../images/chat1.png"
import sendBtn from "../images/sendBtn.png"
import SendMessage from './sendMessage';
import Navbar from './Navbar';

const ChatRoom = () => {
  const chatEndRef = useRef();
  const [newUser, setNewUser] = useContext(UsernameContext)
  const [email, setEmail] = useContext(AuthContext)
  const [chats, setChats] = React.useState([])
  const [newChat, setNewChat] = React.useState("")
  const chatRef = collection(db, "chats");
  const auth = getAuth();
  const user = auth.currentUser;
  //const [modal, setModal] = React.useState(true)

  //get data
  // useEffect(() => {
  //   const q = query(chatRef, orderBy('createdAt', 'asc'))
  //   getDocs(q, chatRef)
  //     .then((snapshot) => {
  //       const docs = snapshot.docs
  //       setChats(docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data()
  //         }
  //       }))
  //     })
  // }, [])


  const scrollToBottom = () => {
    chatEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [chats])
  // Real time data collection with onSnapshot
  const q = query(chatRef, orderBy('createdAt', 'asc'))
  onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs
    setChats(docs.map((doc) => ({

      id: doc.id,
      ...doc.data()

    })))
  })
  //addDoc
  const send = async (e) => {
    e.preventDefault()
    if (newChat.trim() === "") {
      alert("Enter valid message")
      return "";
    }

    await addDoc(chatRef, {
      comment: newChat,
      user: newUser,
      createdAt: serverTimestamp(),
    })
    setNewChat("")
  };
  //update
  // const update = async (id, comment) => {
  //   const chatDoc = doc(db, "chats", id)
  //   const newFields = {
  //     comment: ""
  //   }
  //   await updateDoc(chatDoc, newFields)
  // }

  //deleteDoc
  const deleteComment = async (id) => {
    const chatDoc = doc(db, "chats", id)
    await deleteDoc(chatDoc)
  }

  
  return (
    <div className=''>
      <Navbar />
      <div className='pb-44 pt-20'>
        {chats.map((chat) => {
          return <div key={chat.id} className={`chat ${user && chat.comment.uid === user.uid ? "chat-end" : "chat-start"}`}>
            <div className='m-2'>
              <div className='flex gap-2'>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src={chat1} alt='chatApp' />
                  </div>
                </div>
                <div className="chat-bubble">{chat.comment}</div>
              </div>
              <div className="chat-header text-black">
                <h1>From {chat.user}</h1>
              </div>
              <time className="text-xs text-black opacity-50">{chat.createdAt ? moment(chat.createdAt.toDate()).calendar() : ""}</time>
              <button className='bg-red-600 bl m-2 px-2 rounded text-white' onClick={() => { deleteComment(chat.id) }}>Delete</button>
              {/* <div className="chat-footer opacity-50">
                Delivered
              </div> */}
            </div>
          </div>
        })}
      </div>
      {/* <div className='w-full px-6 py-2 flex flex-col justify-center items-center'>
        {chats.map((chat) => {
          return <div className='flex bg-blue-100  rounded-lg p-2 w-full mx-2 my-2' key={chat.id}>
            <div>
              <img src={chat1} alt='chat-icon' />
            </div>
            <div className='block p-2 my-4'>
              <h1>user: {chat.user}</h1>
              <p>Comment: {chat.comment}</p>
              <p>Time: {chat.createdAt ? moment(chat.createdAt.toDate()).calendar() : ""}</p>    
              <button className='bg-red-600 bl m-2 px-2 rounded text-white' onClick={() => { deleteComment(chat.id) }}>Delete</button>
            </div>
          </div>
        })}
      </div>
      <div className='w-full px-6 py-2 flex justify-center items-center'>
        {currentUser}
        <div className=' w-full ml-1 mr-6 p-2 my'>
          <input value={newChat} onChange={(event) => { setNewChat(event.target.value) }} className='placeholder-slate-400 p-2 rounded-md  w-full' placeholder='Enter comment' />
        </div>

        <div className='my-auto w-84 mr-10'>
          <img src={sendBtn} onClick={send} className="w-[2rem] cursor-pointer" alt="sendBtn" />
        </div>
      </div>

      <AuthDetails /> */}


      {/* //daisyui */}



      <div className='bg-gray-400 fixed bottom-0 w-full py-10 shadow-lg'>
        <form onSubmit={send} className='containerWrap flex px-2'>
          <input value={newChat} onChange={(event) => { setNewChat(event.target.value) }} className='input w-full focus:outline-none text-gray-700 bg-gray-100 rounded-r-none' type='text' />
          <button type='submit' className='w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm'>Send</button>
        </form>
      </div>
      <div ref={chatEndRef}></div>
    </div>
  )
}

export default ChatRoom