// Filtering System
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const filter = this.dataset.filter;
    const parent = this.closest('section').querySelector('.grid, #gallery-grid');
    
    // Filter items
    filterItems(parent, filter);
    
    // Update active state
    this.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

function filterItems(parent, filter) {
  const items = parent.querySelectorAll('.project-item, .gallery-item');
  
  items.forEach(item => {
    const matches = filter === 'all' || item.classList.contains(filter);
    item.style.opacity = matches ? 1 : 0;
    item.style.transform = matches ? 'scale(1)' : 'scale(0.9)';
    item.style.pointerEvents = matches ? 'all' : 'none';
    item.style.transition = 'all 0.3s ease';
  });
}

// Blog Loading (Example with static data)
const blogPosts = [
  {
    title: "Reviving Ancient Water Systems",
    excerpt: "How traditional systems inspire modern engineering...",
    slug: "#"
  },
  {
    title: "Modern Civil Engineering Trends",
    excerpt: "Exploring new technologies in infrastructure...",
    slug: "#"
  }
];

function loadBlogPosts() {
  const container = document.getElementById('blog-list');
  
  blogPosts.forEach(post => {
    const article = document.createElement('article');
    article.className = 'blog-post';
    article.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <a href="${post.slug}" class="btn btn-secondary">Read more</a>
    `;
    container.appendChild(article);
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadBlogPosts();
  
  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Show loading state
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').style.display = 'none';
  submitBtn.querySelector('.loading-dots').style.display = 'flex';
  
  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      formStatus.textContent = 'Message sent successfully!';
      formStatus.classList.add('success');
      contactForm.reset();
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    formStatus.textContent = 'Oops! Something went wrong. Please try again.';
    formStatus.classList.add('error');
  } finally {
    formStatus.style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').style.display = 'block';
    submitBtn.querySelector('.loading-dots').style.display = 'none';
    
    // Hide status message after 5 seconds
    setTimeout(() => {
      formStatus.style.display = 'none';
      formStatus.classList.remove('success', 'error');
    }, 5000);
  }
});