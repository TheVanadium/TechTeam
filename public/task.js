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

import { 
    getFirestore,
    collection,
    getDoc,
    getDocs,
    doc,
    onSnapshot,
    setDoc,
    query,
    where
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";






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
const colRef = collection(db, 'request');









const citiesRef = collection(db, "cities");
setDoc(doc(citiesRef, "SF"), {
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] });

    setDoc(doc(citiesRef, "LA"), {
        name: "Los Angeles", state: "CA", country: "USA",
        capital: false, population: 3900000,
        regions: ["west_coast", "socal"] });
    setDoc(doc(citiesRef, "DC"), {
        name: "Washington, D.C.", state: null, country: "USA",
        capital: true, population: 680000,
        regions: ["east_coast"] });
    setDoc(doc(citiesRef, "TOK"), {
        name: "Tokyo", state: null, country: "Japan",
        capital: true, population: 9000000,
        regions: ["kanto", "honshu"] });
    setDoc(doc(citiesRef, "BJ"), {
        name: "Beijing", state: null, country: "China",
        capital: true, population: 21500000,
        regions: ["jingjinji", "hebei"] });


        // const q = query(collection(db, "cities"), where("capital", "==", true));
        const q = query(collection(db, "cities"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    console.log(doc.data().name);
});






//getting all required elements
const inputBox = document.querySelector('.inputfield input');
const addBtn = document.querySelector('.inputfield button');
const todoList = document.querySelector('.tasks');



    
inputBox.onkeyup = () =>{
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() != 0){ //if user values aren't only space
        addBtn.classList.add("active"); //active the add button
    }else{
        addBtn.classList.remove("active");
    }

    //if user click on the add button
    addBtn.onclick = () =>{
        let userData = inputBox.value; //getting user entered value
        let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
        if(getLocalStorage == null){ //if localStorage is null
            listArr = []; //creating blank array
        }else{
            listArr = JSON.parse(getLocalStorage);
        }
        listArr.push(userData);
        localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
        showTasks(); //calling showTasks function
    }
}

function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){ //if localStorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    let newLiTag = '';
    listArr.array.forEach((element, index) => {
        // newLiTag = `<li> ${element}<span onclick="deleteTask(${index})";><ion-icon name="trash-outline" id="delete"></ion-icon><li>`;
        newLiTag = `<li>Testing<span id=level>emergcey level</span><ion-icon name="trash-outline" id="delete"></ion-icon></li>`
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
}

function deleteTask(){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index,1);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}