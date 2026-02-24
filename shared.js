/* shared.js — Mahaveer Hospital */

// ── Active nav link ──
document.querySelectorAll('.nav-links a').forEach(link => {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const href = link.getAttribute('href');
  if (href === page || (page === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── Mobile nav toggle ──
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ── AOS-like scroll reveal ──
const observerCfg = { threshold: 0.12 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('aos-animate');
      observer.unobserve(e.target);
    }
  });
}, observerCfg);
document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
