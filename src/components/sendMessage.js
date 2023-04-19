import React, { useState } from 'react'
// import { UserAuth } from '../context/AuthContext';
// import { addDoc, collection, limit, orderBy, serverTimestamp } from 'firebase/firestore';
// import { db } from '../fbConfig';

const SendMsg = () => {
    const [value, setValue] = useState("");
    //const { currentUser } = UserAuth();

    const handleSendMsg = async (e) => {
        e.preventDefault();
        if (value.trim() === "") {
            alert("Enter valid message")
            return "";
        }
        // try {
        //     const { uid, displayName, photoUrl } = currentUser;
        //     await addDoc(collection(db, "messages"), {
        //         text: value,
        //         name: displayName,
        //         //avatar: photoUrl,
        //         createdAt: serverTimestamp(),
        //         uid
        //     })
        // }
        // catch (err) {
        //     console.log(err);

        // }
        setValue("")
    }

    return (
        <div className='bg-gray-400 fixed bottom-0 w-full py-10 shadow-lg'>
            <form onSubmit={handleSendMsg} className='containerWrap flex px-2'>
                <input value={value} onChange={e => setValue(e.target.value)} className='input w-full focus:outline-none text-gray-500 bg-gray-100 rounded-r-none' type='text' />
                <button type='submit' className='w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm'>Send</button>
            </form>
        </div>
    )
}

export default SendMsg