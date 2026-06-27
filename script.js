const menuButton = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
const creditInput = document.querySelector('#creditInput');
const checkAmount = document.querySelector('#checkAmount');
const creditResult = document.querySelector('#creditResult');
const leadForm = document.querySelector('.lead-form');
const leadStatus = document.querySelector('#leadStatus');
const institutionBadges = document.querySelectorAll('[data-badge]');
const whatsappButtons = document.querySelectorAll('.whatsapp-btn');

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

    creditResult.textContent = amount.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0
    });
  });
}

const buildWhatsappMessage = () => {
  const fullNameInput = document.querySelector('#fullName');
  const clientWhatsappInput = document.querySelector('#clientWhatsapp');
  const pensionTypeSelect = document.querySelector('#pensionType');

  const fullName = fullNameInput ? fullNameInput.value.trim() : '';
  const clientWhatsapp = clientWhatsappInput ? clientWhatsappInput.value.trim() : '';
  const pensionType = pensionTypeSelect ? pensionTypeSelect.value.trim() : '';

  if (!fullName || !clientWhatsapp || !pensionType) {
    return null;
  }

  return [
    'Hola, quiero información sobre un préstamo para pensionados o jubilados.',
    '',
    `Nombre: ${fullName}`,
    `WhatsApp: ${clientWhatsapp}`,
    `Tipo de pensión: ${pensionType}`,
    '',
    'Me gustaría recibir una cotización.'
  ].join('\n');
};

if (whatsappButtons.length) {
  whatsappButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const message = buildWhatsappMessage();

      if (!message) {
        if (leadStatus) {
          leadStatus.textContent = 'Completa todos los campos antes de contactar a un asesor.';
        }

        return;
      }

      const whatsappNumber = button.dataset.whatsappNumber;
      const advisorName = button.dataset.advisorName || 'asesor';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      if (leadStatus) {
        leadStatus.textContent = `Abriendo WhatsApp con ${advisorName}.`;
      }

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  });
}

if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
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
    orbitBadges.forEach((badge, index) => {
      badge.classList.toggle('active', index === current);
    });

    current = (current + 1) % orbitBadges.length;
  };

  rotate();
  setInterval(rotate, 2200);
}