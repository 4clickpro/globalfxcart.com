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

  const homeClubGrid = document.getElementById('home-club-grid');
  if (homeClubGrid) {
    homeClubGrid.innerHTML = clubPosts.slice(0, 3).map(createPostCard).join('');
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
  const navEls = document.querySelectorAll('nav');
  const onScroll = () => {
    navEls.forEach(n => n.classList.toggle('scrolled', window.scrollY > 50));
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Mobile menu toggle (injected via JS so every page stays in sync)
  navEls.forEach(nav => {
    const ul = nav.querySelector('ul');
    if (!ul) return;
    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Toggle navigation menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span><span></span><span></span>';
    nav.insertBefore(toggle, ul);

    const close = () => {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    ul.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  });

  // Sticky mobile call bar — call or text to book from any page
  if (!document.querySelector('.sticky-call-bar')) {
    const bar = document.createElement('div');
    bar.className = 'sticky-call-bar';
    bar.innerHTML = '<a href="tel:8502998575" class="call-now">📞 Call (850) 299-8575</a><a href="sms:8502998575" class="text-now">💬 Text Us</a>';
    document.body.appendChild(bar);
  }

  // Video play buttons (any .video-wrap)
  document.querySelectorAll('.video-wrap').forEach(wrap => {
    const video = wrap.querySelector('video');
    const playBtn = wrap.querySelector('.video-play');
    if (video && playBtn) {
      playBtn.addEventListener('click', () => video.play());
      video.addEventListener('play', () => playBtn.classList.add('hidden'));
      video.addEventListener('pause', () => {
        if (video.ended) playBtn.classList.remove('hidden');
      });
    }
  });
});
