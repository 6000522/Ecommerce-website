// Initialize cart
let cart = [];

// Select necessary elements
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.getElementsByClassName('close-btn')[0];
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTax = document.getElementById('cart-tax');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCountElement = document.getElementById('cart-count');
const buyIcons = document.querySelectorAll('.buy-icon');

// Function to add product to the cart
function addToCart(product) {
  const cartItem = cart.find(item => item.id === product.id);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// Function to remove product from the cart
function removeFromCart(productId) {
  const cartItemIndex = cart.findIndex(item => item.id === productId);

  if (cartItemIndex > -1) {
    const cartItem = cart[cartItemIndex];

    if (cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      cart.splice(cartItemIndex, 1);
    }

    updateCart();
  }
}

// Function to update the cart UI
function updateCart() {
  cartItemsContainer.innerHTML = '';
  let subtotal = 0;
  let totalItems = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    totalItems += item.quantity;

    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');

    cartItemDiv.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="cart-item-details">
        <span>${item.name} (x${item.quantity})</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItemDiv);
  });

  const tax = (subtotal * 0.05).toFixed(2);
  const total = (subtotal + parseFloat(tax)).toFixed(2);

  cartSubtotal.textContent = subtotal.toFixed(2);
  cartTax.textContent = tax;
  cartTotalPrice.textContent = total;
  cartCountElement.textContent = totalItems;
}

// Event listener to open cart modal
cartIcon.addEventListener('click', () => {
  cartModal.style.display = 'block';
});

// Event listener to close cart modal
closeModal.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

// Event listener to close modal when clicking outside of it
window.addEventListener('click', (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = 'none';
  }
});

// Adding event listeners to buy icons
buyIcons.forEach((icon, index) => {
  icon.addEventListener('click', () => {
    const product = {
      id: index + 1,
      name: `Product ${index + 1}`,
      price: parseFloat(icon.closest('.product-cart').querySelector('.price').textContent.slice(1)),
      image: icon.closest('.product-cart').querySelector('.product-image').src
    };
    addToCart(product);
  });
});

// Event listener to handle remove button clicks
cartItemsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-btn')) {
    const productId = parseInt(event.target.getAttribute('data-id'), 10);
    removeFromCart(productId);
  }
});

// Focus cursor on the email address input field
const emailField = document.getElementById("email-address-input");
emailField.focus({
  preventScroll: true,
});
