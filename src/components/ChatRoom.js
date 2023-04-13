import React, { useEffect, useContext } from 'react'
import { db } from '../fb-config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, serverTimestamp, query, onSnapshot } from "firebase/firestore"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../fb-config'
import { UsernameContext, AuthContext } from '../App';
import AuthDetails from './AuthDetails';
import moment, { Moment } from 'moment/moment';
//const user = auth.currentUser;
// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });
import chat1 from "../images/chat1.png"
import sendBtn from "../images/sendBtn.png"

const ChatRoom = () => {
  const [currentUser, setCurrentUser] = useContext(UsernameContext)
  const [email, setEmail] = useContext(AuthContext)
  const [chats, setChats] = React.useState([])
  const [newChat, setNewChat] = React.useState("")
  const chatRef = collection(db, "chats")
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
  const send = async () => {
    if (newChat === "") {
      return;
    }
    await addDoc(chatRef, {
      comment: newChat,
      user: currentUser,
      createdAt: serverTimestamp()
    })
    if (newChat) {
      setNewChat("")
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
    const chatDoc = doc(db, "chats", id)
    await deleteDoc(chatDoc)
  }

  return (
    <div>
      <div className='w-full px-6 py-2 flex flex-col justify-center items-center'>
        {chats.map((chat) => {
          return <div className='flex bg-blue-100  rounded-lg p-2 w-full mx-2 my-2' key={chat.id}>
            <div>
              <img src={chat1} alt='chat-icon' />
            </div>
            <div className='block p-2 my-4'>
              <h1>user: {currentUser}</h1>
              <p>Comment: {chat.comment}</p>
              <p>Time: {chat.createdAt ? moment(chat.createdAt.toDate()).calendar() : ""}</p>
              {/* <button onClick={() => { update(chat.id, chat.comment) }}>edit comment</button> */}
              <button className='bg-red-600 bl m-2 px-2 rounded text-white' onClick={() => { deleteComment(chat.id) }}>Delete</button>
            </div>
            {/* <button  onClick={signOut => alert("hhh")} className='bg-red-500 text-white px-2 py-1 rounded'>Sign out</button> */}
          </div>
        })}
      </div>
      <div className='w-full px-6 py-2 flex justify-center items-center'>
        {currentUser}
        <div className=' w-full ml-1 mr-6 p-2 my'>
          <input onChange={(event) => { setNewChat(event.target.value) }} className='placeholder-slate-400 p-2 rounded-md  w-full' placeholder='Enter comment' />
        </div>

        <div className='my-auto w-84 mr-10'>
          <img src={sendBtn} onClick={send} className="w-[2rem] cursor-pointer" alt="sendBtn" />
        </div>
      </div>

      <AuthDetails />
    </div>
  )
}

export default ChatRoom