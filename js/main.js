/* ============================================
   PORTFOLIO — ALEX VANCE
   main.js
   Sections:
   1. Custom Cursor
   2. Scroll Reveal
   3. Skill Bar Animation
   4. Nav Scroll Behaviour
============================================ */

/* ----- 1. Custom Cursor ----- */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .work-item, .play-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
    ring.style.borderColor = 'rgba(200,169,110,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.borderColor = 'rgba(200,169,110,0.5)';
  });
});

/* ----- 2. Scroll Reveal ----- */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));

/* ----- 3. Skill Bar Animation ----- */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.classList.add('animate');
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-categories').forEach(el => skillObserver.observe(el));

/* ----- 4. Nav Scroll Behaviour ----- */
const nav = document.querySelector('nav');
const navLogo = document.querySelector('.nav-logo');
const navLinks = document.querySelector('.nav-links');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'transparent';
    nav.style.backdropFilter = 'none';
    navLogo.style.opacity = '0';
    navLogo.style.pointerEvents = 'none';
    if (window.innerWidth > 900) {
      navLinks.style.opacity = '0';
      navLinks.style.pointerEvents = 'none';
    }
  } else {
    nav.style.background = 'linear-gradient(to bottom, rgba(5,5,7,0.95), transparent)';
    nav.style.backdropFilter = 'none';
    navLogo.style.opacity = '1';
    navLogo.style.pointerEvents = 'auto';
    navLinks.style.opacity = '1';
    navLinks.style.pointerEvents = 'auto';
  }
});

/* ----- 5. Mobile Nav ----- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});