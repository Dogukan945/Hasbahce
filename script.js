function showCategory(name) {
    const content = document.getElementById('content');
    content.innerHTML = `<h2>${name} kategorisi</h2><p>Ürünler buraya gelecek</p>`;
}
function openCart() {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>Sepetiniz</h2><p>Henüz ürün eklenmedi.</p>';
}