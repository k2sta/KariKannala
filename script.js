// Yhteinen skripti: index.html ja vaaliohjelma.html

// Mobiilivalikko
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Vaaliohjelma (vaaliohjelma.html): avaa / sulje kaikki
const toggleAll = document.getElementById('toggle-all');
const planks = document.querySelectorAll('.plank');

if (toggleAll) {
  toggleAll.addEventListener('click', () => {
    const openAll = [...planks].some(p => !p.open);
    planks.forEach(p => (p.open = openAll));
    toggleAll.textContent = openAll ? 'Sulje kaikki' : 'Avaa kaikki';
  });
}

// Teema-linkki (esim. vaaliohjelma.html#kohta-9) avaa ja näyttää kyseisen kohdan
function openFromHash() {
  const target = location.hash && document.querySelector(location.hash);
  if (target && target.classList.contains('plank')) {
    target.open = true;
    target.scrollIntoView({ block: 'start' });
  }
}
openFromHash();
window.addEventListener('hashchange', openFromHash);

// Kirjoitukset ja kuvat (index.html): avaa suurennettuna (data-full, data-alt, data-caption)
const lightbox = document.getElementById('lightbox');

if (lightbox) {
  const lbImg = lightbox.querySelector('img');
  const lbCap = lightbox.querySelector('figcaption');

  document.querySelectorAll('[data-full]').forEach(btn =>
    btn.addEventListener('click', () => {
      lbImg.src = btn.dataset.full;
      lbImg.alt = btn.dataset.alt || '';
      lbCap.textContent = btn.dataset.caption || '';
      lbCap.hidden = !btn.dataset.caption;
      lightbox.showModal();
      document.body.classList.add('no-scroll');
    })
  );
  // Sulje: ruksi, klikkaus kuvan ulkopuolelle tai Esc
  lightbox.addEventListener('click', e => { if (e.target !== lbImg && e.target !== lbCap) lightbox.close(); });
  lightbox.addEventListener('close', () => document.body.classList.remove('no-scroll'));
}

// Tapahtumat (index.html): piilota menneet tapahtumat
const events = document.querySelectorAll('.event');

if (events.length) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  let upcoming = 0;
  events.forEach(ev => {
    if (new Date(ev.dataset.date + 'T23:59:59') < today) ev.hidden = true;
    else upcoming++;
  });
  if (!upcoming) document.querySelector('.events-empty').hidden = false;
}
