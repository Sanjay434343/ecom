// app.js
import { database } from './firebase/firebase.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const productsContainer = document.getElementById('products');

// Reference to your products in the Firebase Realtime Database
const productsRef = ref(database, 'products');

// Listen for changes in the database and update the UI
onValue(productsRef, (snapshot) => {
    productsContainer.innerHTML = ''; // Clear the container

    const data = snapshot.val();
    if (data) {
        Object.keys(data).forEach(key => {
            const product = data[key];
            const productElement = createProductElement(product);
            productsContainer.appendChild(productElement);
        });
    }
});

function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'grid-item';

    productDiv.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>$${product.price}</p>
        <button>View Details</button>
    `;

    return productDiv;
}
