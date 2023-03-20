import React, { useEffect, useContext } from 'react'
import { db } from '../fb-config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp} from "firebase/firestore"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../fb-config'
import { UserContext } from '../App';
import AuthDetails from './AuthDetails';
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
  const [currentUser, setCurrentUser] = useContext(UserContext)
  const [chats, setChats] = React.useState([])
  const [newChat, setNewChat] = React.useState("")
  const chatRef = collection(db, "chats")
  //const [modal, setModal] = React.useState(true)
 
  useEffect(() => {
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
  }, [])

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
    setNewChat("")
    console.log(currentUser)
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

  return (
    <div>
      <div className=''>
        {chats.map((chat) => {
          return <div className='flex bg-blue-100  rounded-lg p-2 w-full mx-3 my-2' key={chat.id}>
            <div>
              <img src={chat1} alt='chat-icon' />
            </div>

            <div className='block p-2 my-4'>
              <h1>user: {currentUser}</h1>
              <p>Comment: {chat.comment}</p>
              <p>Time: {chat.time}</p>
              <button onClick={() => { update(chat.id, chat.comment) }}>edit comment</button>
              <button className='bg-red-600 bl m-2 px-2 rounded text-white' onClick={() => { deleteComment(chat.id) }}>Delete</button>
            </div>
            {/* <button  onClick={signOut => alert("hhh")} className='bg-red-500 text-white px-2 py-1 rounded'>Sign out</button> */}
          </div>
        })}

      </div>

      <div className='flex w-full'>
        <div className=' w-full p-6'>
          <input onChange={(event) => { setNewChat(event.target.value) }} className='placeholder-slate-400 p-2 rounded-md  w-full' placeholder='Enter comment' />
        </div>

        <div className='my-auto'>
          <img src={sendBtn} onClick={send} className="w-[2.3rem] cursor-pointer" alt="sendBtn" />
        </div>
      </div>

      <AuthDetails />
    </div>
  )
}

export default ChatRoom