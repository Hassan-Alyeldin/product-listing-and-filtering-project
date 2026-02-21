const products = [
    { id: 1, title: "Classic Analog Watch", price: 150, category: "Accessories", image: "watch.jpg" },
    { id: 2, title: "Ultra Running Shoes", price: 85, category: "Sports", image: "shoes.jpg" },
    { id: 3, title: "Genuine Leather Wallet", price: 45, category: "Accessories", image: "leather-wallet.jpg" },
    { id: 4, title: "IPhone 17 pro", price: 999, category: "Electronics", image: "phone.jpg" },
    { id: 5, title: "Premium Cotton T-Shirt", price: 30, category: "Clothing", image: "shirt.webp" },
    { id: 6, title: "RGB Gaming Mouse", price: 65, category: "Electronics", image: "mouse.jpg" },
    { id: 7, title: "Waterproof Backpack", price: 55, category: "Accessories", image: "bag.webp" },
    { id: 8, title: "Natural Rubber Yoga Mat", price: 40, category: "Sports", image: "mat.webp" }
];

const grid = document.getElementById('productGrid');
const categoryFilter = document.getElementById('categoryFilter');
const sortOrder = document.getElementById('sortOrder');


function displayProducts(filteredList) {
    grid.innerHTML = ""; 
    
    if (filteredList.length === 0) {
        grid.innerHTML = "<p>No products found.</p>";
        return;
    }

    filteredList.forEach(product => {
        const card = `
            <div class="card">
                <img src="${product.image}" alt="${product.title}">
                <span class="category">${product.category}</span>
                <h3>${product.title}</h3>
                <span class="price">$${product.price}</span>
                <button class="btn-add" disabled>Add to Cart</button>
            </div>
        `;
        grid.innerHTML += card;
    });
}


function updateUI() {
    let currentProducts = [...products];
    const category = categoryFilter.value;
    const sort = sortOrder.value;

    
    localStorage.setItem('prefCategory', category);
    localStorage.setItem('prefSort', sort);

    
    if (category !== "all") {
        currentProducts = currentProducts.filter(p => p.category === category);
    }


    if (sort === "low-high") {
        currentProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
        currentProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "az") {
        currentProducts.sort((a, b) => a.title.localeCompare(b.title));
    }

    displayProducts(currentProducts);
}


window.onload = () => {
    const savedCat = localStorage.getItem('prefCategory');
    const savedSort = localStorage.getItem('prefSort');

    if (savedCat) categoryFilter.value = savedCat;
    if (savedSort) sortOrder.value = savedSort;

    updateUI();
};


categoryFilter.addEventListener('change', updateUI);
sortOrder.addEventListener('change', updateUI);
