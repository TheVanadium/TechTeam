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


function setError(input, message)
{
  const formControl = input.parentElement(); //form-control
  const p = formControl.querySelector("#msg");
  
  p.innerHTML(message);
  
  
}

//sign up
const signupForm = document.querySelector('#register');
signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    //get user info
    const id = signupForm['signupId'].value.trim(); //!!! trim()
    const email = signupForm['signupEmail'].value;
    const password = signupForm['signupPassword'].value;
    
    if(id==="")
    {
      setErrorFor(id, "TEST LOL");
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("User signed up!")
    signupForm.reset();
  })
  .catch((error) => {
    console.log(error);
  });
    }

    
})

const loginForm = document.querySelector('#login');
loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    //get user info
    const email = loginForm['loginEmail'].value;
    const password = loginForm['loginPassword'].value;

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
})


//Set an authentication state observer and get user data For each of your app's pages that 
//need information about the signed-in user, attach an observer to the global authentication 
//object. This observer gets called whenever the user's sign-in state changes. Attach the 
//observer using the onAuthStateChanged method. When a user successfully signs in, you can 
//get information about the user in the observer.
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});



//Get user's profile
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;
  
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
}


export const showLoginError = (error) => {
    divLoginError.style.display = "block";
    if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
        lblLoginErrorMessage.innerHTML = 'Wrong Password. Try again.';
    }
    else{
        lblLoginErrorMessage.innerHTML = 'Error: ${error.message}';
    }
}
