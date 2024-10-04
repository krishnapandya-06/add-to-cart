const cart = [];

function addToCart(productName, productPrice) {
    const existingProduct = cart.find(product => product.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    renderCart();
}

function renderCart() {
    const cartItemsDiv = document.querySelector('.cart-items');
    const cartTotalTop = document.getElementById('cart-total');
    const cartTotalBottom = document.getElementById('cart-total-bottom');
    const cartCount = document.getElementById('cart-count');

    cartItemsDiv.innerHTML = '';

    let total = 0;
    let itemCount = 0;

    cart.forEach(product => {
        cartItemsDiv.innerHTML += `
            <div>
                ${product.name} (x${product.quantity}) - $${(product.price * product.quantity).toFixed(2)}
                <button onclick="removeFromCart('${product.name}')">Remove</button>
            </div>
        `;
        total += product.price * product.quantity;
        itemCount += product.quantity;
    });

    cartTotalTop.textContent = total.toFixed(2);
    cartTotalBottom.textContent = total.toFixed(2);
    cartCount.textContent = itemCount;
}


function removeFromCart(productName) {
    const productIndex = cart.findIndex(product => product.name === productName);

    if (productIndex > -1) {
        cart.splice(productIndex, 1);
    }

    renderCart();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
        const productName = event.target.closest('.product-card').dataset.product;
        const productPrice = parseFloat(event.target.closest('.product-card').dataset.price);

        addToCart(productName, productPrice);
    });
});
