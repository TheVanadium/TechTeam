// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYbHvFRpO1vwjo8zTeGlQOmgTETfO_5u4",
  authDomain: "cvtechteam-c44a2.firebaseapp.com",
  projectId: "cvtechteam-c44a2",
  storageBucket: "cvtechteam-c44a2.appspot.com",
  messagingSenderId: "724830760584",
  appId: "1:724830760584:web:f103595593f11349ed793d",
  measurementId: "G-WF0BXB7HLT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

//Detect auth state