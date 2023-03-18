import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1t9XqPPUXz-C8R7ZeiQPPqxGq9lA6mqw",
  authDomain: "chats-14e92.firebaseapp.com",
  projectId: "chats-14e92",
  storageBucket: "chats-14e92.appspot.com",
  messagingSenderId: "216143412825",
  appId: "1:216143412825:web:31aec1b82540b8e6e17b48"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
//export const check = onAuthStateChanged(auth)