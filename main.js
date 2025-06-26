let cart = [];

function addToCart(name, price) {
    const table = document.getElementById('tableInput')?.value;
    if (!table && document.getElementById('cartItems')) {
        alert('Lütfen masa numarası giriniz');
        return;
    }
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    updateCartUI();
}

function openCart() {
    document.getElementById('cartModal').style.display = 'block';
    updateCartUI();
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function clearCart() {
    if (confirm('Emin misiniz?')) {
        cart = [];
        updateCartUI();
    }
}

function updateCartUI() {
    const list = document.getElementById('cartItems');
    const count = document.getElementById('cartCount');
    if (list) {
        list.innerHTML = '';
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} × ${item.qty}`;
            list.appendChild(li);
        });
    }
    if (count) {
        count.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
    }
}

function confirmOrder() {
    if (confirm("Siparişi onaylıyor musunuz?")) {
        alert("Siparişiniz alındı, teşekkür ederiz");
        clearCart();
        closeCart();
    }
}

// Günlük yemek kontrolü
const now = new Date();
if (now.getHours() >= 12 && now.getHours() < 13) {
    document.getElementById("mealInfo").textContent = "Bugünün yemeği: Etli Nohut + Pilav (200 TL)";
}