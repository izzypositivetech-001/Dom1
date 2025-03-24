// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const cartItems = document.querySelectorAll('.card-body .card');
    const totalPriceElement = document.querySelector('.total');

    // Function to update total price
    function updateTotalPrice() {
        let total = 0;
        cartItems.forEach(item => {
            const price = parseFloat(item.querySelector('.unit-price').textContent.replace('$', ''));
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            total += price * quantity;
        });
        totalPriceElement.textContent = `${total} $`;
    }

    // Event listeners for each cart item
    cartItems.forEach(item => {
        const plusBtn = item.querySelector('.fa-plus-circle');
        const minusBtn = item.querySelector('.fa-minus-circle');
        const deleteBtn = item.querySelector('.fa-trash-alt');
        const likeBtn = item.querySelector('.fa-heart');
        const quantityElement = item.querySelector('.quantity');

        // Increase quantity
        plusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            updateTotalPrice();
        });

        // Decrease quantity
        minusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 0) {  // Changed from > 1 to > 0 since initial value is 0
                quantity--;
                quantityElement.textContent = quantity;
                updateTotalPrice();
            }
        });

        // Delete item
        deleteBtn.addEventListener('click', () => {
            // Remove the entire card (parent of parent since we're in .card-body)
            item.parentElement.remove();
            // Update total price after removal
            if (document.querySelectorAll('.card-body .card').length === 0) {
                totalPriceElement.textContent = '0 $';
            } else {
                updateTotalPrice();
            }
        });

        // Like button toggle
        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('liked');
            // Note: You'll need to add CSS to style the 'liked' class
        });
    });

    // Initial total price calculation
    updateTotalPrice();
});