const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#main-menu');
const amountRange = document.querySelector('#amountRange');
const amountOutput = document.querySelector('#amountOutput');
const form = document.querySelector('.contact-form');
const formMessage = document.querySelector('#formMessage');
const trustBadges = document.querySelectorAll('[data-badge]');

if (menuButton) {
  menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

if (amountRange) {
  amountRange.addEventListener('input', () => {
    const value = Number(amountRange.value).toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
    amountOutput.textContent = value;
  });
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formMessage.textContent = 'Gracias. Un asesor puede revisar tu caso y contactarte por WhatsApp.';
    form.reset();
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

if (trustBadges.length) {
  const badges = Array.from(trustBadges).filter((el) => !el.classList.contains('featured'));
  let activeIndex = 0;
  const rotateBadges = () => {
    badges.forEach((badge, index) => badge.classList.toggle('active', index === activeIndex));
    activeIndex = (activeIndex + 1) % badges.length;
  };
  rotateBadges();
  setInterval(rotateBadges, 2200);
}
