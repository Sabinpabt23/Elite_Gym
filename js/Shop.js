// Initialize cart from localStorage or create empty array
let cart = JSON.parse(localStorage.getItem('eliteFitnessCart')) || [];

// Function to update cart count in navigation
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(element => {
        element.textContent = count;
    });
}

// Function to parse price correctly (handles Rs. and commas)
function parsePrice(priceText) {
    // Remove Rs. symbol, commas, and any other non-digit characters
    const numericValue = priceText.replace(/Rs\.|,/g, '');
    // Convert to number and multiply by 100 to store as integer (avoids floating point issues)
    return Math.round(parseFloat(numericValue) * 100);
}

// Function to format price for display
function formatPrice(price) {
    // Convert back from paisa to rupees and format with commas
    return 'Rs.' + (price / 100).toLocaleString('en-IN');
}

// Main function that runs when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initialize cart count
    updateCartCount();

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            const productCard = e.target.closest('.product-card');
            const priceText = productCard.querySelector('.current-price').textContent;
            
            const product = {
                id: productCard.querySelector('h3').textContent.trim().toLowerCase().replace(/\s+/g, '-'),
                name: productCard.querySelector('h3').textContent,
                price: parsePrice(priceText), // Store price in paisa (4500 becomes 450000)
                image: productCard.querySelector('img').src,
                quantity: 1
            };

            // Check if item already exists in cart
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(product);
            }

            // Save to localStorage and update UI
            localStorage.setItem('eliteFitnessCart', JSON.stringify(cart));
            updateCartCount();
            
            alert(`${product.name} added to cart!`);
        });
    });

    // Buy now functionality
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', function(e) {
            const productCard = e.target.closest('.product-card');
            const priceText = productCard.querySelector('.current-price').textContent;
            
            const product = {
                id: productCard.querySelector('h3').textContent.trim().toLowerCase().replace(/\s+/g, '-'),
                name: productCard.querySelector('h3').textContent,
                price: parsePrice(priceText),
                image: productCard.querySelector('img').src,
                quantity: 1
            };

            // Replace cart with this single item
            cart = [product];
            localStorage.setItem('eliteFitnessCart', JSON.stringify(cart));
            updateCartCount();
            
            // Redirect to cart page
            window.location.href = 'Cart.html';
        });
    });

    // Back to Top Button
    const backToTop = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Search Box
    const searchInput = document.querySelector(".search-box input");
    const productCards = document.querySelectorAll(".product-card");
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        productCards.forEach(card => {
            const productName = card.querySelector("h3").textContent.toLowerCase();
            card.style.display = productName.includes(query) ? "block" : "none";
        });
    });

    // Price Range Filter
    const priceSlider = document.getElementById("priceRange");
    priceSlider.addEventListener("input", () => {
        const maxPrice = parseInt(priceSlider.value) * 100; // Convert to paisa
        productCards.forEach(card => {
            const priceText = card.querySelector(".current-price").textContent;
            const price = parsePrice(priceText);
            card.style.display = price <= maxPrice ? "block" : "none";
        });
    });
});