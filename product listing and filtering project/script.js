const products = [
    { id: 1, title: "Classic Analog Watch", price: 150, category: "Accessories", image: "photos/watch.jpg" },
    { id: 2, title: "Ultra Running Shoes", price: 85, category: "Sports", image: "photos/shoes.jpg" },
    { id: 3, title: "Genuine Leather Wallet", price: 45, category: "Accessories", image: "photos/leather-wallet.jpg" },
    { id: 4, title: "IPhone 17 pro", price: 999, category: "Electronics", image: "photos/phone.jpg" },
    { id: 5, title: "Premium Cotton T-Shirt", price: 30, category: "Clothing", image: "photos/shirt.webp" },
    { id: 6, title: "RGB Gaming Mouse", price: 65, category: "Electronics", image: "photos/mouse.jpg" },
    { id: 7, title: "Waterproof Backpack", price: 55, category: "Accessories", image: "photos/bag.webp" },
    { id: 8, title: "Natural Rubber Yoga Mat", price: 40, category: "Sports", image: "photos/mat.webp" }
];

const productGrid = document.getElementById('productGrid');
const categoryItems = document.querySelectorAll('.category-item');
const sortOrder = document.getElementById('sortOrder');

function renderProducts(data) {
    productGrid.innerHTML = data.map(item => `
        <article class="card">
            <div class="image-box">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="card-details">
                <h3>${item.title}</h3>
                <span class="price">$${item.price}</span>
            </div>
            <button class="btn-add" disabled>Add to Cart</button>
        </article>
    `).join('');
}

categoryItems.forEach(item => {
    item.addEventListener('click', () => {
        
        categoryItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const selectedCategory = item.getAttribute('data-category');
        
        
        localStorage.setItem('product', selectedCategory);

        applyFilters();
    });
});


function applyFilters() {
    let currentData = [...products];
    const activeCategory = document.querySelector('.category-item.active').getAttribute('data-category');
    const activeSort = sortOrder.value;

    
    if (activeCategory !== 'all') {
        currentData = currentData.filter(p => p.category === activeCategory);
    }

    
    if (activeSort === 'low-high') currentData.sort((a, b) => a.price - b.price);
    else if (activeSort === 'high-low') currentData.sort((a, b) => b.price - a.price);
    else if (activeSort === 'az') currentData.sort((a, b) => a.title.localeCompare(b.title));

    renderProducts(currentData);
}


sortOrder.addEventListener('change', applyFilters);


window.onload = () => {
    const savedCategory = localStorage.getItem('product') || 'all';
    
    categoryItems.forEach(i => {
        if(i.getAttribute('data-category') === savedCategory) i.classList.add('active');
        else i.classList.remove('active');
    });

    applyFilters();
};