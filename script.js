function createPostCard(post) {
  return `
    <article class="card">
      <a href="${post.link}" ${post.link === '#' ? 'onclick="return false"' : ''}>
        <div class="card-image">
          <img src="${post.image}" alt="${post.title}" loading="lazy">
        </div>
        <div class="card-body">
          <span class="card-date">${post.date}</span>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <span class="card-link">${post.link === '#' ? 'Coming Soon' : 'Check Price'} →</span>
        </div>
      </a>
    </article>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const featuredPosts = document.getElementById('featured-posts');
  if (featuredPosts) {
    featuredPosts.innerHTML = reviews.slice(0, 3).map(createPostCard).join('');
  }

  const recentPosts = document.getElementById('recent-posts');
  if (recentPosts) {
    recentPosts.innerHTML = blogPosts.slice(0, 3).map(createPostCard).join('');
  }

  const reviewsGrid = document.getElementById('reviews-grid');
  if (reviewsGrid) {
    reviewsGrid.innerHTML = reviews.map(createPostCard).join('');
  }

  const blogGrid = document.getElementById('blog-grid');
  if (blogGrid) {
    blogGrid.innerHTML = blogPosts.map(createPostCard).join('');
  }

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Navbar scroll effect
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }
});
