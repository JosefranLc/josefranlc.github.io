const header = document.querySelector('#header');
const menuBtn = document.querySelector('#menuBtn');
const navLinks = document.querySelector('#navLinks');
const modal = document.querySelector('#imageModal');
const modalImage = document.querySelector('#modalImage');
const modalClose = document.querySelector('#modalClose');
const quoteForm = document.querySelector('#quoteForm');
const year = document.querySelector('#year');
const galleryTrack = document.querySelector('#galleryTrack');
const galleryPrev = document.querySelector('#galleryPrev');
const galleryNext = document.querySelector('#galleryNext');

const whatsappBase = 'https://api.whatsapp.com/send/?phone=557330135897&text=';

if (year) {
  year.textContent = new Date().getFullYear();
}

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
});

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-active');
    menuBtn.classList.toggle('active', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-active');
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

function openModal(src, alt) {
  if (!modal || !modalImage) return;
  modalImage.src = src;
  modalImage.alt = alt || 'Imagem ampliada';
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModal() {
  if (!modal || !modalImage) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  modalImage.src = '';
}

document.querySelectorAll('.gallery-slide img').forEach((image) => {
  const button = image.closest('.gallery-slide');

  button.addEventListener('click', () => openModal(image.src, image.alt));
  button.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal(image.src, image.alt);
    }
  });
});

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal && modal.classList.contains('active')) closeModal();
});

function scrollGallery(direction) {
  if (!galleryTrack) return;
  const distance = Math.min(galleryTrack.clientWidth * 0.82, 560);
  galleryTrack.scrollBy({ left: direction * distance, behavior: 'smooth' });
}

if (galleryPrev) {
  galleryPrev.addEventListener('click', () => scrollGallery(-1));
}

if (galleryNext) {
  galleryNext.addEventListener('click', () => scrollGallery(1));
}

if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.querySelector('#nome').value.trim();
    const email = document.querySelector('#email').value.trim();
    const assunto = document.querySelector('#assunto').value.trim();
    const mensagem = document.querySelector('#mensagem').value.trim();

    const texto = [
      'Olá, gostaria de atendimento pela Agamix.',
      nome ? `Nome: ${nome}` : '',
      email ? `E-mail: ${email}` : '',
      assunto ? `Assunto: ${assunto}` : '',
      mensagem ? `Mensagem: ${mensagem}` : ''
    ].filter(Boolean).join('\n');

    window.open(`${whatsappBase}${encodeURIComponent(texto)}&type=phone_number&app_absent=0`, '_blank');
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
