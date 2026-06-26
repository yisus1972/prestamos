const menuButton = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
const creditInput = document.querySelector('#creditInput');
const checkAmount = document.querySelector('#checkAmount');
const creditResult = document.querySelector('#creditResult');
const leadForm = document.querySelector('.lead-form');
const leadStatus = document.querySelector('#leadStatus');
const institutionBadges = document.querySelectorAll('[data-badge]');

if (menuButton) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

if (checkAmount) {
  checkAmount.addEventListener('click', () => {
    let amount = Number(creditInput.value);
    if (amount < 10000) amount = 10000;
    if (amount > 500000) amount = 500000;
    creditInput.value = amount;
    creditResult.textContent = amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
  });
}

if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    leadStatus.textContent = 'Datos recibidos en este prototipo. El siguiente paso sería conectarlo a WhatsApp Business.';
    leadForm.reset();
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((section) => revealObserver.observe(section));

if (institutionBadges.length) {
  const orbitBadges = Array.from(institutionBadges).filter((el) => !el.classList.contains('featured'));
  let current = 0;
  const rotate = () => {
    orbitBadges.forEach((badge, index) => badge.classList.toggle('active', index === current));
    current = (current + 1) % orbitBadges.length;
  };
  rotate();
  setInterval(rotate, 2200);
}
