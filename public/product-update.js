import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
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

const productID = new URLSearchParams(window.location.search).get('id');
const productForm = document.querySelector('.form-container form');

async function fetchProductDetails() {
    try {
        const productDoc = await getDoc(doc(db, "products", productID));
        if (productDoc.exists()) {
            const product = productDoc.data();
            document.getElementById('productName').value = product.product_name;
            document.getElementById('description').value = product.product_description;
            document.getElementById('category').value = product.product_category;
            document.getElementById('price').value = product.product_price;
            document.getElementById('photoLink').value = product.product_image;
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.error('Error fetching product details: ', e);
        alert(e.message);
    }
}

async function updateProduct(e) {
    e.preventDefault();
    
    const productName = document.getElementById('productName').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const photoLink = document.getElementById('photoLink').value;

    try {
        await updateDoc(doc(db, "products", productID), {
            product_name: productName,
            product_description: description,
            product_category: category,
            product_price: price,
            product_image: photoLink
        });
        alert('Product updated successfully');
        window.location.href = "main-dash.html";
    } catch (e) {
        console.error('Error updating product: ', e);
        alert(e.message);
    }
}

document.getElementById('productForm').addEventListener('submit', updateProduct);

onAuthStateChanged(auth, (user) => {
    if (user) {
        fetchProductDetails();
    } else {
        alert("You need to be logged in to update this product.");
        window.location.href = "login.html";
    }
});
