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
        // newLiTag = `<li> $({)element).value <span onclick="deleteTask(${index})";><ion-icon name="trash-outline" id="delete"></ion-icon><li>`;
        newLiTag = inputBox.value;
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
