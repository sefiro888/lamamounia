'use strict';
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();toggle.focus()}});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
window.matchMedia('(min-width:801px)').addEventListener('change',closeMenu);
const dialog=document.querySelector('#lightbox');
if(dialog){document.querySelectorAll('.gallery-open').forEach(button=>button.addEventListener('click',()=>{const source=button.querySelector('img');dialog.querySelector('img').src=source.src;dialog.querySelector('img').alt=source.alt;dialog.querySelector('p').textContent=source.alt;dialog.showModal()}));dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-gallery]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('[data-kind]').forEach(f=>f.hidden=button.dataset.gallery!=='todos'&&f.dataset.kind!==button.dataset.gallery)}))}
/* El formulario de reserva se retiró: la reserva es por teléfono o WhatsApp,
   así que la web no recoge ningún dato personal. */

// Avisos editables: contenido contrastado en Instagram y Google el 18/09/2026.
// Cada aviso lleva su icono. Para añadir uno nuevo basta con otra entrada aquí.
const announcement=document.querySelector('.announcement');
if(announcement){
 const ICONS={
  encargo:'<path d="M12 3.2 18.5 16h-13z"/><path d="M3 18.5h18"/><circle cx="12" cy="2" r="1.1"/>',
  musica:'<path d="M9 17.5V5.2l10-2v12.1"/><circle cx="6.4" cy="17.8" r="2.6"/><circle cx="16.4" cy="15.3" r="2.6"/>',
  carta:'<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 8.5h6M9 12h6M9 15.5h3.5"/>'
 };
 const notices=[
  {icon:'encargo',title:'Tu celebración, con sabor marroquí.',text:'Platos por encargo para compartir.',url:'index.html#encargos'},
  {icon:'musica',title:'Música en directo en La Mamounia.',text:'Consulta las próximas fechas.',url:'index.html#noches'},
  {icon:'carta',title:'142 platos de Marruecos y Líbano.',text:'Descubre la carta completa.',url:'carta.html'}
 ];
 const DURACION=7000;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let current=0,timer=null,paused=reduce.matches;
 const link=announcement.querySelector('#announcement-link'),pause=announcement.querySelector('.announcement-pause');

 // Barra de tiempo: se inyecta aquí para no repetirla en las cinco páginas.
 const progress=document.createElement('span');
 progress.className='announcement-progress';
 progress.setAttribute('aria-hidden','true');
 announcement.append(progress);

 function paintNotice(){
  const item=notices[current];
  link.replaceChildren();
  const icon=document.createElementNS('http://www.w3.org/2000/svg','svg');
  icon.setAttribute('class','announcement-icon');
  icon.setAttribute('viewBox','0 0 24 24');
  icon.setAttribute('aria-hidden','true');
  icon.innerHTML=ICONS[item.icon];
  const title=document.createElement('strong');
  title.textContent=item.title;
  const text=document.createElement('span');
  text.className='announcement-text';
  text.textContent=item.text;
  const arrow=document.createElement('span');
  arrow.className='announcement-arrow';
  arrow.textContent='↗';
  arrow.setAttribute('aria-hidden','true');
  link.append(icon,title,text,arrow);
  link.href=item.url;
  link.target=item.url.startsWith('https:')?'_blank':'_self';
  link.rel='noopener';
  announcement.querySelector('.announcement-count').textContent=`${current+1} / ${notices.length}`;
  // Reinicia la animación de entrada y la barra de tiempo.
  link.classList.remove('is-entering');
  progress.classList.remove('is-running');
  void link.offsetWidth;
  link.classList.add('is-entering');
  if(!paused)progress.classList.add('is-running');
 }
 // Al parar se congelan las animaciones en su sitio en vez de reiniciarlas,
 // para que la barra de tiempo no siga corriendo con el carrusel detenido.
 function stopNotices(){clearInterval(timer);timer=null;announcement.classList.add('is-paused')}
 function startNotices(){
  clearInterval(timer);timer=null;
  if(paused||document.hidden||announcement.hidden){announcement.classList.add('is-paused');return}
  announcement.classList.remove('is-paused');
  progress.classList.remove('is-running');void progress.offsetWidth;progress.classList.add('is-running');
  timer=setInterval(()=>{current=(current+1)%notices.length;paintNotice()},DURACION);
 }
 function paintPause(){pause.textContent=paused?'▷':'Ⅱ';pause.setAttribute('aria-label',paused?'Reanudar avisos automáticos':'Pausar avisos automáticos')}
 function manualNotice(step){current=(current+step+notices.length)%notices.length;paused=true;stopNotices();paintNotice();paintPause()}
 announcement.querySelector('.announcement-prev').addEventListener('click',()=>manualNotice(-1));
 announcement.querySelector('.announcement-next').addEventListener('click',()=>manualNotice(1));
 pause.addEventListener('click',()=>{paused=!paused;paintPause();startNotices()});
 announcement.querySelector('.announcement-close').addEventListener('click',()=>{announcement.hidden=true;stopNotices();document.querySelector('header .brand').focus()});
 announcement.addEventListener('mouseenter',stopNotices);announcement.addEventListener('mouseleave',()=>{if(!announcement.contains(document.activeElement))startNotices()});
 announcement.addEventListener('focusin',stopNotices);announcement.addEventListener('focusout',e=>{if(!announcement.contains(e.relatedTarget))startNotices()});
 document.addEventListener('visibilitychange',()=>document.hidden?stopNotices():startNotices());
 reduce.addEventListener('change',e=>{if(e.matches){paused=true;stopNotices();paintPause()}});
 paintPause();paintNotice();startNotices();
}
const scenes={interior:{image:'interior',alt:'Mosaicos, arco decorativo y sillas turquesa de La Mamounia'},tajines:{image:'tajines',alt:'Tajines en la vajilla de La Mamounia'},sala:{image:'sala',alt:'Lámparas y decoración del salón de La Mamounia'}};
document.querySelectorAll('[data-scene]').forEach(button=>button.addEventListener('click',()=>{const scene=scenes[button.dataset.scene];const img=document.querySelector('.hero-image');img.src=`assets/images/${scene.image}.jpg`;img.alt=scene.alt;img.classList.remove('scene-enter');requestAnimationFrame(()=>img.classList.add('scene-enter'));document.querySelectorAll('[data-scene]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)))}));
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
