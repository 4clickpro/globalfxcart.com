function createPostCard(post) {
  return `
    <article class="card">
      <a href="${post.link}" ${post.link === '#' ? 'onclick="return false"' : ''}>
        <div class="card-image">
          <img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.onerror=null;this.src='images/rover-xl6-white.jpg';this.alt='Golf cart'">
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

  const clubGrid = document.getElementById('club-grid');
  if (clubGrid) {
    clubGrid.innerHTML = clubPosts.map(createPostCard).join('');
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

  // Sticky mobile call bar — call or text to book from any page
  if (!document.querySelector('.sticky-call-bar')) {
    const bar = document.createElement('div');
    bar.className = 'sticky-call-bar';
    bar.innerHTML = '<a href="tel:8502998575" class="call-now">📞 Call (850) 299-8575</a><a href="sms:8502998575" class="text-now">💬 Text Us</a>';
    document.body.appendChild(bar);
  }

  // Rental video play button
  const video = document.getElementById('rentalVideo');
  const playBtn = document.getElementById('videoPlayBtn');
  if (video && playBtn) {
    playBtn.addEventListener('click', () => {
      video.play();
    });
    video.addEventListener('play', () => {
      playBtn.classList.add('hidden');
    });
    video.addEventListener('pause', () => {
      if (video.ended) playBtn.classList.remove('hidden');
    });
  }
});
