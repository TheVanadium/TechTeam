import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore,
        collection, 
        addDoc,
        doc,
        setDoc
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

import { firebaseConfig } from "./Firebase.js";



    const app = initializeApp(firebaseConfig());
    const db = getFirestore(app);









    let submit = document.querySelector('.requestForm');
    let form = document.querySelector('#form');
    submit.addEventListener('submit', (e) =>{
        e.preventDefault();


        var tempToken = 0;
        const fullName = form['fullName'].value;
        const studentName = form['studentName'].value;
        const email = form['email'].value;
        const phoneNumber = form['phoneNumber'].value;
        const id = form['id'].value;
        const option = form['option'].value;
        const textArea = form['textArea'].value;

        if(fullName.trim()=="")
        {
            tempToken++;
            setTimeout(function(){
                document.getElementById('fullName').classList.add("input-box-no");
                }, 10); 
                document.getElementById('fullName').classList.remove("input-box-no");
        }

        if(email.trim()=="")
        {
            tempToken++;
            setTimeout(function(){
                document.getElementById('email').classList.add("input-box-no");
                }, 10); 
                document.getElementById('email').classList.remove("input-box-no");
        }

        if(id.trim()=="")
        {
            tempToken++;
            setTimeout(function(){
                document.getElementById('id').classList.add("input-box-no");
                }, 10); 
                document.getElementById('id').classList.remove("input-box-no");
        }

        if(textArea.trim()=="")
        {
            tempToken++;
            setTimeout(function(){
                document.getElementById('textArea').classList.add("input-box-no");
                }, 10); 
                document.getElementById('textArea').classList.remove("input-box-no");
        }




        if(tempToken==0)
        {
            const users = collection(db, 'request');
            setDoc(doc(users, id), {
                fullName:fullName,
                studentName:studentName,
                email:email,
                phoneNumber:phoneNumber,
                id:id,
                option:option,
                description:textArea
            });
            document.getElementById('studentName').classList.add("input-box-yes");
            document.getElementById('email').classList.add("input-box-yes");
            document.getElementById('phoneNumber').classList.add("input-box-yes");
            document.getElementById('id').classList.add("input-box-yes");
            document.getElementById('option').classList.add("input-box-yes");
            document.getElementById('textArea').classList.add("input-box-yes");
            document.getElementById('msg').innerHTML="Submit Successful!";
            setTimeout(function(){
            location.reload();
            }, 1000); 
        }
        else
        {
            document.getElementById('msg').innerHTML=`<h1 style="color:#9e0101; font-size: 1.5rem";>Something Went Wrong! <ion-icon name="arrow-up-outline"></ion-icon>`;
        }
    })