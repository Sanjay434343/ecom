document.addEventListener('DOMContentLoaded', function() {
    renderCart();

    const form = document.getElementById('checkout-form');

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Retrieve form data
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData);

        // Store form data and cart data in local storage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const orderData = {
            contactInfo: {
                email: formObject['checkout-email'],
                phone: formObject['checkout-phone']
            },
            shippingAddress: {
                name: formObject['checkout-name'],
                address: formObject['checkout-address'],
                landmark: formObject['checkout-Landmark'],
                city: formObject['checkout-city'],
                country: formObject['checkout-country'],
                state: formObject['checkout-state'],
                postalCode: formObject['checkout-postal']
            },
            cart: cart,
            totalCost: totalCost.toFixed(2)
        };

        localStorage.setItem('orderData', JSON.stringify(orderData));

        // Redirect to the summary page or display stored details
        window.location.href = 'summary.html'; // Or use another method to display the order details
    });
});

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    const totalCostElement = document.getElementById('total-cost');
    const shippingCostElement = document.getElementById('shipping-cost');

    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalCostElement.textContent = '$0.00';
        return;
    }

    let totalCost = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'card';

        cartItem.innerHTML = `
            <div class="card-image">
                <img src="${item.imageUrl}" alt="${item.name}">
            </div>
            <div class="card-details">
                <div class="card-name">${item.name}</div>
                <div class="card-price">$${item.price} <span>$${item.originalPrice}</span></div>
                <div class="card-wheel">
                    <button data-id="${item.id}" class="decrease-quantity">-</button>
                    <span>${item.quantity}</span>
                    <button data-id="${item.id}" class="increase-quantity">+</button>
                </div>
                <button data-id="${item.id}" class="remove-item"><span class="material-symbols-outlined">
delete
</span></button>
            </div>
        `;

        cartContainer.appendChild(cartItem);
        totalCost += item.price * item.quantity;
    });

    totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
    shippingCostElement.textContent = `$5.00`;

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', () => updateQuantity(button, -1));
    });
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', () => updateQuantity(button, 1));
    });
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => removeItem(button));
    });
}

function updateQuantity(button, change) {
    const productId = button.getAttribute('data-id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.map(item => {
        if (item.id === productId) {
            item.quantity = Math.max(1, item.quantity + change);
        }
        return item;
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeItem(button) {
    const productId = button.getAttribute('data-id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter(item => item.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}
