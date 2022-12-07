// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    connectAuthEmulator,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { firebaseConfig } from "./Firebase.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig());

const db = getFirestore(app);
const auth = getAuth(app);
const user = auth.currentUser;

document.querySelector("#arrLeft").addEventListener("click", function () {
    document.querySelector(".slider-inner").scrollBy(-1000, 0);
});
document.querySelector("#arrRight").addEventListener("click", function () {
    document.querySelector(".slider-inner").scrollBy(1000, 0);
});
