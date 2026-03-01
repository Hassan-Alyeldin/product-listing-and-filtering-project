// 1. البيانات الأصلية (تأكد من وجود الصور في فولدر photos)
const products = [
    { id: 1, title: "Classic Analog Watch", price: 150, category: "Accessories", image: "photos/watch.jpg" },
    { id: 2, title: "Ultra Running Shoes", price: 85, category: "Sports", image: "photos/shoes.jpg" },
    { id: 3, title: "Leather Wallet", price: 45, category: "Accessories", image: "photos/leather-wallet.jpg" },
    { id: 4, title: "Iphone 17 Pro", price: 999, category: "Electronics", image: "photos/phone.jpg" },
    { id: 5, title: "Cotton T-Shirt", price: 30, category: "Clothing", image: "photos/shirt.webp" },
    { id: 6, title: "Gaming Mouse", price: 65, category: "Electronics", image: "photos/mouse.jpg" },
    { id: 7, title: "Travel Bag", price: 55, category: "Accessories", image: "photos/bag.webp" },
    { id: 8, title: "Yoga Mat", price: 40, category: "Sports", image: "photos/mat.webp" }
];

let cart = JSON.parse(localStorage.getItem('shopEaseCart')) || [];

// 2. العناصر الأساسية
const productGrid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const categoryItems = document.querySelectorAll('.category-item');
const sortOrder = document.getElementById('sortOrder');

// 3. وظائف العرض (Rendering)
function renderProducts(data) {
    productGrid.innerHTML = data.map(item => `
        <article class="card">
            <div class="image-box"><img src="${item.image}" alt="${item.title}"></div>
            <div class="card-info">
                <h3>${item.title}</h3>
                <span class="price">$${item.price}</span>
            </div>
            <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
        </article>
    `).join('');
}

function updateCartUI() {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.innerText = totalQty;
    document.getElementById('totalQty').innerText = totalQty;
    document.getElementById('totalPrice').innerText = totalPrice;
    document.getElementById('checkoutBtn').disabled = cart.length === 0;

    renderCartItems();
    localStorage.setItem('shopEaseCart', JSON.stringify(cart));
}

function renderCartItems() {
    const list = document.getElementById('cartItemsList');
    if (cart.length === 0) {
        list.innerHTML = "<p style='text-align:center; margin-top:30px; color:#888;'>Your cart is empty.</p>";
        return;
    }
    list.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div style="flex:1">
                <p style="font-weight:bold; font-size:0.9rem;">${item.title}</p>
                <small>$${item.price}</small>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
                <button onclick="updateQty(${item.id}, -1)" style="width:25px; cursor:pointer">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQty(${item.id}, 1)" style="width:25px; cursor:pointer">+</button>
            </div>
            <button onclick="removeFromCart(${item.id})" style="border:none; background:none; cursor:pointer; margin-left:15px;">🗑️</button>
        </div>
    `).join('');
}

// 4. وظائف المنطق (Logic)
window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) existing.quantity++;
    else cart.push({ ...product, quantity: 1 });
    updateCartUI();
};

window.updateQty = function(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) return removeFromCart(id);
    }
    updateCartUI();
};

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
};

// 5. الفلترة والترتيب
function applyFilters() {
    let current = [...products];
    const activeCat = document.querySelector('.category-item.active').dataset.category;
    const sortVal = sortOrder.value;

    if (activeCat !== 'all') current = current.filter(p => p.category === activeCat);
    if (sortVal === 'low-high') current.sort((a,b) => a.price - b.price);
    if (sortVal === 'high-low') current.sort((a,b) => b.price - a.price);

    renderProducts(current);
}

categoryItems.forEach(li => {
    li.onclick = () => {
        categoryItems.forEach(el => el.classList.remove('active'));
        li.classList.add('active');
        applyFilters();
    };
});

sortOrder.onchange = applyFilters;

// 6. التحكم في الـ Modals
document.getElementById('openCartBtn').onclick = () => document.getElementById('cartModal').style.display = 'block';
document.getElementById('closeCart').onclick = () => document.getElementById('cartModal').style.display = 'none';

document.getElementById('checkoutBtn').onclick = () => {
    document.getElementById('successOverlay').style.display = 'flex';
    cart = [];
    updateCartUI();
    document.getElementById('cartModal').style.display = 'none';
};

window.closeSuccess = () => document.getElementById('successOverlay').style.display = 'none';

// 7. التحميل الأولي
window.onload = () => {
    renderProducts(products);
    updateCartUI();
};