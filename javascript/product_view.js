// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3WxZBaNJoZA2p7oe6ihTJCFOE6Y0U_7Q",
    authDomain: "dropshipping-98eb5.firebaseapp.com",
    projectId: "dropshipping-98eb5",
    storageBucket: "dropshipping-98eb5.appspot.com",
    messagingSenderId: "904925867242",
    appId: "1:904925867242:web:af0abda866826e92f8fb93",
    measurementId: "G-BVZR8HY1SR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to get query parameters from the URL
function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to fetch and display the product details
function displayProductDetails() {
    const productId = getQueryParameter('id');
    
    if (productId) {
        console.log('Fetching details for product ID:', productId);
        const productRef = ref(database, `products/${productId}`);
        get(productRef).then(snapshot => {
            const productData = snapshot.val();
            console.log('Product data fetched:', productData);

            if (productData) {
                // Update HTML elements with product data
                document.getElementById('productName').textContent = productData.name || 'No Name';
                document.getElementById('productDescription').textContent = productData.description || 'No Description';
                document.getElementById('productPrice').textContent = '₹ ' + (productData.price || 'N/A');
                document.getElementById('productOldPrice').textContent = productData.oldPrice ? '$ ' + productData.oldPrice : '';

                // Update image source
                const imageUrl = productData.imageUrl || '';
                const productImageMobile = document.getElementById('productImageMobile');
                const productImageDesktop = document.getElementById('productImageDesktop');

                // Check if the image URL is valid
                if (imageUrl) {
                    productImageMobile.src = imageUrl;
                    productImageDesktop.src = imageUrl;
                } else {
                    console.error('Invalid image URL:', imageUrl);
                }
            } else {
                // Handle the case where the product does not exist
                document.querySelector('main').innerHTML = '<p>Product not found.</p>';
            }
        }).catch(error => {
            console.error('Error fetching product data:', error);
            document.querySelector('main').innerHTML = '<p>Error loading product details. Check the console for more details.</p>';
        });
    } else {
        // Handle the case where no product ID is provided in the URL
        document.querySelector('main').innerHTML = '<p>Invalid product ID.</p>';
    }
}

// Function to handle adding the product to the cart
function addToCart() {
    const productId = getQueryParameter('id');

    if (productId) {
        const productRef = ref(database, `products/${productId}`);
        get(productRef).then(snapshot => {
            const productData = snapshot.val();

            if (productData) {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingItemIndex = cart.findIndex(item => item.id === productId);

                if (existingItemIndex > -1) {
                    cart[existingItemIndex].quantity += 1; // Increment quantity
                } else {
                    cart.push({
                        id: productId,
                        name: productData.name,
                        price: productData.price,
                        imageUrl: productData.imageUrl,
                        quantity: 1
                    });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                alert('Product added to cart!');
            }
        }).catch(error => {
            console.error('Error adding product to cart:', error);
            alert('Error adding product to cart. Check the console for more details.');
        });
    } else {
        alert('No product ID found.');
    }
}

// Event listener for the Add to Cart button
document.querySelector('.card__btn').addEventListener('click', addToCart);

// Call the function to display the product details when the page loads
displayProductDetails();
