// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    connectAuthEmulator,
    onAuthStateChanged,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

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

const db = getFirestore(app);
const auth = getAuth(app);
const user = auth.currentUser;

function animateImages()
{
    var img = document.querySelectorAll('.img');
    var scroll = document.querySelector(".slider")
    img.forEach(item => {
        scroll.addEventListener("scroll", e =>{
            // console.log(scroll.scrollLeft.toFixed(2));
            item.style.transform = `translateX(${scroll.scrollLeft/10}px)`;
        }, { passive: true })
    });
}

// animateImages();