import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";

import { getFirestore,
        collection, 
        addDoc,
        doc,
        setDoc,
        getDocs,
        getDoc,
        query,
        where,
        updateDoc
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





    auth.onAuthStateChanged(function(user) {
        if (user) {
            setProfile(user, user.email);
        } else {
            location.href="stls.html";
        }
        });


    









    
    async function setProfile(user, email)
    {
        //get all elements
        let name = document.getElementById('name');
        let id = document.getElementById('id');
        let create = document.querySelectorAll('#create');
        let check = document.querySelectorAll('#check');
        let img = document.querySelector('img');




        //query user's data based on email
        const q = query(collection(db, "users"), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            name.setAttribute('value', doc.data().name);
            id.setAttribute('value', doc.data().id);
            });







        for(let i=0; i<create.length; i++)
        {
            create[i].addEventListener('click', function() {
                this.parentNode.querySelector('input').style.pointerEvents="auto";
                this.parentElement.classList.add('edit');
                this.parentNode.querySelector('input').disabled = false;
            })

            check[i].addEventListener('click', function() {
                if(this.parentNode.querySelector('input').id=="name")
                {
                    const val = this.parentNode.querySelector('input').value;
                    updateDoc(doc(db, "users", email), { 
                        name:val
                    })
                }

                else if(this.parentNode.querySelector('input').id=="id")
                {
                    const val = this.parentNode.querySelector('input').value;
                    updateDoc(doc(db, "users", email), { 
                        id:val
                    })
                }
                this.parentElement.classList.remove('edit');
                this.parentNode.querySelector('input').disabled = true;
                this.parentNode.querySelector('input').style.pointerEvents="none";
            })
        }



        img.addEventListener('click', function() {
            img.classList.toggle('labelHome');
        })
    }