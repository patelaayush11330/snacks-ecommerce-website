const products = [
  { id: 1, name: "Thekua", price: 120, image: "products/Thekuwa.jpg" },
  { id: 2, name: "Khakhra", price: 80, image: "products/Khakhra.jpg" },
  { id: 3, name: "Chikki", price: 150, image: "products/Chikki.jpg" },
  { id: 4, name: "Mathri", price: 100, image: "products/Mathri.jpg" },
  { id: 5, name: "Namkeen", price: 90, image: "products/Namkeen.jpg" },
  { id: 6, name: "Samosa", price: 50, image: "products/Samosa.jpg" },
  { id: 7, name: "Kachori", price: 60, image: "products/Kachori.jpg" },
  { id: 8, name: "Dhokla", price: 70, image: "products/Dhokla.jpg" },
  { id: 9, name: "Pakora", price: 40, image: "products/Pakora.jpg" },
  { id: 10, name: "Murukku", price: 110, image: "products/Murukku.jpg" },
  { id: 11, name: "Chivda", price: 130, image: "products/Chivda.jpg" },
  { id: 12, name: "Mathri", price: 120, image: "products/Mathri2.jpg" },
  { id: 13, name: "Bhel Puri", price: 70, image: "products/BhelPuri.jpg" },
  { id: 14, name: "Sev", price: 60, image: "products/Sev.jpg" },
  { id: 15, name: "Farsan", price: 150, image: "products/Farsan.jpg" },
  { id: 16, name: "Bhujia", price: 80, image: "products/Bhujia.jpg" },
  { id: 17, name: "Pani Puri", price: 90, image: "products/PaniPuri.jpg" },
  { id: 18, name: "Dhokla", price: 100, image: "products/Dhokla2.jpg" },
  { id: 19, name: "Aloo Tikki", price: 50, image: "products/AlooTikki.jpg" },
  { id: 20, name: "Chaat", price: 120, image: "products/Chaat.jpg" },
  { id: 21, name: "Pav Bhaji", price: 130, image: "products/PavBhaji.jpg" },
  { id: 22, name: "Dahi Puri", price: 110, image: "products/DahiPuri.jpg" },
  { id: 23, name: "Khandvi", price: 140, image: "products/Khandvi.jpg" },
  { id: 24, name: "Samosa Chaat", price: 160, image: "products/SamosaChaat.jpg" },
  { id: 25, name: "Puran Poli", price: 180, image: "products/PuranPoli.jpg" },
  { id: 26, name: "Karanji", price: 150, image: "products/Karanji.jpg" },
  { id: 27, name: "Chole Bhature", price: 200, image: "products/CholeBhature.jpg" },
  { id: 28, name: "Paneer Tikka", price: 220, image: "products/PaneerTikka.jpg" },
  { id: 29, name: "Aloo Chaat", price: 90, image: "products/AlooChaat.jpg" },
  { id: 30, name: "Bhel", price: 70, image: "products/Bhel.jpg" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

window.addToCart = function (id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart.`);
  updateCartCount();
};

window.addToWishlist = function (id) {
  const product = products.find(p => p.id === id);
  if (!wishlist.some(item => item.id === id)) {
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert(`${product.name} added to wishlist.`);
    updateWishlistCount();
  } else {
    alert(`${product.name} is already in your wishlist.`);
  }
};

window.removeFromCart = function(index) {
  const removed = cart.splice(index, 1)[0];
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${removed.name} removed from cart.`);
  location.reload();
};

window.moveToWishlist = function(index) {
  const product = cart.splice(index, 1)[0];
  wishlist.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  alert(`${product.name} moved to wishlist.`);
  location.reload();
};

window.removeFromWishlist = function(index) {
  const removed = wishlist.splice(index, 1)[0];
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  alert(`${removed.name} removed from wishlist.`);
  location.reload();
};

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = cart.length;
}

function updateWishlistCount() {
  const wishlistCount = document.getElementById('wishlist-count');
  if (wishlistCount) wishlistCount.textContent = wishlist.length;
}

window.addEventListener('DOMContentLoaded', () => {
  // Load header and footer
  fetch('components/header.html')
    .then(res => res.text())
    .then(html => document.getElementById('header').innerHTML = html);
  fetch('components/footer.html')
    .then(res => res.text())
    .then(html => document.getElementById('footer').innerHTML = html);

  // ✅ Render products (on products.html)
  const productList = document.getElementById('product-list');
  if (productList) {
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
        <button onclick="addToWishlist(${p.id})">Add to Wishlist</button>
      `;
      productList.appendChild(card);
    });
  }

  // ✅ Render Cart (on cart.html)
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  if (cartItems && cartTotal) {
    cartItems.innerHTML = cart.map((p, index) => `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}" />
        <span>${p.name} - ₹${p.price}</span>
        <button onclick="removeFromCart(${index})">Remove</button>
        <button onclick="moveToWishlist(${index})">Add to Wishlist</button>
      </div>
    `).join('');
    const total = cart.reduce((sum, p) => sum + p.price, 0);
    cartTotal.textContent = `Total: ₹${total}`;
  }

  // ✅ Render Wishlist (on wishlist.html)
  const wishlistItems = document.getElementById('wishlist-items');
  const wishlistTotal = document.getElementById('wishlist-total');
  if (wishlistItems && wishlistTotal) {
    wishlistItems.innerHTML = wishlist.map((p, index) => `
      <div class="wishlist-item">
        <img src="${p.image}" alt="${p.name}" />
        <span>${p.name} - ₹${p.price}</span>
        <button onclick="removeFromWishlist(${index})">Remove</button>
      </div>
    `).join('');
    const total = wishlist.reduce((sum, p) => sum + p.price, 0);
    wishlistTotal.textContent = `Total: ₹${total}`;
  }

  // ✅ Login form handler
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Login successful!");
      // location.href = "index.html"; // optional redirect
    });
  }

  // ✅ Register form handler
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Registration successful!");
      // location.href = "login.html"; // optional redirect
    });
  }

  updateCartCount();
  updateWishlistCount();
});
