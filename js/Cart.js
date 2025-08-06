document.addEventListener("DOMContentLoaded", function() {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('eliteFitnessCart')) || [];
    const cartItemsList = document.querySelector('.cart-items-list');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartFilled = document.querySelector('.cart-filled');
    const cartSubtotal = document.querySelector('.cart-subtotal');
    const cartTotal = document.querySelector('.cart-total');
    const cartCountElements = document.querySelectorAll('.cart-count');

    // Format price for display
    function formatPrice(price) {
        return 'Rs.' + (price / 100).toLocaleString('en-IN');
    }

    // Render cart items
    function renderCart() {
        if (cart.length === 0) {
            cartEmpty.style.display = 'block';
            cartFilled.style.display = 'none';
        } else {
            cartEmpty.style.display = 'none';
            cartFilled.style.display = 'block';
            
            cartItemsList.innerHTML = '';
            let subtotal = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div>
                                <h4>${item.name}</h4>
                            </div>
                        </div>
                    </td>
                    <td>${formatPrice(item.price)}</td>
                    <td>
                        <div class="quantity-control">
                            <button class="quantity-decrease" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-increase" data-id="${item.id}">+</button>
                        </div>
                    </td>
                    <td>${formatPrice(itemTotal)}</td>
                    <td><button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button></td>
                `;
                cartItemsList.appendChild(row);
            });
            
            const shipping = 20000; // Rs.200 in paisa
            const total = subtotal + shipping;
            
            cartSubtotal.textContent = formatPrice(subtotal);
            cartTotal.textContent = formatPrice(total);
            
            // Update cart count
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            cartCountElements.forEach(element => {
                element.textContent = count;
            });
        }
    }

    // Handle quantity changes and removal
    cartItemsList.addEventListener('click', function(e) {
        // Quantity increase
        if (e.target.classList.contains('quantity-increase') || e.target.parentElement.classList.contains('quantity-increase')) {
            const button = e.target.classList.contains('quantity-increase') ? e.target : e.target.parentElement;
            const id = button.getAttribute('data-id');
            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity += 1;
                saveCart();
                renderCart();
            }
        }
        
        // Quantity decrease
        if (e.target.classList.contains('quantity-decrease') || e.target.parentElement.classList.contains('quantity-decrease')) {
            const button = e.target.classList.contains('quantity-decrease') ? e.target : e.target.parentElement;
            const id = button.getAttribute('data-id');
            const item = cart.find(item => item.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                saveCart();
                renderCart();
            }
        }
        
        // Remove item
        if (e.target.classList.contains('remove-item') || e.target.parentElement.classList.contains('remove-item')) {
            const button = e.target.classList.contains('remove-item') ? e.target : e.target.parentElement;
            const id = button.getAttribute('data-id');
            cart = cart.filter(item => item.id !== id);
            saveCart();
            renderCart();
        }
    });

    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        alert('Proceeding to checkout!');
    });

    function saveCart() {
        localStorage.setItem('eliteFitnessCart', JSON.stringify(cart));
    }

    // Initial render
    renderCart();
});