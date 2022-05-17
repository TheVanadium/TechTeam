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



// connectAuthEmulator(auth, "http://localhost:9099");

//sign up
const signupForm = document.querySelector('#register');
signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    //get user info
    const email = signupForm['signupEmail'].value;
    const password = signupForm['signupPassword'].value;

    try {
//sign up the user
const userCredential = signInWithEmailAndPassword(auth, email, password);
console.log(userCredential.user);
    }
    catch(error) {
    console.log(error);
    try{
    createUserWithEmailAndPassword(email, password);

    }
    catch(error) {
        console.log("User already logged in");
    }
    }
    
    onAuthStateChanged(auth, (user) =>{
        if(user) {
            const uid = user.uid;
            console.log("Logged in successfully");
        }
        else{
            console.log("User is logged out");
        }
    })
    
    if(user !==null) {
         // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
  
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
    }
    
    
})


export const showLoginError = (error) => {
    divLoginError.style.display = "block";
    if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
        lblLoginErrorMessage.innerHTML = 'Wrong Password. Try again.';
    }
    else{
        lblLoginErrorMessage.innerHTML = 'Error: ${error.message}';
    }
}
