let cart = [];

function showCategory(name) {
    const content = document.getElementById("content");
    content.innerHTML = `<h2>${name} ürünleri yakında burada listelenecek.</h2>`;
}

function toggleCart() {
    const cartArea = document.getElementById("cartArea");
    cartArea.style.display = cartArea.style.display === "block" ? "none" : "block";
}

function clearCart() {
    if (confirm("Sepeti temizlemek istediğinize emin misiniz?")) {
        cart = [];
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    cartItems.innerHTML = "";
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        cartItems.appendChild(li);
    });
    cartCount.textContent = cart.length;
}