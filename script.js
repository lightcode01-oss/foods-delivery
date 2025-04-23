// script.js

const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
let cart = [];
let totalPrice = 0;

const menuItems = [
    { name: 'Pizza', price: 10.00 },
    { name: 'Burger', price: 5.00 },
    { name: 'Pasta', price: 7.00 }
];

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        addToCart(menuItems[index]);
    });
});

function addToCart(item) {
    cart.push(item);
    totalPrice += item.price;
    updateCart();
}

function updateCart() {
    cartItemsContainer.innerHTML = ''; // Clear previous items
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(cartItem);
    });
    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

// Clear the cart when the "Checkout" button is clicked
document.getElementById('checkout-btn').addEventListener('click', () => {
    alert(`Your total is $${totalPrice.toFixed(2)}. Thank you for your order!`);
    cart = [];
    totalPrice = 0;
    updateCart();
});