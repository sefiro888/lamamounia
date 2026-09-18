'use strict';
/* Carta de La Mamounia — se lee de arriba abajo, como la carta de papel.
   Los datos están en js/menu-data.js (MENU, PHOTOS). Este archivo sólo pinta.
   No hay pestañas: el índice salta a un capítulo, nunca esconde el resto. */

const euro = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
const money = value => value === null ? 'Consultar' : euro.format(value);
const normalize = text => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const indexEl = document.querySelector('#menu-index');
const bookEl = document.querySelector('#menu-book');
const searchEl = document.querySelector('#menu-search');
const clearEl = document.querySelector('#menu-search-clear');
const filterStatusEl = document.querySelector('#menu-status');

let search = '';
let diet = 'todo';

/* ---- Índice de capítulos ---- */
for (const chapter of MENU) {
  const link = document.createElement('a');
  link.href = '#' + chapter.id;
  link.textContent = chapter.nombre;
  link.dataset.chapter = chapter.id;
  indexEl.append(link);
}

/* ---- La carta entera, pintada una sola vez ---- */
function tagMark(tags) {
  const marks = [];
  if (tags.includes('sin-carne')) marks.push(['✿', 'Sin carne ni pescado']);
  if (tags.includes('especialidad')) marks.push(['★', 'Especialidad de la casa']);
  return marks;
}

function dishRow(dish) {
  const [name, price, description, tags = []] = dish;
  const row = document.createElement('article');
  row.className = 'dish';
  row.dataset.search = normalize(name + ' ' + description);
  row.dataset.tags = tags.join(' ');

  const line = document.createElement('p');
  line.className = 'dish-line';
  const title = document.createElement('span');
  title.className = 'dish-name';
  title.textContent = name;
  for (const [symbol, label] of tagMark(tags)) {
    const mark = document.createElement('abbr');
    mark.className = 'dish-mark';
    mark.title = label;
    mark.textContent = symbol;
    title.append(' ', mark);
  }
  const dots = document.createElement('span');
  dots.className = 'dish-dots';
  dots.setAttribute('aria-hidden', 'true');
  const priceEl = document.createElement('span');
  priceEl.className = 'dish-price';
  priceEl.textContent = money(price);
  line.append(title, dots, priceEl);
  row.append(line);

  if (description) {
    const note = document.createElement('p');
    note.className = 'dish-note';
    note.textContent = description;
    row.append(note);
  }
  return row;
}

function photoStrip(chapter) {
  // Las fotos disponibles de ese capítulo, agrupadas antes de la lista.
  const names = chapter.secciones.flatMap(s => s.platos.map(d => d[0])).filter(n => PHOTOS[n]);
  if (!names.length) return null;
  const strip = document.createElement('div');
  strip.className = 'photo-strip';
  for (const name of names) {
    const photo = PHOTOS[name];
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = photo.file;
    img.alt = photo.shared
      ? 'Fotografía de parrilla que Glovo reutiliza en varios platos'
      : name + ' — fotografía publicada en Glovo';
    img.loading = 'lazy';
    img.width = 320;
    img.height = 320;
    const caption = document.createElement('figcaption');
    caption.textContent = photo.shared ? name + ' (imagen compartida)' : name;
    figure.append(img, caption);
    strip.append(figure);
  }
  return strip;
}

for (const chapter of MENU) {
  const section = document.createElement('section');
  section.className = 'chapter';
  section.id = chapter.id;

  const head = document.createElement('div');
  head.className = 'chapter-head';
  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = chapter.subtitulo.toUpperCase();
  const title = document.createElement('h2');
  title.textContent = chapter.nombre;
  head.append(eyebrow, title);
  if (chapter.entradilla) {
    const intro = document.createElement('p');
    intro.className = 'chapter-intro';
    intro.textContent = chapter.entradilla;
    head.append(intro);
  }
  section.append(head);

  const strip = photoStrip(chapter);
  if (strip) section.append(strip);

  for (const group of chapter.secciones) {
    const block = document.createElement('div');
    block.className = 'group';
    block.dataset.group = group.id;

    const heading = document.createElement('h3');
    heading.textContent = group.nombre;

    // Cuando todo el grupo cuesta lo mismo, se dice una vez y no en cada línea.
    const prices = [...new Set(group.platos.map(d => d[1]))];
    if (prices.length === 1 && group.platos.length > 2 && prices[0] !== null) {
      const flat = document.createElement('span');
      flat.className = 'group-price';
      flat.textContent = 'Todos a ' + money(prices[0]);
      heading.append(flat);
      block.classList.add('group-flat');
    }
    block.append(heading);

    if (group.descripcion) {
      const note = document.createElement('p');
      note.className = 'group-note';
      note.textContent = group.descripcion;
      block.append(note);
    }

    for (const dish of group.platos) block.append(dishRow(dish));
    section.append(block);
  }
  bookEl.append(section);
}

/* ---- Buscador y filtros: ocultan líneas, nunca cambian de página ---- */
function applyFilter() {
  let visible = 0;
  for (const row of bookEl.querySelectorAll('.dish')) {
    const tags = row.dataset.tags;
    const okDiet = diet === 'todo' || tags.includes(diet);
    const okSearch = !search || row.dataset.search.includes(search);
    const show = okDiet && okSearch;
    row.hidden = !show;
    if (show) visible++;
  }
  // Un grupo o capítulo sin platos visibles desaparece con su título.
  for (const group of bookEl.querySelectorAll('.group')) {
    group.hidden = !group.querySelector('.dish:not([hidden])');
  }
  for (const chapter of bookEl.querySelectorAll('.chapter')) {
    const empty = !chapter.querySelector('.group:not([hidden])');
    chapter.hidden = empty;
    const link = indexEl.querySelector(`[data-chapter="${chapter.id}"]`);
    if (link) link.classList.toggle('is-empty', empty);
  }

  const filtering = search || diet !== 'todo';
  if (!filtering) {
    filterStatusEl.textContent = '';
    filterStatusEl.classList.remove('is-active');
  } else {
    filterStatusEl.classList.add('is-active');
    filterStatusEl.textContent = visible
      ? `${visible} ${visible === 1 ? 'plato' : 'platos'} con este filtro`
      : `No encontramos «${searchEl.value.trim()}» en la carta.`;
  }
  updateIndex();
}

searchEl.addEventListener('input', () => {
  search = normalize(searchEl.value.trim());
  clearEl.hidden = !searchEl.value;
  applyFilter();
});
clearEl.addEventListener('click', () => {
  searchEl.value = '';
  search = '';
  clearEl.hidden = true;
  searchEl.focus();
  applyFilter();
});
document.querySelectorAll('[data-diet]').forEach(button =>
  button.addEventListener('click', () => {
    diet = button.dataset.diet;
    document.querySelectorAll('[data-diet]').forEach(b =>
      b.setAttribute('aria-pressed', String(b === button)));
    applyFilter();
  }));

/* ---- El índice marca el capítulo en el que estás ----
   Se recalcula en cada scroll en lugar de observar intersecciones: los
   capítulos son mucho más altos que la pantalla y un observador deja de
   avisar mientras sigues dentro del mismo. */
let spyPending = false;
let spyCurrent = '';
function updateIndex() {
  spyPending = false;
  // Se considera que estás en un capítulo cuando su inicio sube por encima
  // del primer tercio de la pantalla, nunca por detrás de la barra.
  const line = Math.max(indexEl.getBoundingClientRect().bottom + 20, innerHeight * 0.3);
  let active = '';
  for (const chapter of bookEl.querySelectorAll('.chapter:not([hidden])')) {
    if (chapter.getBoundingClientRect().top <= line) active = chapter.id;
  }
  if (active === spyCurrent) return;
  spyCurrent = active;
  for (const link of indexEl.querySelectorAll('a')) {
    const on = link.dataset.chapter === active;
    link.setAttribute('aria-current', String(on));
    // Sólo se mueve la barra en horizontal: scrollIntoView arrastraría la página.
    if (on && indexEl.scrollWidth > indexEl.clientWidth) {
      const left = link.offsetLeft - (indexEl.clientWidth - link.offsetWidth) / 2;
      indexEl.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
    }
  }
}
addEventListener('scroll', () => {
  if (spyPending) return;
  spyPending = true;
  requestAnimationFrame(updateIndex);
}, { passive: true });
addEventListener('resize', updateIndex);
updateIndex();

/* Salto al capítulo pedido. La carta se genera con JS, así que cuando el
   navegador procesa el #ancla el capítulo aún no existe: se salta aquí.
   También se aceptan los enlaces antiguos ?recorrido=… y ?categoria=… */
const query = new URLSearchParams(location.search);
const legacy = {
  compartir: 'entrantes', mezze: 'entrantes', frios: 'entrantes', calientes: 'entrantes',
  hummus: 'entrantes', ensaladas: 'ensaladas', libano: 'principales', marruecos: 'principales',
  tajines: 'principales', cuscus: 'principales', pastelas: 'principales', libaneses: 'principales',
  parrilla: 'parrilla', dulces: 'postres', postres: 'postres',
  bebidas: 'bebidas', 'te-cafe': 'bebidas', refrescos: 'bebidas', cervezas: 'bebidas',
  vinos: 'bebidas', destilados: 'bebidas'
};
const asked = location.hash.slice(1) || query.get('recorrido') || query.get('categoria');
const target = MENU.some(c => c.id === asked) ? asked : legacy[asked];
if (target) {
  const el = document.getElementById(target);
  if (el) {
    // Se repite tras 'load' porque las fotos que cargan después mueven el destino.
    history.scrollRestoration = 'manual';
    const jump = () => {
      el.scrollIntoView({ block: 'start' });
      requestAnimationFrame(updateIndex);
    };
    jump();
    addEventListener('load', () => requestAnimationFrame(jump), { once: true });
  }
}
