import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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

async function addProduct() {
    let product_name = document.getElementById("add-productNameInput").value;
    let product_price = document.getElementById("add-productPrice").value;
    let product_description = document.getElementById("add-productDescription").value;
    let product_image = document.getElementById("add-productPhotoLink").value;
    let product_category = document.getElementById("add-productCategory").value;

    try {
        await addDoc(collection(db, "products"), {
            product_name: product_name,
            product_description: product_description,
            product_category: product_category,
            product_price: product_price,
            product_image: product_image,
        });
        alert('Product added');
        window.location.href = "main-dash.html";
    } catch (e) {
        console.error('Error adding product: ', e);
        alert(e.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let addProductButton = document.getElementById("addProductButton");
    addProductButton.addEventListener("click", addProduct);
});
