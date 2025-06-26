let cart = [];
let qtyMap = {};

function increaseQty(name) {
  const id = `${name}_qty`;
  qtyMap[name] = (qtyMap[name] || 1) + 1;
  document.getElementById(id).innerText = qtyMap[name];
}

function decreaseQty(name) {
  const id = `${name}_qty`;
  qtyMap[name] = Math.max(1, (qtyMap[name] || 1) - 1);
  document.getElementById(id).innerText = qtyMap[name];
}

function addToCart(name, price) {
    const qty = qtyMap[name] || 1;
    const table = document.getElementById('tableInput')?.value;
    if (!table) {
        alert('Lütfen masa numarası giriniz');
        return;
    }
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ name, price, qty });
    }
    showAlert(`${qty} adet ${name} sepete eklendi`);
    updateCartUI();
}

function showAlert(msg) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = msg;
    alertBox.style.display = 'block';
    setTimeout(() => alertBox.style.display = 'none', 3000);
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

function changeCartQty(name, delta) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
        updateCartUI();
    }
}

function updateCartUI() {
    const list = document.getElementById('cartItems');
    const count = document.getElementById('cartCount');
    if (list) {
        list.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} × ${item.qty}
              <button onclick="changeCartQty('${item.name}', -1)">-</button>
              <button onclick="changeCartQty('${item.name}', 1)">+</button>`;
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

function toggleCategory(id) {
    const section = document.getElementById(id);
    section.style.display = section.style.display === 'none' ? 'flex' : 'none';
}

// Günlük yemek
const now = new Date();
if (now.getHours() >= 12 && now.getHours() < 13) {
    document.getElementById("mealInfo").textContent = "Bugünün yemeği: Etli Nohut + Pilav (200 TL)";
}

function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const count = cart.reduce((total, item) => total + item.qty, 0);
    const badge = document.getElementById("cart-badge");
    if (badge) {
        badge.innerText = count;
        badge.style.display = count > 0 ? "block" : "none";
    }
}

// Sepete ekledikten sonra çağır
const originalAddToCart = addToCart;
addToCart = function(name, price) {
    originalAddToCart(name, price);
    updateCartIcon();
}
window.onload = updateCartIcon;
