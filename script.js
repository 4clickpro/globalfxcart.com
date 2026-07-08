function createProductCard(product) {
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">${product.price}</p>
      <a href="${product.link}" class="btn" target="_blank">Buy Now</a>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const featuredGrid = document.getElementById('featured-products');
  if (featuredGrid) {
    const featured = [...products.carts.slice(0, 2), ...products.accessories.slice(0, 1), ...products.supplies.slice(0, 1)];
    featuredGrid.innerHTML = featured.map(createProductCard).join('');
  }

  const cartsGrid = document.getElementById('carts-grid');
  if (cartsGrid) {
    cartsGrid.innerHTML = products.carts.map(createProductCard).join('');
  }

  const accessoriesGrid = document.getElementById('accessories-grid');
  if (accessoriesGrid) {
    accessoriesGrid.innerHTML = [...products.accessories, ...products.supplies].map(createProductCard).join('');
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! We will get back to you soon.');
      contactForm.reset();
    });
  }
});
