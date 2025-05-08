/* ========== Products Slider =========== */
const swiper = new Swiper(".mySwiper", {
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".custom-pagination",
      clickable: true,
    },
    breakpoints: {
      567: {
        slidesPerView: 2,
      },
      996: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });

/* ========== Fetch the Products =========== */

const getProducts = async () => {
  try {
    const results = await fetch("./data/products.json");
    const data = await results.json();
    const products = data.products;
    return products;
  } catch (err) {
    console.log(err);
  }
};

const ProductsWrapper = document.getElementById("products-wrapper");

// Global cart array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart display
const updateCartDisplay = () => {
  const cartItemsContainer = document.getElementById("cartItems");
  if (!cartItemsContainer) return;
  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;
  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    // Create image element
    const img = document.createElement("img");
    img.src = item.url;
    img.alt = item.name;

    // Create details container
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("cart-item-details");

    // Create name element
    const nameEl = document.createElement("h5");
    nameEl.textContent = item.name;

    // Create price element
    const priceEl = document.createElement("span");
    priceEl.textContent = `$${item.price}`;

    // Append name and price to details container
    detailsDiv.appendChild(nameEl);
    detailsDiv.appendChild(priceEl);

    // Append image and details to item div
    itemDiv.appendChild(img);
    itemDiv.appendChild(detailsDiv);

    cartItemsContainer.appendChild(itemDiv);

    totalPrice += parseFloat(item.price);
  });
  // Add total price display
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("cart-total");
  totalDiv.textContent = `Total: $${totalPrice.toFixed(2)}`;
  cartItemsContainer.appendChild(totalDiv);
  // Update cart count
  document.getElementById('cartCount').textContent = cart.length;
};

// Modify addToCart to accept url parameter
const addToCart = (name, price, url) => {
  cart.push({ name, price, url });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
  alert(`${name} added to cart!`);
};

// Update addAddToCartListeners to pass image url
const addAddToCartListeners = () => {
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      const name = card.querySelector("h4").textContent;
      const priceText = card.querySelector(".price .color").textContent;
      const price = priceText.replace("₹", "");
      const url = card.querySelector(".image img").src;
      addToCart(name, price, url);
    });
  });
};

// Add toggle functionality for cart display
const cartIcon = document.querySelector(".cart-icon");
if (cartIcon) {
  cartIcon.addEventListener("click", () => {
    const cartItemsContainer = document.getElementById("cartItems");
    if (cartItemsContainer.style.display === "none" || cartItemsContainer.style.display === "") {
      cartItemsContainer.style.display = "block";
    } else {
      cartItemsContainer.style.display = "none";
    }
  });
}

// Remove duplicate addToCart function to fix redeclaration error

window.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  displayProductItems(products);
  addAddToCartListeners();
  updateCartDisplay(); // Initialize cart count display on page load
});

/* ========== Display Products =========== */
const displayProductItems = (items) => {
  let displayProduct = items.map(
    (product) => ` 
                <div class="swiper-slide">
                <div class="card d-flex">
                  <div class="image"><img src=${product.url} alt=""></div>
                  <div class="rating">
                  <span><i class="bx bxs-star"></i></span>
                  <span><i class="bx bxs-star"></i></span>
                  <span><i class="bx bxs-star"></i></span>
                  <span><i class="bx bxs-star"></i></span>
                  <span><i class="bx bxs-star"></i></span>
                  </div>
                  <h4>${product.title}</h4>
                  <div class="price">
                    <span>Price</span><span class="color">₹${product.price}</span>
                  </div>
                  <div class="button btn add-to-cart-btn">ADD TO CART +</div>
                </div>
              </div>
                  `
  );

  displayProduct = displayProduct.join("");
  if (ProductsWrapper) {
    ProductsWrapper.innerHTML = displayProduct;
  }
};


/* ========== Filter Products =========== */

const filters = [...document.querySelectorAll(".filters span")];

filters.forEach((filter) => {
  filters[0].classList.add("active");
  filter.addEventListener("click", async (e) => {
    const id = e.target.getAttribute("data-filter");
    const target = e.target;
    const products = await getProducts();
    filters.forEach((btn) => {
      btn.classList.remove("active");
    });
    target.classList.add("active");

    let menuCategory = products.filter((product) => {
      if (product.category === id) {
        return product;
      }
    });

    if (id === "All Product") {
      displayProductItems(products);
      swiper.update();
      addAddToCartListeners();
    } else {
      displayProductItems(menuCategory);
      swiper.update();
      addAddToCartListeners();
    }
  });
});
