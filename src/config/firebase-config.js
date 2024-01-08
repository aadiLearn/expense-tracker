// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import "firebase/firestore"
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdFFWeQae2wCBSGg78YpSrGqumc_Ht2fc",
  authDomain: "expense-tracker-da4f6.firebaseapp.com",
  projectId: "expense-tracker-da4f6",
  storageBucket: "expense-tracker-da4f6.appspot.com",
  messagingSenderId: "1014440036164",
  appId: "1:1014440036164:web:68ee406768bdbac670f911"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
 export const provider = new GoogleAuthProvider(); 

 export const db = getFirestore(app)
