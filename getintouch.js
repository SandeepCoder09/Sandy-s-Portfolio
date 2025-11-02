const menuIcon = document.getElementById('menuIcon');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('nav');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Scroll effect
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});
