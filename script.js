// Select elements
const searchBar = document.getElementById('search-bar');
const categorySelect = document.getElementById('category-select');
const filterButton = document.getElementById('filter-button');
const productCards = document.querySelectorAll('.product-card'); 

// Function to filter products
function filterProducts() {
    const searchQuery = searchBar.value.toLowerCase();
    const selectedCategory = categorySelect.value;

    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        const productCategory = card.dataset.category;

        // Check if the product matches the search query and category filter
        const matchesSearch = productName.includes(searchQuery);
        const matchesCategory = selectedCategory === 'all' || productCategory === selectedCategory;

        // Show or hide the product card based on filter
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Attach event listeners
filterButton.addEventListener('click', filterProducts);

// Optional: Live filtering
searchBar.addEventListener('input', filterProducts);
categorySelect.addEventListener('change', filterProducts);


// Select elements
const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const clearCartButton = document.getElementById('clear-cart');
const buyCartButton = document.getElementById('buy-cart');

// Cart state
let cart = [];

// Utility to update total price
function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.textContent = `P${total}`;
}

// Utility to render the cart items
function renderCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">P${item.price}</p>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-index="${index}">+</button>
                </div>
            </div>
            <button class="remove-item" data-index="${index}">&times;</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    // Attach event listeners for quantity changes and item removal
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            cart[index].quantity += 1;
            updateTotalPrice();
            renderCart();
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
                updateTotalPrice();
                renderCart();
            }
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            cart.splice(index, 1);
            updateTotalPrice();
            renderCart();
        });
    });
}

// Add item to the cart
function addItemToCart(item) {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateTotalPrice();
    renderCart();
}

// Clear the cart
clearCartButton.addEventListener('click', () => {
    cart = [];
    updateTotalPrice();
    renderCart();
});

// Simulate "Buy Now" functionality
buyCartButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Thank you for your purchase!');
        cart = [];
        updateTotalPrice();
        renderCart();
    }
});

// Toggle the cart sidebar
cartToggle.addEventListener('click', () => {
    cartSidebar.classList.toggle('collapsed');
});

// Example: Add items dynamically (Simulate product selection)
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const item = {
            name: productCard.querySelector('.product-name').textContent,
            price: parseFloat(productCard.querySelector('.product-price').textContent.replace('P', '')),
            image: productCard.querySelector('.product-image').src,
        };
        addItemToCart(item);
    });
});




  // Subscribe Button Feedback
    const subscribeButton = document.getElementById("subscribe-button");
    subscribeButton.addEventListener("click", () => {
        const emailInput = document.querySelector("input[aria-label='Email address']");
        if (emailInput.value.trim() === "") {
            alert("Please enter your email address to subscribe.");
        } else {
            alert("Thank you for subscribing!");
            emailInput.value = ""; // Clear the input
        }
    });


   