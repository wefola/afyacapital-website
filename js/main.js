/* ==========================================================================
   Afya Capital — Landing Page Interactivity
   ========================================================================== */

// ── Mobile Hamburger Menu ──────────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Smooth Scrolling ──────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const nav = document.querySelector('nav');
    const navHeight = nav ? nav.offsetHeight : 0;

    window.scrollTo({
      top: target.offsetTop - navHeight,
      behavior: 'smooth'
    });
  });
});

// ── Scroll-Triggered Fade-In Animations ────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const animated = document.querySelectorAll('.animate-on-scroll');

  if (animated.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    animated.forEach(el => observer.observe(el));
  }
} else {
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.classList.add('visible');
  });
}
