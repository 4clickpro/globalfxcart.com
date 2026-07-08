function createPostCard(post) {
  return `
    <article class="post-card">
      <a href="${post.link}">
        <img src="${post.image}" alt="${post.title}">
        <div class="post-content">
          <span class="post-date">${post.date}</span>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <span class="read-more">Read More →</span>
        </div>
      </a>
    </article>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const featuredPosts = document.getElementById('featured-posts');
  if (featuredPosts) {
    featuredPosts.innerHTML = reviews.slice(0, 2).map(createPostCard).join('');
  }

  const recentPosts = document.getElementById('recent-posts');
  if (recentPosts) {
    recentPosts.innerHTML = blogPosts.slice(0, 2).map(createPostCard).join('');
  }

  const reviewsGrid = document.getElementById('reviews-grid');
  if (reviewsGrid) {
    reviewsGrid.innerHTML = reviews.map(createPostCard).join('');
  }

  const blogGrid = document.getElementById('blog-grid');
  if (blogGrid) {
    blogGrid.innerHTML = blogPosts.map(createPostCard).join('');
  }
});
