import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, doc, getDoc, deleteDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
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
const productDetailsDiv = document.getElementById('product-details');

async function fetchProductDetails() {
    try {
        const productDoc = await getDoc(doc(db, "products", productID));
        if (productDoc.exists()) {
            const product = productDoc.data();
            productDetailsDiv.innerHTML = `
                <h3>${product.product_name}</h3>
                <p>Price: $${product.product_price}</p>
                <p>${product.product_description}</p>
                <p>Category: ${product.product_category}</p>
                <p> Product ID: ${productID}</p>    
                <img src="${product.product_image || 'https://via.placeholder.com/150'}" alt="${product.product_name}">
            `;
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.error('Error fetching product details: ', e);
        alert(e.message);
    }
}

fetchProductDetails();

async function deleteProduct() {
    try {
        const user = auth.currentUser;
        if (user) {
            const productDoc = await getDoc(doc(db, 'products', productID));
            if (productDoc.exists() && productDoc.data().userId === user.uid) {
                await deleteDoc(doc(db, 'products', productID));
                alert('Product deleted');
                window.location.href = "main-dash.html";
            } else {
                alert("You are not authorized to delete this product.");
            }
        } else {
            alert("You need to be logged in to delete a product.");
        }
    } catch (e) {
        console.error('Error deleting product: ', e);
        alert(e.message);
    }
}

document.getElementById('deleteProductBtn').addEventListener('click', deleteProduct);

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, fetch product details
        fetchProductDetails();
    } else {
        // User is signed out
        alert("You need to be logged in to view or delete this product.");
        window.location.href = "login.html";
    }
});

document.getElementById('editProductBtn').addEventListener('click', function (){window.location.href = `product-update.html?id=${productID}`;});