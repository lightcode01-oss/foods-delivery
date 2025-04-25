/* ========== Navigation =========== */
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".nav-list .close");
const menu = document.querySelector(".nav-list");

hamburger.addEventListener("click", () => {
  menu.classList.add("show");
});

close.addEventListener("click", () => {
  menu.classList.remove("show");
});

/* ========== SignIn Form =========== */
const signInForm = document.querySelector("header .wrapper");

document.querySelector(".signin").onclick = () => {
  signInForm.classList.add("active");
};

document.querySelector(".close-form").onclick = () => {
  signInForm.classList.remove("active");
};

// Add event listener to cart button to redirect to cart.html
document.addEventListener('DOMContentLoaded', () => {
  const cartButton = document.getElementById('cartButton');
  const cartCount = document.getElementById('cartCount');

  // Update cart count from localStorage on page load
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  if (cartButton) {
    cartButton.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  }
});
