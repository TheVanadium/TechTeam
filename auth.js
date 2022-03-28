//sign up
const signupForm = document.querySelector('#register');
signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    //get user info
    const email = signupForm['#signupEmail'].value;
    const password = signupForm['#signupPassword'].value;

    console.log(email, password);
})