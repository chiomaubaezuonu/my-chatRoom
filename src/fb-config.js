import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyADIvhG3JYsrv4NXjqzO04e8L-Mk4zWDcQ",
    authDomain: "chats-6b07c.firebaseapp.com",
    projectId: "chats-6b07c",
    storageBucket: "chats-6b07c.appspot.com",
    messagingSenderId: "772381002599",
    appId: "1:772381002599:web:a0001715cd501c16b6fdc2",
    measurementId: "G-0XWG79QC9G"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
//export const check = onAuthStateChanged(auth)