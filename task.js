//getting all required elements
const inputBox = document.querySelector(".inputfield input");
const addBtn = document.querySelector(".inputfield button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() != 0){ //if user values aren't only space
        addBtn.classList.add("active"); //active the add button
    }else{
        addBtn.classList.remove("active");
    }
}
