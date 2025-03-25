// script.js

// Product class
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = parseFloat(price.replace('$', ''));
    }
}

// ShoppingCartItem class
class ShoppingCartItem {
    constructor(product, quantity = 0) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// ShoppingCart class
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.renderCart();
    }

    initializeCart() {
        const cartItems = document.querySelectorAll('.card-body .card');
        cartItems.forEach((item, index) => {
            const name = item.querySelector('.card-title').textContent;
            const price = item.querySelector('.unit-price').textContent;
            const product = new Product(index + 1, name, price);
            this.addItem(product, 0); // Initialize with quantity 0
        });
        this.renderCart();
    }

    renderCart() {
        const cartContainer = document.querySelector('.list-products');
        const totalPriceElement = document.querySelector('.total');
        
        // Clear current display
        cartContainer.innerHTML = '';

        // Render each item
        this.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card-body';
            card.innerHTML = `
                <div class="card" style="width: 18rem">
                    <img src="/assets/${item.product.name.toLowerCase()}.png" class="card-img-top" alt="${item.product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.product.name}</h5>
                        <p class="card-text">This is a ${item.product.name.toLowerCase()}</p>
                        <h4 class="unit-price">${item.product.price} $</h4>
                        <div>
                            <i class="fas fa-plus-circle"></i>
                            <span class="quantity">${item.quantity}</span>
                            <i class="fas fa-minus-circle"></i>
                        </div>
                        <div>
                            <i class="fas fa-trash-alt"></i>
                            <i class="fas fa-heart"></i>
                        </div>
                    </div>
                </div>
            `;
            cartContainer.appendChild(card);

            // Add event listeners
            const plusBtn = card.querySelector('.fa-plus-circle');
            const minusBtn = card.querySelector('.fa-minus-circle');
            const deleteBtn = card.querySelector('.fa-trash-alt');
            const likeBtn = card.querySelector('.fa-heart');
            const quantityElement = card.querySelector('.quantity');

            plusBtn.addEventListener('click', () => {
                item.quantity++;
                quantityElement.textContent = item.quantity;
                totalPriceElement.textContent = `${this.getTotalPrice()} $`;
            });

            minusBtn.addEventListener('click', () => {
                if (item.quantity > 0) {
                    item.quantity--;
                    quantityElement.textContent = item.quantity;
                    totalPriceElement.textContent = `${this.getTotalPrice()} $`;
                }
            });

            deleteBtn.addEventListener('click', () => {
                this.removeItem(item.product.id);
            });

            likeBtn.addEventListener('click', () => {
                likeBtn.classList.toggle('liked');
            });
        });

        // Update total price
        totalPriceElement.textContent = `${this.getTotalPrice()} $`;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cart = new ShoppingCart();
    
    // Initialize cart with products from HTML
    cart.initializeCart();

    // Test additional functionality (optional)
    // Create a new product and add it
    const newProduct = new Product(4, 'Hat', '30 $');
    setTimeout(() => {
        cart.addItem(newProduct, 1);
        cart.renderCart();
    }, 2000);

    // Remove an item after 5 seconds (optional)
    setTimeout(() => {
        cart.removeItem(2); // Removes socks
    }, 5000);
});