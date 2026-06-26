const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#nav');
const selectedAmount = document.querySelector('#selectedAmount');
const amountButtons = document.querySelectorAll('.amount-btn');
const contactForm = document.querySelector('#contactForm');
const statusText = document.querySelector('#status');
const badges = document.querySelectorAll('[data-badge]');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

amountButtons.forEach((button) => {
  button.addEventListener('click', () => {
    amountButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const amount = Number(button.dataset.amount).toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
    selectedAmount.textContent = amount;
  });
});
if (amountButtons.length) amountButtons[0].classList.add('active');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    statusText.textContent = 'Solicitud registrada en este prototipo. En producción se conectaría a WhatsApp o CRM.';
    contactForm.reset();
  });
}

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach((element) => fadeObserver.observe(element));

if (badges.length) {
  const orbitBadges = Array.from(badges).filter((el) => !el.classList.contains('featured'));
  let index = 0;
  const pulse = () => {
    orbitBadges.forEach((badge, i) => badge.classList.toggle('active', i === index));
    index = (index + 1) % orbitBadges.length;
  };
  pulse();
  setInterval(pulse, 2400);
}
