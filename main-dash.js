const products = [
    { name: 'Product 1', price: 10, Image: 'https://via.placeholder.com/150' },
    { name: 'Product 2', price: 20, Image: 'https://via.placeholder.com/150' },
    { name: 'Product 3', price: 30, Image: 'https://via.placeholder.com/150' },
    // Add more products here
];

const container = document.getElementById('container');

products.forEach(product => {
    const box = document.createElement('div');
    box.classList.add('box');
    box.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <img src="${product.image || 'https://via.placeholder.com/150'}" alt="${product.name}">
    `;
    container.appendChild(box);
});


const filterByPrice = (products, maxPrice) =>{
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