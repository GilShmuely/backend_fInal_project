
import { initializeApp } from
    "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";


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

async function loginUser() {
    const email = document.getElementById("email-login-input").value;
    const password = document.getElementById("password-login-input").value;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in' + userCredential.user);
        alert('User logged in - transfering to main dashboard page');
        window.location.href = "main-dash.html";
    } catch (e) {
        console.error('Error logging in' + e);
        alert(e.message);
    }
}
document.getElementById("signin-button").addEventListener("click", loginUser);
document.getElementById("signup-button").addEventListener("click",function() {window.location.href = "sign_up.html"});