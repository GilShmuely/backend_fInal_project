import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, doc, getDocs, collection, deleteDoc, where, query, or, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
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
const container = document.getElementById('container');

async function fetchProducts() {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    products.forEach(product => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.innerHTML = `
            <h3>${product.product_name}</h3>
            <p>Price: $${product.product_price}</p>
            <img src="${product.product_image || 'https://via.placeholder.com/150'}" alt="${product.product_name}">
        `;
        box.addEventListener('click', () => { window.location.href = `product-details.html?id=${product.id}`; });
        container.appendChild(box);
    });
}
fetchProducts();

function confirmDeletion() {
    const userConfirmed = confirm("Are you sure you want to delete all documents?");
    if (userConfirmed) {
        deleteAllDocuments();
    } else {
        console.log("Deletion cancelled.");
    }
}

async function deleteAllDocuments() {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const deletePromise = productsSnapshot.docs.map(async doc => {
        await deleteDoc(doc.ref);
    });
    await Promise.all(deletePromise);
    alert("All documents have been deleted.");
}

async function updateProducts() {
    const maxPriceInput = document.getElementById('max-price-filter').value;
    const categoryInput = document.getElementById('categoryFilter').value;
    const productsRef = collection(db, "products");
    const q = query(productsRef, or(where("product_category", "==", categoryInput), where("product_price", "<=", maxPriceInput)));
    const querySnapshot = await getDocs(q);
    container.innerHTML = '';
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (maxPriceInput === '' && categoryInput === '') {
        fetchProducts();
    } else {
        products.forEach(product => {
            const box = document.createElement('div');
            box.classList.add('box');
            box.innerHTML = `
            <h3>${product.product_name}</h3>
            <p>Price: $${product.product_price}</p>
            <img src="${product.product_image || 'https://via.placeholder.com/150'}" alt="${product.product_name}">
        `;
            box.addEventListener('click', () => { window.location.href = `product-details.html?id=${product.id}`; });
            container.appendChild(box);
        });
    }
}

async function fetchRandomProduct(userId) {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        const products = data.products;
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        displayProduct(randomProduct);

        // Check for undefined fields
        const productName = randomProduct.title || 'Unknown Product';
        const productDescription = randomProduct.description || 'No description available';
        const productCategory = randomProduct.category || 'Uncategorized';
        const productPrice = randomProduct.price || 0;
        const productImage = (randomProduct.images && randomProduct.images[0]) || 'https://via.placeholder.com/150';

        try {
            await addDoc(collection(db, "products"), {
                product_name: productName,
                product_description: productDescription,
                product_category: productCategory,
                product_price: productPrice,
                product_image: productImage,
                userId: userId
            });
            alert('Product added');
            window.location.href = "main-dash.html";
        } catch (e) {
            console.error('Error adding product: ', e);
            alert(e.message);
        }
    } catch (error) {
        console.error(error);
    }
}

function displayProduct(product) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.innerHTML = `
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
        <img src="${product.images[0] || 'https://via.placeholder.com/150'}" alt="${product.title}">
    `;
    container.appendChild(box);
}

document.getElementById('fetch-product-button').addEventListener('click', () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            fetchRandomProduct(user.uid);
        } else {
            alert('You must be logged in to fetch a product');
        }
    });
});
document.getElementById('deleteBtn').addEventListener('click', confirmDeletion);
document.getElementById('addProductBtn').addEventListener('click', () => { window.location.href = 'add-product.html'; });
document.getElementById('filterBtn').addEventListener('click', updateProducts);

document.addEventListener('DOMContentLoaded', () => {
    let addProductButton = document.getElementById("addProductButton");
    addProductButton.addEventListener("click", () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchRandomProduct(user.uid); // Pass the user ID to the fetchRandomProduct function
            } else {
                alert('You must be logged in to add a product');
            }
        });
    });
});
