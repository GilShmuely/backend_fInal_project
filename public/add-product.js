import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCG8KKa5aZsPhkqQh49c3A7MvFZPzt7zqI",
    authDomain: "backend-final-project-ono.firebaseapp.com",
    projectId: "backend-final-project-ono",
    storageBucket: "backend-final-project-ono.appspot.com",
    messagingSenderId: "736242187137",
    appId: "1:736242187137:web:3541fc1ce17dbbba12c680"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function addProduct(userId) {
    let product_name = document.getElementById("add-productNameInput").value;
    let product_price = document.getElementById("add-productPrice").value;
    let product_description = document.getElementById("add-productDescription").value;
    let product_image = document.getElementById("add-productPhotoLink").value;
    let product_category = document.getElementById("add-productCategory").value;
    if (!product_name || !product_price || !product_description || !product_image || !product_category) {
        alert('Please fill out all fields');
        return;
    }else{
    try {
        await addDoc(collection(db, "products"), {
            product_name: product_name,
            product_description: product_description,
            product_category: product_category,
            product_price: product_price,
            product_image: product_image,
            userId: userId  // Include the user ID
        });
        alert('Product added');
        window.location.href = "main-dash.html";
    } catch (e) {
        console.error('Error adding product: ', e);
        alert(e.message);
    }
}}

document.addEventListener('DOMContentLoaded', () => {
    let addProductButton = document.getElementById("addProductButton");
    addProductButton.addEventListener("click", () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                addProduct(user.uid); // Pass the user ID to the addProduct function
            } else {
                alert('You must be logged in to add a product');
            }
        });
    });
});
