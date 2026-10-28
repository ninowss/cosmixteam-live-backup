// Wait only for above-the-fold images; never hold the page for the full archive.
const bootImages = [...document.querySelectorAll('.hero-duo img, .cosmix-boot img')];
const bootReady = Promise.allSettled(bootImages.map(image => image.decode()));
const bootLimit = new Promise(resolve => setTimeout(resolve, 1800));
Promise.race([bootReady, bootLimit]).then(() => {
  const remaining = Math.max(0, 650 - (Date.now() - (window.cosmixBootStarted || Date.now())));
  setTimeout(() => document.documentElement.classList.remove('cosmix-booting'), remaining);
});

const nav = document.querySelector('[data-nav]');
const menu = document.querySelector('.menu');

addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), { passive: true });
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.image-shell img').forEach((image) => {
  const shell = image.closest('.image-shell');
  const done = () => shell?.classList.add('is-loaded');
  if (image.complete && image.naturalWidth) done();
  else {
    image.addEventListener('load', done, { once: true });
    image.addEventListener('error', done, { once: true });
  }
});

const playerButtons = [...document.querySelectorAll('[data-player-filter]')];
const playerPanels = [...document.querySelectorAll('[data-player-panel]')];
playerButtons.forEach((button) => button.addEventListener('click', () => {
  const player = button.dataset.playerFilter;
  playerButtons.forEach((item) => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
  });
  playerPanels.forEach((panel) => {
    const selected = panel.dataset.playerPanel === player;
    panel.hidden = !selected;
    panel.classList.toggle('active', selected);
    if (selected) panel.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
  });
}));

const dialog = document.querySelector('.lightbox');
const preview = dialog.querySelector('img');
const caption = dialog.querySelector('.lightbox-caption p');
const ownerBadge = dialog.querySelector('.lightbox-caption .owner');
const items = [...document.querySelectorAll('[data-lightbox]')];
let active = 0;

function show(index) {
  active = (index + items.length) % items.length;
  const item = items[active];
  const image = item.querySelector('img');
  const owner = item.dataset.owner || 'COSMIXTEAM';
  preview.src = item.dataset.lightbox;
  preview.alt = image?.alt || 'COSMIXTEAM portfolio image';
  caption.textContent = image?.alt || 'COSMIXTEAM portfolio image';
  ownerBadge.textContent = owner === 'IKI' ? 'P1 // IKI' : owner === 'NAYOTA' ? 'P2 // NAYOTA' : owner;
  ownerBadge.dataset.owner = owner;
}

items.forEach((item, index) => item.addEventListener('click', () => {
  show(index);
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}));
function closeLightbox() {
  dialog.close();
  document.body.style.overflow = '';
}
dialog.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
dialog.querySelector('.lightbox-prev').addEventListener('click', () => show(active - 1));
dialog.querySelector('.lightbox-next').addEventListener('click', () => show(active + 1));
dialog.addEventListener('click', (event) => { if (event.target === dialog) closeLightbox(); });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
document.addEventListener('keydown', (event) => {
  if (!dialog.open) return;
  if (event.key === 'ArrowLeft') show(active - 1);
  if (event.key === 'ArrowRight') show(active + 1);
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
