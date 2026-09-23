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

// Vaaliohjelma: avaa / sulje kaikki
const toggleAll = document.getElementById('toggle-all');
const planks = document.querySelectorAll('.plank');

toggleAll.addEventListener('click', () => {
  const openAll = [...planks].some(p => !p.open);
  planks.forEach(p => (p.open = openAll));
  toggleAll.textContent = openAll ? 'Sulje kaikki' : 'Avaa kaikki';
});
