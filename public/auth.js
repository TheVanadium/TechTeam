// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    connectAuthEmulator,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    browserSessionPersistence,
    setPersistence
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








//set error message function
function setErrorFor(input, message)
{
  document.getElementById(input).innerHTML = message;
}








    //sign up
var signupForm = document.querySelector('#register');
signupForm.addEventListener('submit', (e) =>{
  
    //get user info
    const id = signupForm['signupId'].value.trim(); //!!! trim()
    const email = signupForm['signupEmail'].value;
    const password = signupForm['signupPassword'].value;
    var tempToken = 0;
    

      if(id.substr(0,4)!="1306")
    {
      setErrorFor('signupIdMsg', "Invalid User Id!!!!");
      tempToken++;
      setTimeout(function(){
        document.getElementById('signupId').classList.add("input-box-no");
        }, 10); 
        document.getElementById('signupId').classList.remove("input-box-no");
    }
      if(email.trim()=="")
    {
      setErrorFor('signupEmailMsg', "Invalid Email Format!")
      tempToken++;
      setTimeout(function(){
        document.getElementById('signupEmail').classList.add("input-box-no");
        }, 10); 
        document.getElementById('signupEmail').classList.remove("input-box-no");
    }
      if(password.trim()=="")
    {
      setErrorFor('signupPasswordMsg', "At Least 12 Characters And Contains A Special Letter!");
      tempToken++;
      setTimeout(function(){
        document.getElementById('signupPassword').classList.add("input-box-no");
        }, 10); 
        document.getElementById('signupPassword').classList.remove("input-box-no");
    }



    if(tempToken==0){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("User signed up!")

            document.getElementById('signupId').classList.add("input-box-yes");
            document.getElementById('signupEmail').classList.add("input-box-yes");
            document.getElementById('signupPassword').classList.add("input-box-yes");
            setErrorFor('signupIdMsg', "");
            setErrorFor('signupEmailMsg', "");
            setErrorFor('signupPasswordMsg', "");

            setTimeout(function(){
              location.reload();
              }, 1000); 
            })
        .catch((error) => {
            console.log(error);
        });
    } 
    e.preventDefault();
})










    //login
const loginForm = document.querySelector('#login');
loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    //get user info
    const email = loginForm['loginEmail'].value;
    const password = loginForm['loginPassword'].value;
    var tempToken = 0;
    


      if(email.trim()=="")
    {
      setErrorFor('loginEmailMsg', "Invalid Email!")
      tempToken++;
      setTimeout(function(){
        document.getElementById('loginEmail').classList.add("input-box-no");
        }, 10); 
        document.getElementById('loginEmail').classList.remove("input-box-no");
    }
      if(password.trim()=="")
    {
      setErrorFor('loginPasswordMsg', "Invalid Password!");
      tempToken++;
      setTimeout(function(){
        document.getElementById('loginPassword').classList.add("input-box-no");
        }, 10); 
        document.getElementById('loginPassword').classList.remove("input-box-no");
    }



    if(tempToken==0)
    {
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    document.getElementById('loginEmail').classList.add("input-box-yes");
    document.getElementById('loginPassword').classList.add("input-box-yes");
    setErrorFor('loginEmailMsg', "");
    setErrorFor('loginPasswordMsg', "");



    setTimeout(function(){
      location.href="task.html";
      // window.open("task.html");
      }, 1000);

  })

  

  .catch((error) => {
    setErrorFor('loginEmailMsg', "Invalid Email!")
      setErrorFor('loginPasswordMsg', "Invalid Password!");
    setTimeout(function(){
      document.getElementById('loginPassword').classList.add("input-box-no");
      document.getElementById('loginEmail').classList.add("input-box-no");
      }, 10); 
      document.getElementById('loginEmail').classList.remove("input-box-no");
      document.getElementById('loginPassword').classList.remove("input-box-no");
    const errorCode = error.code;
    const errorMessage = error.message;
  });
    }
})











// firebase.auth().setPersistence('session')
//   .then(() => {

//     console.log("Already Sign In.");
//     return signInWithEmailAndPassword(auth, email, password);
    
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });










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
