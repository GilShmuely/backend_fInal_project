
import { initializeApp } from
    "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyCG8KKa5aZsPhkqQh49c3A7MvFZPzt7zqI",
    authDomain: "backend-final-project-ono.firebaseapp.com",
    projectId: "backend-final-project-ono",
    storageBucket: "backend-final-project-ono.appspot.com",
    messagingSenderId: "736242187137",
    appId: "1:736242187137:web:3541fc1ce17dbbba12c680"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


document.getElementById("signup-button").addEventListener("click", checkPassword);

let password_input = document.getElementById("password-signup-input");
let password_confirmation_input = document.getElementById("confirm-password-signup-input");
async function registerUser() {
    const email = document.getElementById("email-signup-input").value;
    const password = document.getElementById("password-signup-input").value;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created' + userCredential.user);
        alert('User created, transfering to main page');
        window.location.href = "main-dash.html";
    } catch (e) {
        console.error('Error signing up' + e);
        alert(e.message);
    }}
function checkPassword() {
    if (password_confirmation_input.value === password_input.value) {
       registerUser();
        }
     else {
        alert("passwords dont match");
     }}


