import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";

import { getFirestore,
        collection, 
        addDoc,
        doc,
        setDoc
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

import { 
    getAuth, 
    signInWithEmailAndPassword, 
    connectAuthEmulator,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    browserSessionPersistence,
    setPersistence
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";



const firebaseConfig = {
    apiKey: "AIzaSyAYbHvFRpO1vwjo8zTeGlQOmgTETfO_5u4",
    authDomain: "cvtechteam-c44a2.firebaseapp.com",
    projectId: "cvtechteam-c44a2",
    storageBucket: "cvtechteam-c44a2.appspot.com",
    messagingSenderId: "724830760584",
    appId: "1:724830760584:web:f103595593f11349ed793d",
    measurementId: "G-WF0BXB7HLT"
    };



    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    const user = auth.currentUser;
    const users = collection(db, 'users');


    
    auth.onAuthStateChanged(function(user) {
        if (user) {
            setProfile(user);
          // User is signed in.
        } else {
          // No user is signed in.
            location.href="stls.html";
        }
        });








    
    function setProfile(user)
    {
        let name = document.getElementById('name');
        let id = document.getElementById('id');
        let create = document.querySelectorAll('#create');
        let check = document.querySelectorAll('#check');

        name.setAttribute('value', 'Enter Name');
        id.setAttribute('value', 'Enter Id');



        for(let i=0; i<create.length; i++)
        {
            create[i].addEventListener('click', function() {
                this.parentElement.classList.add('edit');
                this.parentNode.querySelector('input').disabled = false;
            })
            check[i].addEventListener('click', function() {
                this.parentElement.classList.remove('edit');
                this.parentNode.querySelector('input').disabled = true;
            })
        }
    }