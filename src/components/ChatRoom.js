import React, { useEffect, useContext, useRef, useState } from 'react'
import { db } from '../fb-config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, serverTimestamp, query, onSnapshot, QuerySnapshot } from "firebase/firestore"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../fb-config'
import { UsernameContext, AuthContext } from '../App';
import AuthDetails from './AuthDetails';
import moment, { Moment } from 'moment/moment';
import chat1 from "../images/chat1.png"
import sendBtn from "../images/sendBtn.png";
import deleteImg from "../images/deleteImg.svg"
import SendMessage from './sendMessage';
import Navbar from './Navbar';
import deleteIcon from "../images/deleteIcon.png"

const ChatRoom = () => {
  const chatEndRef = useRef();
  const [newUser, setNewUser] = useContext(UsernameContext)
  const [email, setEmail] = useContext(AuthContext)
  const [chats, setChats] = React.useState([])
  const [newChat, setNewChat] = React.useState("");
  const chatRef = collection(db, "chats");
  const auth = getAuth();
  const user = auth.currentUser;
  const [sendingMsg, setSendingMsg] = useState(false);
  const [deleteChat, setDeleteChat] = useState("")
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
  // Real time data collection with onSnapshot without useEffect or querySnapshot
  const q = query(chatRef, orderBy('createdAt', 'asc'))
  onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs;
    const chats = []
    docs.forEach((doc) => chats.push({

      id: doc.id,
      ...doc.data()

    }))
    setChats(chats)
  })
  // Real time data collection with onSnapshot with useEffect and querySnapshot
  // useEffect(() => {
  //   const q = query(chatRef, orderBy('createdAt', 'asc'))
  //   const unSubscribe = onSnapshot(q, (querySnapshot) => {
  //     const chats = [];
  //     querySnapshot.forEach((doc) => {
  //       chats.push({
  //         Id: doc.id,
  //         ...doc.data()
  //       })
  //       setChats(chats)
  //       //console.log(chats)
  //     })
  //     return () => unSubscribe();
  //   })
  // }, [])

  //addDoc
  const send = async (e) => {
    setSendingMsg(true)
    e.preventDefault();
    const { uid, displayName } = auth.currentUser
    if (newChat.trim() === "") {
      alert("Enter valid message")
      return "";
    } else {
      setNewChat(newChat)
      setNewChat("")
    }
    try {
      await addDoc(chatRef, {
        comment: newChat,
        user: displayName,
        createdAt: serverTimestamp(),
        uid,
      })
    }
    catch (err) {
      setSendingMsg(false)
      console.log(err)
    }
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
    setDeleteChat(id)
    console.log(deleteChat)
    const chatDoc = doc(db, "chats", id)
    await deleteDoc(chatDoc)
    setDeleteChat("")
  }
  return (
    <div className=''>
      <Navbar />
      <div className='pb-44 pt-20'>
        {chats.map((chat) => {
          return <div key={chat.id} className={`chat ${chat.uid === auth.currentUser.uid ? "chat-start" : "chat-end"}`}>
            <div className='m-2 check'>
              <div className='flex gap-2'>
                {/* {sendingMsg === true ? <p className='text-black opacity-50'>Typing...</p> : <p>sent</p> } */}
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src={chat1} alt='chatApp' />
                  </div>
                </div>
                <div className="chat-bubble bg-blue-500 text-white">{chat.comment}</div>
              </div>
              <div className="chat-header flex text-black">
                <h1 className='mt-2 mr-0'>From {chat.user}</h1>
                {deleteChat === chat.id ? <img className='w-6 ml-4' src={deleteImg} alt
                  delete-spinner /> : <img className='m-2 px-2 w-8 cursor-pointer rounded text-white' src={deleteIcon} alt='deleteIcon' onClick={() => { deleteComment(chat.id) }} />}
              </div>
              <time className="text-xs mt-3 text-black opacity-50">{chat.createdAt ? moment(chat.createdAt.toDate()).calendar() : ""}</time>

              {/* <div className="chat-footer opacity-50">
                Delivered
              </div> */}
            </div>
          </div>
        })}
      </div>
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