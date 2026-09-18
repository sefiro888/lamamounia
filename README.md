# La Mamounia Fuengirola — demostración web

> **Esto es una propuesta de diseño, no la web oficial del restaurante.**
> No está gestionada por La Mamounia Fuengirola ni autorizada por el establecimiento.
> Para reservar de verdad hay que llamar al restaurante.
> Los datos, precios y fotografías proceden de fichas
> públicas (TheFork, Glovo, Google) y **los permisos de uso de las fotografías están
> pendientes de confirmar con el restaurante**.

Web estática en español. HTML, CSS y JavaScript vanilla, sin dependencias, backend, claves API ni compilación. Creada exclusivamente en esta carpeta.

## Abrir

Desde esta carpeta:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Abrir http://127.0.0.1:8080. También funciona abriendo index.html directamente. El servidor local creado durante la entrega está en el puerto 8080.

## Concepto

«Dos culturas. Una mesa. Y el mar». Composición editorial con granate, marfil, dorado, fotografía del establecimiento, arcos marroquíes, ornamento geométrico y tipografía serif y recorridos Marruecos/Líbano/Mediterráneo. La paleta toma el granate y oro del logo, el marfil de las paredes y el tono turquesa/petróleo de las sillas y mosaicos. Las fuentes se sirven desde el propio sitio: no hay peticiones a terceros.

## Archivos

- index.html: portada, capítulos de la carta, especialidad destacada, atardecer y opiniones.
- carta.html: carta completa (142 propuestas) en seis capítulos, con índice, buscador y filtros. Ver «Tercera revisión».
- experiencia.html: cocina, interior, terraza y ubicación.
- galeria.html: 8 fotos, filtros y ampliación modal con cierre por Escape.
- contacto.html: reserva por teléfono y WhatsApp, horarios y ubicación. Sin formulario.
- css/styles.css: estructura, diseño responsive, focos y movimiento reducido.
- css/theme.css: sistema visual (tipografía, ornamento, texturas). Ver «Cuarta revisión».
- js/script.js: menú móvil, galería, avisos, estado de apertura y arcos SVG.
- js/menu-data.js: la carta entera, editable sin compilación.
- js/menu.js: render, buscador, filtros y scroll-spy de la carta.
- assets/images/: fotografías locales y SOURCES.md con procedencia.
- assets/fonts/: Cormorant Garamond y Jost en woff2, servidas desde el sitio. Sin dependencias remotas.
- assets/icons/: carpeta preparada.
- logo.jpg: único archivo original encontrado, conservado sin modificar. No había logo.png.
- backups/logo-original.jpg: respaldo del logo original; backups/initial-demo/ conserva CSS previo a ajustes de QA.
- build-site.py y download-assets.py: auxiliares usados para construir la demo. No son necesarios para servirla. Editar directamente los HTML; ejecutar build-site.py regeneraría las páginas.
- check-site.py: comprobación de rutas locales, anclas y estructura H1.

No había código anterior que modificar. Todos los archivos de aplicación son nuevos. Solo styles.css recibió ajustes posteriores a su creación; sus versiones anteriores están respaldadas.

## Información y fuentes

Consulta realizada el 18/09/2026. La información cambia y no se sincroniza automáticamente.

- https://www.opentable.es/r/la-mamounia-fuengirola — nombre, teléfono 620 26 20 19, dirección Paseo Marítimo Rey de España 5, Fuengirola 29640; enlace de Instagram, cocina marroquí y Oriente Medio, servicio en sala y para llevar. Se ofrece el enlace para consultar disponibilidad, sin garantizar reservas efectivas.
- https://www.thefork.es/restaurante/la-mamounia-fuengirola-r844690 — cocina libanesa, terraza, opciones halal y veganas, 9,6/10 con 90 opiniones; servicio de cenas con espectáculo. TheFork indica que NO admite reservas actualmente, por lo que no se utiliza como canal de reserva.
- https://www.thefork.es/restaurante/la-mamounia-fuengirola-r844690/menu — nombres, descripciones abreviadas y precios de la selección. Última modificación publicada: 17/12/2025. Todos los precios son orientativos y fechados; verificar antes de visita. El té no lleva precio.
- https://es.restaurantguru.com/La-Mamounia-Fuengirola-Fuengirola y https://www.veguru.es/vegano-en-fuengirola/la-mamounia-fuengirola — corroboran teléfono/dirección, terraza y té marroquí. Los horarios no coinciden con otras fuentes; se dejan sin afirmar.
- Instagram y el perfil Google se pudieron consultar directamente en el navegador durante la segunda revisión. Ver INVESTIGACION.md para los nuevos datos y publicaciones.

## Pendientes claramente delimitados

- Horario mostrado con fuente Google (14:00–01:00 excepto martes cerrado). Instagram mantiene un horario distinto: confirmar por teléfono antes de acudir.
- TODO: confirmar que atienden WhatsApp en el número público. El enlace wa.me está bien formado, pero no demuestra que el canal esté atendido.
- Música en directo confirmada en Google y vídeo de música/baile en Instagram. Encargos para celebraciones confirmados en Instagram. TODO: próximas fechas de actuaciones y condiciones de los encargos; no se inventan paquetes ni agenda.
- TODO: confirmar clasificación vegana por plato y alérgenos. Solo se etiquetan vegetarianos los platos denominados así en la carta publicada. No se afirma una certificación halal independiente.
- TODO: validar licencia/autoría de las fotografías con el restaurante antes de publicación comercial. Proceden de su ficha pública de TheFork; no se afirma autoría oficial. No se usaron Unsplash, Pexels, imágenes generadas ni fotografías de otros restaurantes. Si no se obtiene autorización, sustituir estas ocho fotos por material autorizado.
- TODO: completar galería con fotos autorizadas de terraza, té, especias y ambiente nocturno. No se han usado sustitutos inventados.
- Nota Google verificada directamente: 4,8/5 y 622 reseñas, consultada el 18/09/2026. El precio por persona de 20–30 € en Google es aportado por clientes; no se presenta como tarifa fija.
- No se inventa email. No se incluye analítica ni cookies. La web no recoge ningún dato del visitante.
- Formulario local: no transmite ni guarda datos; el éxito es una simulación explícita. Para reservas reales se necesita backend, política de privacidad y confirmación de disponibilidad.

## Validación

- Navegación por las cinco páginas en navegador real.
- Anchuras 320, 390, 768, 1366 y 1920 px; un desbordamiento detectado a 320 px fue corregido y verificado de nuevo.
- Logo cargado con sus dimensiones originales y sin deformación; sin imágenes rotas detectadas.
- Menú móvil probado abriendo y navegando a otra página.
- Filtros de carta: tajines (3), selección vegetariana (2) y estado vacío comprobados.
- Galería: filtro de interior (3), apertura de modal y cierre con Escape.
- Formulario: errores de campos vacíos y éxito simulado con datos de prueba; sin envío.
- Consola sin errores ni advertencias durante las pruebas.
- Enlaces locales y anclas comprobados por check-site.py; teléfono, WhatsApp, Instagram y Maps revisados por sus destinos. No se realizaron llamadas ni se enviaron mensajes.
- Reglas prefers-reduced-motion verificadas en la hoja cargada: desactivan animaciones, transiciones y scroll suave. La herramienta de navegador no ofrece emulación de esa preferencia; no se alteró el ajuste del sistema.
- node --check aprobado para ambos archivos JavaScript.

## GitHub Pages

Técnicamente preparada para alojamiento estático y subdirectorios: rutas relativas, archivos locales y .nojekyll; no necesita build. No se ha publicado ni creado repositorio remoto.

Publicar los cinco HTML, css/, js/, assets/, logo.jpg y .nojekyll en la raíz del repositorio; activar Settings > Pages > Deploy from a branch, seleccionando la rama y /(root). Excluir backups y auxiliares. Resolver antes los permisos de fotografía y revisar los datos pendientes si va a presentarse como web oficial.

## Segunda revisión — web más viva

Banner en todas las páginas con tres avisos, controles anterior/siguiente, pausa y cierre. Rotación cada 8,5 s, pausada con foco, ratón, pestaña oculta o preferencia de movimiento reducido. Los avisos se editan en `notices` de js/script.js. No es un servicio conectado en tiempo real.

Portada con granate más profundo, fotografía en arco, tres escenas seleccionables, distintivo Google y sección de publicaciones verificadas. Selector de planes con teclado (flechas, Home, End), transiciones discretas al entrar en pantalla. Fotografías existentes; los enlaces abren los reels oficiales sin instalar widgets de Instagram.

Copia previa completa en backups/refresh-20260918-130229/. Los HTML son la fuente actual: NO ejecutar build-site.py, que representa la versión inicial. refresh-site.py es un auxiliar de una sola ejecución; no volver a ejecutarlo.

QA de segunda revisión: las cinco páginas revisadas a 320, 390, 768, 1366 y 1920 px, sin desbordamiento ni imágenes rotas; avisos, selector de escenas y planes probados; consola sin errores. Rutas comprobadas con check-site.py.

## Fotografías de platos de Glovo

Añadidas 13 fotos locales con correspondencia verificada al producto en js/menu.js. Una imagen de parrilla es compartida por Glovo y se indica expresamente. Las otras 8 propuestas de la selección se mantienen sin foto individual, sin inventar correspondencias. La ficha de cada foto y URL original está en assets/images/platos/manifest.json. Los precios siguen siendo la referencia TheFork, no los precios de reparto de Glovo. Respaldo previo en backups/glovo-*/.
## Tercera revisión — carta completa y reorientación (18/09/2026)

### La carta

La selección de 21 platos se sustituye por la **carta completa: 142 propuestas** (65 de cocina y 77 de bebidas), con los nombres, descripciones y precios publicados por el restaurante en TheFork.

Los datos están en `js/menu-data.js`, separado del motor de render (`js/menu.js`) para poder editarlos sin tocar lógica. La cabecera del archivo explica el formato.

**La carta se lee como la de papel**: una sola página, de arriba abajo, en el orden de una comida. Sin pestañas y sin nada oculto.

- **Entrantes** (19) · **Ensaladas** (11) · **Principales** (19) · **A la parrilla** (11) · **Postres** (5) · **Bebidas** (77)

Un primer intento organizó la carta en «recorridos» (Cocina/Bebidas y luego Marruecos/Líbano/parrilla…). Se descartó porque superponía una clasificación inventada sobre la del restaurante: hacían falta 12 controles y 1.268 px de scroll antes de ver un solo plato, y ninguno de los dos sistemas decía qué se iba a comer. La versión descartada queda en `backups/carta-papel-20260918/`.

Los nombres comerciales de TheFork se traducen a lenguaje llano: «Calor y tradición en la mesa» → Mezzes calientes; «Tesoros del tajine» → Tajines; «La excelencia de los sabores» → Especialidades de la casa. El nombre original se conserva en el campo `original` de cada sección, sin mostrarse, para poder cotejar con la carta publicada. Esto resuelve además que «Frescura del Líbano» aparecía dos veces con contenidos distintos.

Añadido respecto a la versión anterior de la web: tanjia, rfissa, kabsa, shawarma, arayes, pastilla souira, las ocho ensaladas marroquíes, los seis mezzes libaneses, los cuatro cuscús, la parrilla completa, acompañamientos y toda la carta de bebidas.

Funciones: índice pegajoso de 51 px que salta al capítulo y marca en cuál estás; buscador insensible a acentos que filtra sin cambiar de página, ocultando los capítulos que se quedan vacíos; filtros ✿ sin carne y ★ especialidades; precio anunciado una sola vez cuando todo un grupo lo comparte, con puntos guía hasta el precio en el resto. Los enlaces antiguos (`?categoria=mezze`, `?recorrido=libano`) siguen funcionando y redirigen al capítulo equivalente.

Las **etiquetas por plato se sustituyen por dos marcas discretas** (✿ y ★) con leyenda al inicio: dos chips de texto por línea hacían la lista ilegible.

Las **13 fotos de plato se agrupan en una tira al inicio de su capítulo** en lugar de ir dentro de la lista. Sólo 13 de 65 platos tienen foto y intercalarlas dejaba filas de alturas irregulares.

### Orientación general

- **Barra de utilidad** en las cinco páginas: estado de apertura calculado en JS, precio medio, teléfono, cómo llegar y pedido a domicilio. El horario está en la constante `HOURS` al final de `js/script.js`.
- **Navegación unificada** a cinco entradas con nombres literales: Inicio · Carta · El restaurante · Galería · Contacto.
- **Portada**: bloque «¿Por dónde empezamos?» con los seis capítulos de la carta, número de platos y precio desde, enlazando a su ancla. Los números se comprobaron contra `menu-data.js`, no se escribieron a mano. Se retiró el selector de planes, que duplicaba esa función.
- **Glovo** aparece ahora en la barra de utilidad, el pie y los cierres de página. **WhatsApp** entra en la barra de acciones móvil.
- **SEO**: `og:image` en portada y carta; schema.org de portada con `aggregateRating` (4,8 / 622 reseñas de Google), `openingHoursSpecification`, `priceRange` y `hasMenu`.

### Dos correcciones de fondo

El CSS del menú principal usaba el selector genérico `nav`, que empezó a afectar al índice de la carta (lo apilaba en vertical, 321 px de alto). Se acotó a `#navigation`. Conviene mantener esa disciplina: el sitio tiene ahora dos elementos `nav`.

El salto a un capítulo por `#ancla` no funcionaba: la carta se genera con JS y cuando el navegador procesa el fragmento el capítulo aún no existe. `js/menu.js` lo resuelve al final, y repite el salto tras `load` porque las fotos que cargan después desplazan el destino.

### Etiquetas de dieta

La marca ✿ se deduce de los ingredientes que aparecen en la descripción publicada por el restaurante. **No es una clasificación vegana ni vegetariana certificada** y así se advierte en la propia página. El restaurante se declara halal y con opciones veganas en TheFork; eso se cita como declaración suya, no como certificación verificada.

### Pendientes de esta revisión

- **Derechos de las fotografías**: sigue sin resolverse y es bloqueante para publicar. Las fotos de plato son miniaturas de 320 px de Glovo; pedir al restaurante los originales mejoraría la carta y resolvería la licencia.
- **Fotos de plato**: sólo 13 de los 65 platos de cocina tienen imagen. TheFork publica 46 fotos de comida y Glovo otras tantas, pero sin nombre de plato asociado; no se asignan correspondencias inventadas.
- **Rendimiento**: las ocho fotos de ambiente siguen en JPG sin optimizar (unos 2 MB en total). Convertirlas a WebP con tamaños responsive está pendiente.
- **Versión en inglés**: no existe. Con el público extranjero de Fuengirola es probablemente la mejora con más retorno que queda por hacer.
- **Horario**: el indicador de abierto/cerrado usa el de Google (14:00–01:00, martes cerrado) y lo cita como tal, porque Instagram publica otro distinto. Confirmar con el restaurante y actualizar `HOURS`.
- Confirmar que el número atiende WhatsApp: es uno de los dos canales de reserva de la web.

### Validación de esta revisión

- Cinco páginas cargadas en navegador real, consola sin errores ni advertencias.
- Sin desbordamiento horizontal a 320, 375, 390 y 768 px, comprobado midiendo `scrollWidth` contra `clientWidth`.
- Carta: los seis capítulos, el índice con scroll-spy, el salto por ancla desde la portada, el buscador con y sin acentos, el estado sin resultados, los filtros ✿ y ★, y el precio agrupado.
- Compatibilidad con las URLs antiguas verificada.
- Conteos y precios mínimos de la portada calculados desde `menu-data.js`, no escritos a mano.
- `check-site.py` sin errores; se le enseñó a validar las anclas de capítulo que genera el JavaScript.
- `node --check` aprobado en los tres archivos JavaScript.
- Copias previas en `backups/carta-completa-20260918/` y `backups/carta-papel-20260918/`.

### Aviso sobre los auxiliares

`build-site.py`, `refresh-site.py`, `integrate-glovo.py` y `document-refresh.py` corresponden a versiones anteriores y **regenerarían páginas obsoletas**. No ejecutarlos. Los HTML y `js/menu-data.js` son la fuente actual.

## Cuarta revisión — sistema visual (18/09/2026)

Hasta aquí la web usaba **tipografía del sistema sobre fondo plano, sin textura, sin profundidad y sin un solo elemento gráfico marroquí**: toda la identidad recaía en las fotografías. Esta revisión construye un sistema visual propio en `css/theme.css`, que se carga después de `styles.css` y reescribe su apariencia sin tocarla. Para volver atrás basta con quitar ese `<link>`.

### Tipografía propia, servida desde el sitio

- **Cormorant Garamond** para titulares, nombres de plato y precios. Serif de alto contraste.
- **Jost** para interfaz, texto y etiquetas. Geométrica cálida.

Ambas con licencia SIL Open Font License 1.1, descargadas con `download-fonts.py` a `assets/fonts/` (97 KB en total, subconjunto latino, formato woff2). **No se cargan desde Google Fonts ni ningún CDN**: no hay peticiones a terceros ni cookies, se mantiene la decisión original de no depender de servicios externos. `assets/fonts/manifest.json` guarda el origen y la licencia de cada archivo.

### Ornamento geométrico marroquí

Estrella de ocho puntas (*khatam*) construida como SVG embebido en el CSS, sin archivos ni peticiones:

- **Cenefa** bajo el título de la carta, en cada cabecera de capítulo y antes de los cierres de página.
- **Mosaico tenue** de fondo en el pie y en el bloque de reserva.
- **Textura de papel** en todo el sitio (ruido SVG al 5 %), que quita la planitud del fondo liso.

### Arcos

`js/script.js` define dos recortes SVG (`arch-round` de herradura y `arch-pointed` apuntado) en coordenadas normalizadas, y se aplican a las fotos de plato y a las tarjetas de la portada.

**Un `clip-path` normalizado se deforma con la proporción del contenedor**: en una foto vertical el arco apuntado degeneraba en una punta de carpa. Por eso el recorte SVG se reserva para piezas de proporción cuadrada, y las fotos verticales (portada, destacado, galería, atardecer) usan una cúpula con `border-radius` elíptico, que mantiene su forma a cualquier tamaño. Si el JavaScript no se ejecuta, esas imágenes se ven rectangulares y no se rompe nada.

### Otros cambios visibles

- Capítulos de la carta **numerados en romanos** con contadores CSS. Al filtrar, los capítulos ocultos no cuentan y la numeración se recompone sola.
- Fichas numeradas en «El restaurante», tarjetas con relieve en la portada, pie oscuro con mosaico, cabecera con degradado y subrayado dorado.
- `logo.jpg` trae su propio fondo blanco y se recortaba como una tarjeta sobre el crema: ahora se funde con `mix-blend-mode` (multiply en claro, screen en el pie).
- Sombras en tres niveles, paleta ampliada con verde petróleo y más matices de dorado, y foco visible dorado y coherente.

### Imágenes en WebP

`optimize-images.py` genera versiones WebP a 640 y 1024 px y reescribe los `<img>` con `srcset` y `sizes`. **De 1.861 KB a 761 KB**, un 59 % menos, sin pérdida visible. Los JPG originales se conservan; `assets/images/webp-manifest.json` registra lo generado.

**Límite de calidad, importante**: las fotos de origen son pequeñas — 1024 px de ancho las dos mayores y 640 px el resto, porque proceden de fichas públicas, no de los originales. En pantallas grandes se ven blandas y no hay forma de arreglarlo desde aquí. Pedir los originales al restaurante resolvería a la vez la nitidez y los permisos.

### Validación

- Cinco páginas en navegador real, **consola sin errores ni advertencias** (verificado en pestaña limpia).
- Sin desbordamiento horizontal a 375 y 768 px ni en escritorio.
- Ninguna imagen rota tras el cambio a WebP; se comprobó `naturalWidth` de todas.
- Tipografía aplicada y cargada desde `assets/fonts/`.
- `check-site.py` sin errores; `node --check` aprobado.
- Copia previa de HTML, CSS y JS en `backups/carta-papel-20260918/`.

### Auxiliares nuevos

- `download-fonts.py`: descarga las fuentes a `assets/fonts/`. Sólo hace falta ejecutarlo si se cambian las familias.
- `optimize-images.py`: regenera los WebP y deja los HTML como están si ya tienen `srcset`. Ejecutarlo después de añadir fotos nuevas.

Siguen sin ejecutarse `build-site.py`, `refresh-site.py`, `integrate-glovo.py` y `document-refresh.py`: regenerarían páginas obsoletas.

## Quinta revisión — reserva sin formulario (18/09/2026)

El formulario de reserva se retira por completo. Era una simulación: validaba los campos y mostraba un mensaje de éxito, pero no enviaba nada a ninguna parte, así que prometía algo que no hacía.

**La reserva es ahora por teléfono o WhatsApp**, con dos tarjetas grandes en `contacto.html#reservar`. El enlace de WhatsApp abre la conversación con el mensaje ya escrito y los huecos a rellenar:

```
Hola, me gustaría reservar una mesa en La Mamounia.

Personas:
Día:
Hora:
Nombre:
```

Ese mismo enlace es el que usa el botón de WhatsApp de la barra móvil en las cinco páginas.

Consecuencias:

- **La web ya no tiene ningún campo de entrada**: ni un `<form>`, ni un `<input>`. No recoge, no envía y no guarda nada de quien la visita, así que no hacen falta política de privacidad, consentimiento ni backend.
- Se retira el código del formulario de `js/script.js`.
- Se retira OpenTable como canal de reserva: sobraba teniendo teléfono y WhatsApp, y daba una vía contradictoria.
- `schema.org` declara `acceptsReservations`.
- Se reorganiza la página con los horarios, los encargos para grupos y el enlace a Glovo.

Corregido de paso: `css/theme.css` pisaba la regla de una sola columna de la hoja base y la página de contacto se desbordaba a 375 px.

**Pendiente**: confirmar que el número atiende WhatsApp. Es uno de los dos únicos canales de reserva, y la página lo advierte mientras no esté confirmado.

## Sexta revisión — banner de avisos con movimiento (18/09/2026)

El banner dorado cambiaba de aviso de golpe, sin transición, sobre un dorado plano. Ahora tiene tres capas de movimiento, y vuelve a estar en las cinco páginas (faltaba en la carta desde que se rehizo).

1. **Fondo**: degradado dorado en cinco paradas, un mosaico de estrellas que se desplaza en un ciclo de 60 s y un brillo que recorre la banda cada 7 s.
2. **Cada aviso entra animado**: sube y aparece, y su icono entra un pelín después con un rebote corto. Cada aviso tiene su propio icono dibujado en SVG — tajine, nota musical y carta —, definidos en `ICONS` dentro de `js/script.js`.
3. **Barra de tiempo** en el borde inferior que se rellena en los 7 s que dura cada aviso, así se ve cuándo va a cambiar.

El tercer aviso pasa a anunciar la carta completa («142 platos de Marruecos y Líbano») en vez de enlazar a TheFork.

**Control y accesibilidad**: al pausar, pasar el ratón por encima, mover el foco dentro del banner o dejar la pestaña en segundo plano, se añade la clase `is-paused` y **las animaciones se congelan donde estén** con `animation-play-state`, en lugar de reiniciarse. Con `prefers-reduced-motion` no hay movimiento de ninguna clase: ni mosaico, ni brillo, ni barra de tiempo; el banner se ve igual, pero quieto.

En móvil el banner usa una rejilla explícita de dos filas — `[icono] [título] [flecha]` sobre `[texto]` — porque con flex el título y el texto competían por la misma línea y la flecha caía suelta en una tercera.

Los avisos se siguen editando en el array `notices` de `js/script.js`. La duración está en la constante `DURACION` y debe coincidir con los 7 s de las animaciones `banner-shine` y `banner-progreso` de `css/theme.css`.
