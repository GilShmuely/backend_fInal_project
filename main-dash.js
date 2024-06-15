
import { initializeApp } from
    "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, doc, getDocs, collection, deleteDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";


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
const container = document.getElementById('container');

async function fetchProducts() {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const products = productsSnapshot.docs.map(doc => doc.data());
    products.forEach(product => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.innerHTML = `
            <h3>${product.product_name}</h3>
            <p>Price: $${product.product_price}</p>
            <img src="${product.product_image || 'https://via.placeholder.com/150'}" alt="${product.name}">
        `;
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
    alert("All documents will be deleted. Are you sure you want to proceed?");
    const productsSnapshot = await getDocs(collection(db, "products"));
    const deletePromise = productsSnapshot.docs.forEach(async doc => {
        await deleteDoc(doc.ref);
    });
    await Promise.all(deletePromise);
    }


const filterByPrice = (products, maxPrice) => {
        return products.filter(product => product.price <= maxPrice);
    }

    const updateProducts = () => {
        const maxPrice = document.getElementById('max-price').value;
        const filteredProducts = filterByPrice(products, maxPrice);
        container.innerHTML = '';
        filteredProducts.forEach(product => {
            const box = document.createElement('div');
            box.classList.add('box');
            box.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <img src="${product.image || 'https://via.placeholder.com/150'}" alt="${product.name}">
        `;
            container.appendChild(box);
        });
    }

    async function fetchRandomProduct() {
        try {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            const products = data.products;
            const randomProduct = products[Math.floor(Math.random() * products.length)];

            displayProduct(randomProduct);
        }
        catch (error) {
            console.error(error);
        }
    }

    function displayProduct(product) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.innerHTML = `
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
        <img src="${product.images || 'https://via.placeholder.com/150'}" alt="${product.name}">
    `;
        container.appendChild(box);
    }

    document.getElementById('fetch-product-button').addEventListener('click', fetchRandomProduct);
    document.getElementById('deleteBtn').addEventListener('click', confirmDeletion);