//Firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    getDocs,
    doc,
    query,
    where,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

import { firebaseConfig } from "./Firebase.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig());

const db = getFirestore(app);
const auth = getAuth(app);
const user = auth.currentUser;
const allRequests = collection(db, "request");

//This checks the if user is logged in, if not then user will not be able to access this page
auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log("Success!");
    } else {
        location.href = "stls.html";
    }
});

//getting all required elements
// const inputBox = document.querySelector('.inputfield input');
// const addBtn = document.querySelector('.inputfield button');
const todoList = document.querySelector(".tasks");
const list = document.getElementsByClassName("tags");
const networkRequest = query(allRequests, where("option", "==", "Network"));
const printerRequest = query(allRequests, where("option", "==", "Printer"));
const otherRequest = query(allRequests, where("option", "==", "Other"));
const chromeRequest = query(allRequests, where("option", "==", "Chromebook"));

//declare tempDeleteMsg as a global variable(outside of any function)
//tempDeleteMsg is deleteMsg input to confirm delete task.
//To confirm deletion user must enter the corresponding id of the task
let tempDeleteMsg;

//adding li tags from database for printerRequest
constructTask(
    await getDocs(printerRequest),
    document.getElementById("c1Tasks")
);
constructTask(
    await getDocs(networkRequest),
    document.getElementById("c2Tasks")
);
constructTask(await getDocs(chromeRequest), document.getElementById("c3Tasks"));
constructTask(await getDocs(otherRequest), document.getElementById("c4Tasks"));

checkTaskNumber("c1");
checkTaskNumber("c2");
checkTaskNumber("c3");
checkTaskNumber("c4");

//function that construct and append task li
function constructTask(requests, tasks) {
    requests.forEach((doc) => {
        var id = doc.data().id;
        var fullName = doc.data().fullName;
        var studentName;
        if (doc.data().studentName != "") {
            studentName = `<br/><span>Student name: </span>${
                doc.data().studentName
            }`;
        } else {
            studentName = "";
        }
        var email = `<br/><span>Email: </span>${doc.data().email}`;
        var phoneNumber;
        if (doc.data().phoneNumber != "") {
            phoneNumber = `<br/><span>Phone number: </span>${
                doc.data().phoneNumber
            }`;
        } else {
            phoneNumber = "";
        }
        var description = `<br/><span>Description: </span>${
            doc.data().description
        }`;

        //construct & add li tag
        let newListItem = document.createElement("li");
        newListItem.innerHTML = `<li class="tags"><ion-icon name="ellipse" id=level></ion-icon> <span id=id>${id}</span> ${fullName} 
        <ion-icon name="hand-right-outline" id="assign"></ion-icon><ion-icon name="trash-outline" id="delete"></ion-icon>
        ${studentName}
        ${email}
        ${phoneNumber}
        ${description}
        </li>`;

        newListItem.addEventListener("click", function () {
            this.classList.toggle("tags-read-more");
            this.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });

        tasks.appendChild(newListItem);
    });
}

//Added assign and delete function for all the li tags (tasks)
for (var i = 0; i < list.length; i++) {
    list[i].addEventListener("click", function () {
        this.classList.toggle("tags-read-more");
        this.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    //assign button
    list[i].querySelector("#assign").addEventListener("click", function (e) {
        e.stopPropagation();
        console.log("assign");
    });

    //delete button
    list[i].querySelector("#delete").addEventListener("click", function (e) {
        e.stopPropagation();
        let deleteMsgWrapper = document.getElementById("deleteMsgWrapper");
        let deleteMsg = document.getElementById("deleteMsg");
        tempDeleteMsg = this.parentNode.querySelector("#id").innerHTML;

        //show the delete msg prompt
        deleteMsgWrapper.style.zIndex = 1;
        deleteMsg.style.zIndex = 1;

        //customize h1 tag
        deleteMsg.querySelector(
            "h1"
        ).innerHTML = `Do you really want to delete <br/>"<span>${
            this.parentNode.querySelector("#id").innerHTML
        }</span>" ?`;

        //focus input
        deleteMsg.querySelector("input").focus();
        // submit eventlistener only works in <form>

        //cancle button
        deleteMsg
            .querySelector("button")
            .addEventListener("click", function (e) {
                deleteMsgWrapper.style.zIndex = -1;
                deleteMsg.style.zIndex = -1;
            });
        console.log("trash");
    });
}

//delete a task li
deleteMsg.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    if (deleteMsg.querySelector("input").value != tempDeleteMsg) {
        deleteMsg.querySelector("input").classList.remove("yes");
        setTimeout(function () {
            deleteMsg.querySelector("input").classList.add("no");
        }, 10);
        deleteMsg.querySelector("input").classList.remove("no");
    } else {
        deleteMsg.querySelector("input").classList.remove("no");
        setTimeout(function () {
            deleteMsg.querySelector("input").classList.add("yes");
        }, 10);
        deleteMsg.querySelector("input").classList.remove("yes");
        deleteDoc(doc(allRequests, tempDeleteMsg));

        setTimeout(function () {
            location.reload();
        }, 1000);
    }
});

//This function check the number of tasks in a cat
function checkTaskNumber(task) {
    let taskNumber = document.querySelector(
        `.${task} .tasks`
    ).childElementCount;
    document.querySelector(`.${task} #counter`).textContent = `${taskNumber}`;
    if (taskNumber == 0) {
        document.querySelector(`.${task} .tasksMessage`).textContent =
            "There are no task rn";
        document.querySelector(`.${task}`).style.height = "300px";
    }
}

/*
//detects input
inputBox.onkeyup = () =>{
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() != 0){ //if user values aren't only space
        addBtn.classList.add("active"); //active the add button
    }else{
        addBtn.classList.remove("active");
    }
}

    //if user click on the add button
    addBtn.onclick = () =>{
        let userData = inputBox.value; //getting user entered value
    }

    */

//I need to add date to when request is recorded. The date will appear on the task
//It will also affect the dot-indicator's color. The date will also help construct
//a trash cat that holds deleted task and auto delete them after a month
