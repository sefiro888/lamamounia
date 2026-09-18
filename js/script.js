'use strict';
/* ---------------------------------------------------------------------------
   MENÚ DE NAVEGACIÓN MÓVIL
   Panel a pantalla completa. Se enriquece desde aquí (números y pie de
   contacto) para no repetir el mismo bloque en las cinco páginas.
--------------------------------------------------------------------------- */
{
  const nav = document.querySelector('#navigation');
  const toggle = document.querySelector('.menu-toggle');
  const enlaces = [...nav.querySelectorAll('a')];

  // Numeración discreta, como en la carta.
  enlaces.forEach((a, i) => {
    if (a.querySelector('.nav-num')) return;
    const num = document.createElement('span');
    num.className = 'nav-num';
    num.setAttribute('aria-hidden', 'true');
    num.textContent = String(i + 1).padStart(2, '0');
    a.prepend(num);
  });

  // Pie del panel: lo que alguien busca cuando abre el menú de un restaurante.
  if (!nav.querySelector('.nav-foot')) {
    const pie = document.createElement('div');
    pie.className = 'nav-foot';
    pie.innerHTML =
      '<a class="nav-call" href="tel:+34620262019">620 26 20 19</a>' +
      '<a class="nav-wa" href="https://wa.me/34620262019?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20una%20mesa%20en%20La%20Mamounia.%0A%0APersonas%3A%20%0AD%C3%ADa%3A%20%0AHora%3A%20%0ANombre%3A%20" target="_blank" rel="noopener">Reservar por WhatsApp ↗</a>' +
      '<span class="nav-place">P.º Marítimo Rey de España, 5 · Fuengirola</span>';
    nav.append(pie);
  }

  // Marca dentro del panel: el panel cubre la cabecera (es hija suya), así que
  // el nombre tiene que estar también aquí para no perder la referencia.
  if (!nav.querySelector('.nav-marca')) {
    const marca = document.createElement('span');
    marca.className = 'nav-marca';
    marca.setAttribute('aria-hidden', 'true');
    marca.textContent = 'La Mamounia';
    nav.prepend(marca);
  }

  const icono = toggle.querySelector('span');
  // La cabecera cambia de alto según haya avisos o no, así que el panel se
  // ajusta a la posición real del botón en vez de a una medida fija.
  const ajustarAlBoton = () => {
    const caja = toggle.getBoundingClientRect();
    nav.style.setProperty('--nav-top', `${Math.round(caja.bottom + 30)}px`);
    nav.style.setProperty('--marca-top', `${Math.round(caja.top + caja.height / 2 - 14)}px`);
  };
  const abrir = () => {
    ajustarAlBoton();
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-abierto');
    toggle.setAttribute('aria-label', 'Cerrar menú');
    toggle.firstChild.textContent = 'Cerrar ';
    icono.textContent = '✕';
  };
  const cerrar = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-abierto');
    toggle.setAttribute('aria-label', 'Abrir menú');
    toggle.firstChild.textContent = 'Menú ';
    icono.textContent = '☰';
  };

  toggle.addEventListener('click', () =>
    toggle.getAttribute('aria-expanded') === 'true' ? cerrar() : abrir());
  enlaces.forEach(a => a.addEventListener('click', cerrar));
  nav.querySelectorAll('.nav-foot a').forEach(a => a.addEventListener('click', cerrar));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { cerrar(); toggle.focus(); }
  });
  // Al pasar a escritorio el panel deja de tener sentido.
  matchMedia('(min-width:801px)').addEventListener('change', cerrar);
  cerrar();
}

const dialog=document.querySelector('#lightbox');
if(dialog){document.querySelectorAll('.gallery-open').forEach(button=>button.addEventListener('click',()=>{const source=button.querySelector('img');dialog.querySelector('img').src=source.src;dialog.querySelector('img').alt=source.alt;dialog.querySelector('p').textContent=source.alt;dialog.showModal()}));dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-gallery]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('[data-kind]').forEach(f=>f.hidden=button.dataset.gallery!=='todos'&&f.dataset.kind!==button.dataset.gallery)}))}
/* El formulario de reserva se retiró: la reserva es por teléfono o WhatsApp,
   así que la web no recoge ningún dato personal. */

// Cinta de avisos: se desplaza sin parar, encadenando varios mensajes.
// Para editar los avisos basta con tocar la lista `notices`.
const announcement = document.querySelector('.announcement');
if (announcement) {
  const ICONS = {
    encargo: '<path d="M12 3.2 18.5 16h-13z"/><path d="M3 18.5h18"/><circle cx="12" cy="2" r="1.1"/>',
    musica: '<path d="M9 17.5V5.2l10-2v12.1"/><circle cx="6.4" cy="17.8" r="2.6"/><circle cx="16.4" cy="15.3" r="2.6"/>',
    carta: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 8.5h6M9 12h6M9 15.5h3.5"/>',
    mar: '<path d="M2 16.5c2 0 2-1.6 4-1.6s2 1.6 4 1.6 2-1.6 4-1.6 2 1.6 4 1.6 2-1.6 4-1.6"/><path d="M2 20.5c2 0 2-1.6 4-1.6s2 1.6 4 1.6 2-1.6 4-1.6 2 1.6 4 1.6 2-1.6 4-1.6"/><circle cx="17" cy="6" r="3"/>',
    estrella: '<path d="M12 2.5 14.9 9l7 .6-5.3 4.6 1.6 6.8L12 17.4 5.8 21l1.6-6.8L2.1 9.6 9.1 9z"/>',
    telefono: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'
  };
  const notices = [
    { icon: 'carta', text: '142 platos de Marruecos y Líbano', url: 'carta.html' },
    { icon: 'encargo', text: 'Platos por encargo para tus celebraciones', url: 'index.html#encargos' },
    { icon: 'musica', text: 'Música en directo: consulta las próximas fechas', url: 'index.html#actualidad' },
    { icon: 'mar', text: 'Terraza en el Paseo Marítimo de Fuengirola', url: 'contacto.html' },
    { icon: 'estrella', text: '4,8 sobre 5 con 622 reseñas en Google', url: 'https://share.google/9EEaPiWaH3FW9OBkY' },
    { icon: 'telefono', text: 'Reserva llamando al 620 26 20 19', url: 'tel:+34620262019' }
  ];
  const VELOCIDAD = 62;   // píxeles por segundo
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  function crearAviso(item) {
    const a = document.createElement('a');
    a.className = 'ticker-item';
    a.href = item.url;
    if (item.url.startsWith('https:')) { a.target = '_blank'; a.rel = 'noopener'; }
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', 'announcement-icon');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = ICONS[item.icon];
    const span = document.createElement('span');
    span.textContent = item.text;
    a.append(icon, span);
    return a;
  }

  function crearSeparador() {
    const s = document.createElement('span');
    s.className = 'ticker-sep';
    s.setAttribute('aria-hidden', 'true');
    return s;
  }

  // Una pasada completa por todos los avisos.
  function crearSecuencia(oculta) {
    const grupo = document.createElement('div');
    grupo.className = 'ticker-run';
    if (oculta) grupo.setAttribute('aria-hidden', 'true');
    for (const item of notices) {
      grupo.append(crearAviso(item), crearSeparador());
    }
    return grupo;
  }

  // Se reconstruye el interior del aviso: el contenido estático del HTML
  // queda como alternativa si este script no llega a ejecutarse.
  announcement.replaceChildren();
  const pista = document.createElement('div');
  pista.className = 'ticker-track';
  const cinta = document.createElement('div');
  cinta.className = 'ticker';
  cinta.append(pista);

  const controles = document.createElement('div');
  controles.className = 'announcement-controls';
  const pausa = document.createElement('button');
  pausa.type = 'button';
  pausa.className = 'announcement-pause';
  const cerrar = document.createElement('button');
  cerrar.type = 'button';
  cerrar.className = 'announcement-close';
  cerrar.setAttribute('aria-label', 'Cerrar avisos');
  cerrar.textContent = '×';
  controles.append(pausa, cerrar);
  announcement.append(cinta, controles);

  /* La pista lleva dos mitades idénticas y se anima de 0 a -50%: al llegar,
     la segunda está justo donde empezó la primera y el salto no se ve.
     Cada mitad se repite hasta cubrir la pantalla, para que no queden huecos. */
  function montar() {
    pista.replaceChildren();
    const medida = crearSecuencia(false);
    pista.append(medida);
    const anchoSecuencia = medida.scrollWidth;
    if (!anchoSecuencia) return;
    const copias = Math.max(1, Math.ceil(innerWidth / anchoSecuencia));
    pista.replaceChildren();
    for (let i = 0; i < copias; i++) pista.append(crearSecuencia(i > 0));
    for (let i = 0; i < copias; i++) pista.append(crearSecuencia(true));
    // Velocidad constante en píxeles por segundo, mida lo que mida el texto.
    pista.style.animationDuration = `${(anchoSecuencia * copias) / VELOCIDAD}s`;
  }

  let parado = reduce.matches;
  function pintarPausa() {
    announcement.classList.toggle('is-paused', parado);
    pausa.textContent = parado ? '▷' : 'Ⅱ';
    pausa.setAttribute('aria-label', parado ? 'Reanudar los avisos' : 'Detener los avisos');
  }
  pausa.addEventListener('click', () => { parado = !parado; pintarPausa(); });
  cerrar.addEventListener('click', () => {
    announcement.hidden = true;
    document.querySelector('header .brand').focus();
  });
  // Al pasar el ratón o llevar el foco dentro, la cinta se detiene para poder leer.
  announcement.addEventListener('mouseenter', () => announcement.classList.add('is-hover'));
  announcement.addEventListener('mouseleave', () => announcement.classList.remove('is-hover'));
  announcement.addEventListener('focusin', () => announcement.classList.add('is-hover'));
  announcement.addEventListener('focusout', e => {
    if (!announcement.contains(e.relatedTarget)) announcement.classList.remove('is-hover');
  });
  reduce.addEventListener('change', e => { if (e.matches) { parado = true; pintarPausa(); } });

  let remontar;
  addEventListener('resize', () => { clearTimeout(remontar); remontar = setTimeout(montar, 220); });

  montar();
  pintarPausa();
  // Las fuentes propias cambian el ancho del texto al cargar: se recalcula.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(montar);
}

/* Escenas del hero. Cada una usa una foto distinta acorde con su nombre.
   Hay que cambiar el srcset y no sólo el src: con srcset presente, el
   navegador lo prioriza y la imagen no cambiaba nunca. */
const scenes={
 interior:{image:'interior',anchos:[640],alt:'Fachada y mosaicos de La Mamounia, con las mesas preparadas'},
 tajines:{image:'tajines',anchos:[640,1024],alt:'Selección de tajines servidos en La Mamounia'},
 sala:{image:'sala',anchos:[640],alt:'Lámparas y decoración del salón de La Mamounia'}
};
document.querySelectorAll('[data-scene]').forEach(button=>button.addEventListener('click',()=>{
 const scene=scenes[button.dataset.scene];
 const img=document.querySelector('.hero-image');
 img.srcset=scene.anchos.map(w=>`assets/images/${scene.image}-${w}.webp ${w}w`).join(', ');
 img.src=`assets/images/${scene.image}-${scene.anchos[0]}.webp`;
 img.alt=scene.alt;
 img.classList.remove('scene-enter');
 requestAnimationFrame(()=>img.classList.add('scene-enter'));
 document.querySelectorAll('[data-scene]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
}));
const plans={
 sharing:{image:'mezze',alt:'Mezze y ensaladas para compartir',label:'AL CENTRO DE LA MESA',title:'Un mezze. Muchas conversaciones.',copy:'Empieza con la selección de mezze frío y caliente para dos. Después, decidid juntos por dónde seguir.',link:'Ver los mezze ↗',href:'carta.html?categoria=mezze'},
 evening:{image:'mesa',alt:'Mesa preparada con vajilla decorada',label:'UNA MESA PARA DOS',title:'Que la noche se alargue.',copy:'Tajines, una mesa junto al paseo y tiempo para la sobremesa. Si quieres venir una noche con música, consulta primero las fechas.',link:'Preparar nuestra visita ↗',href:'contacto.html#reservar'},
 party:{image:'cuscus',alt:'Cuscús de La Mamounia',label:'PLATOS POR ENCARGO',title:'Tú pones el motivo.',copy:'Reuniones familiares, cumpleaños y eventos de empresa. El restaurante prepara platos marroquíes por encargo: consulta opciones y disponibilidad por mensaje directo.',link:'Consultar por Instagram ↗',href:'https://www.instagram.com/lamamouniafuengirola/'}
};
const planButtons=[...document.querySelectorAll('[data-plan]')];
function selectPlan(button){const plan=plans[button.dataset.plan],panel=document.querySelector('#plan-panel');planButtons.forEach(b=>{b.setAttribute('aria-selected',String(b===button));b.tabIndex=b===button?0:-1});panel.setAttribute('aria-labelledby',button.id);panel.querySelector('img').src=`assets/images/${plan.image}.jpg`;panel.querySelector('img').alt=plan.alt;panel.querySelector('.eyebrow').textContent=plan.label;panel.querySelector('h3').textContent=plan.title;panel.querySelector('p').textContent=plan.copy;const a=panel.querySelector('a');a.href=plan.href;a.textContent=plan.link;a.target=plan.href.startsWith('https:')?'_blank':'_self';a.rel='noopener'}
planButtons.forEach((b,i)=>{b.addEventListener('click',()=>selectPlan(b));b.addEventListener('keydown',e=>{let next;if(['ArrowRight','ArrowDown'].includes(e.key))next=(i+1)%planButtons.length;else if(['ArrowLeft','ArrowUp'].includes(e.key))next=(i+planButtons.length-1)%planButtons.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=planButtons.length-1;else return;e.preventDefault();selectPlan(planButtons[next]);planButtons[next].focus()})});
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.happenings .section-heading,.story-card,.taste,.journey,.sunset>div,.occasion-note').forEach(el=>{el.classList.add('reveal-ready');observer.observe(el)})}

/* Barra de utilidad: estado de apertura.
   Horario según la ficha de Google consultada el 18/09/2026: 14:00-01:00,
   martes cerrado. Instagram publica un horario distinto, así que el estado
   se muestra SIEMPRE citando la fuente y invitando a confirmar por teléfono.
   Editar aquí si el restaurante confirma otro horario. */
const HOURS = { open: 14, close: 1, closedDay: 2 }; // closedDay: 0=domingo, 2=martes
const statusEl = document.querySelector('#open-status');
if (statusEl) {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const yesterday = (day + 6) % 7;
  const lateNight = hour < HOURS.close && yesterday !== HOURS.closedDay;
  const daytime = hour >= HOURS.open && day !== HOURS.closedDay;
  const isOpen = lateNight || daytime;

  statusEl.replaceChildren();
  statusEl.className = 'utility-status ' + (isOpen ? 'is-open' : 'is-closed');
  const label = document.createElement('span');
  if (isOpen) {
    label.textContent = 'Abierto ahora · cierra a la 01:00';
  } else if (day === HOURS.closedDay) {
    label.textContent = 'Hoy cerrado (martes)';
  } else {
    label.textContent = 'Cerrado ahora · abre a las 14:00';
  }
  const source = document.createElement('small');
  source.textContent = 'según Google';
  statusEl.append(label, source);
  statusEl.title = 'Horario publicado en Google (14:00-01:00, martes cerrado). Confirma por teléfono antes de venir.';
}

/* Arcos marroquíes como recorte real de las imágenes.
   Se definen una sola vez por página, en coordenadas normalizadas
   (objectBoundingBox) para que se adapten a cualquier tamaño.
   Si esto no se ejecuta, las imágenes se ven rectangulares: no se rompe nada. */
{
  const svgNS = 'http://www.w3.org/2000/svg';
  const shapes = {
    // Herradura suave: para fotos de plato y tarjetas.
    'arch-round': 'M0,1 L0,0.52 C0,0.17 0.17,0 0.5,0 C0.83,0 1,0.17 1,0.52 L1,1 Z',
    // Apuntado, el de los vanos marroquíes: para las piezas grandes.
    'arch-pointed': 'M0,1 L0,0.55 C0,0.3 0.26,0.14 0.5,0 C0.74,0.14 1,0.3 1,0.55 L1,1 Z'
  };
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  const defs = document.createElementNS(svgNS, 'defs');
  for (const [id, d] of Object.entries(shapes)) {
    const clip = document.createElementNS(svgNS, 'clipPath');
    clip.setAttribute('id', id);
    clip.setAttribute('clipPathUnits', 'objectBoundingBox');
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', d);
    clip.append(path);
    defs.append(clip);
  }
  svg.append(defs);
  document.body.prepend(svg);
}
