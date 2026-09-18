'use strict';
/* ---------------------------------------------------------------------------
   CARTA DE LA MAMOUNIA FUENGIROLA
   Fuente: carta publicada en TheFork (última modificación 17/12/2025),
   consultada el 18/09/2026. Precios de referencia publicados por el
   establecimiento, no un feed en vivo del restaurante.

   La carta se lee de arriba abajo en el orden de una comida. Se organiza en
   CAPÍTULOS (entrantes, ensaladas, principales…) y, dentro, en SECCIONES.

   CÓMO EDITAR
   - Cada plato es: [nombre, precio, descripción, etiquetas]
   - precio: número en euros, o null si es «Consultar».
   - etiquetas: array opcional. Valores admitidos:
       'sin-carne'    → la descripción publicada no incluye carne ni pescado
       'especialidad' → el restaurante lo agrupa como especialidad de la casa
   - 'original' guarda el nombre comercial que usa el restaurante en TheFork.
     No se muestra en la web; sirve para poder cotejar con la carta publicada.
   - Para añadir una sección, copia un bloque {id, nombre, platos}.
   - Las fotos se asocian por nombre exacto del plato en PHOTOS (final del archivo).
--------------------------------------------------------------------------- */

const MENU_UPDATED = '17 de diciembre de 2025';
const MENU_CHECKED = '18 de septiembre de 2026';

const MENU = [
  {
    id: 'entrantes',
    nombre: 'Entrantes',
    subtitulo: 'Para compartir',
    entradilla: 'Así se empieza en Marruecos y en Líbano: varios platos pequeños al centro y todo el mundo picando.',
    secciones: [
      {
        id: 'mezze-dos',
        nombre: 'Mezze para dos',
        platos: [
          ['Fórmula mezze frío y caliente', 35, 'Un surtido generoso de mezzes fríos y calientes, perfecto para compartir y descubrir los sabores de Oriente Medio. Para dos personas.', ['especialidad']]
        ]
      },
      {
        id: 'mezze-frios',
        nombre: 'Mezzes fríos',
        original: 'Sabores frescos del Líbano',
        platos: [
          ['Humus', 8.9, 'Garbanzos, tahini y zumo de limón.', ['sin-carne']],
          ['Moutabal', 8.9, 'Berenjena, tahini y zumo de limón.', ['sin-carne']],
          ['Muhammara', 8.9, 'Pimientos rojos, nueces y melaza de granada.', ['sin-carne']],
          ['Tzatziki', 8.9, 'Yogur, pepino y menta.', ['sin-carne']],
          ['Labneh', 8.9, 'Yogur, aceite de oliva y menta.', ['sin-carne']],
          ['Dolma', 8.9, 'Hojas de parra, arroz y hierbas.', ['sin-carne']]
        ]
      },
      {
        id: 'mezze-calientes',
        nombre: 'Mezzes calientes',
        original: 'Calor y tradición en la mesa',
        platos: [
          ['Falafel', 8.9, 'Garbanzos, cilantro, perejil y tahini.', ['sin-carne']],
          ['Kibbeh', 8.9, 'Trigo bulgur, carne picada y cebolla.', []],
          ['Fatayer sabanekh', 8.9, 'Masa y espinacas.', ['sin-carne']],
          ['Sambousek', 8.9, 'Masa, carne o pollo y especias.', []],
          ['Borek jebneh', 8.9, 'Masa y queso.', ['sin-carne']],
          ['Batata harra', 8.9, 'Patatas, ajo, cilantro y especias.', ['sin-carne']]
        ]
      },
      {
        id: 'briouates',
        nombre: 'Briouates marroquíes',
        original: 'Entrantes calientes',
        platos: [
          ['Briouates vegetarianas', 9.9, '3 pastelitos marroquíes rellenos de fideos, zanahoria y calabacín.', ['sin-carne']],
          ['Briouats de pollo y almendras', 9.9, '3 briouates dulces y saladas con pollo desmenuzado, almendra crujiente y un toque de canela.', []],
          ['Briouats de kefta y verduras', 9.9, '3 hojaldres marroquíes rellenos de carne picada especiada (kefta) y verduras salteadas.', []]
        ]
      },
      {
        id: 'arayes',
        nombre: 'Arayes',
        descripcion: 'Pan de pita relleno y hecho a la parrilla.',
        platos: [
          ['Arayes lahma', 8.9, 'Relleno de carne picada especiada.', []],
          ['Arayes halloumi', 8.9, 'Relleno de queso halloumi.', ['sin-carne']]
        ]
      },
      {
        id: 'sopa',
        nombre: 'Sopa',
        original: 'Sopa de la medina',
        platos: [
          ['Harira', 6.5, 'Sopa tradicional marroquí con tomate, lentejas, garbanzos, cilantro y especias.', []]
        ]
      }
    ]
  },
  {
    id: 'ensaladas',
    nombre: 'Ensaladas',
    subtitulo: 'Marroquíes y libanesas',
    entradilla: 'Frescas, aliñadas con limón y aceite de oliva. También van al centro de la mesa.',
    secciones: [
      {
        id: 'ensaladas-marroquies',
        nombre: 'Ensaladas marroquíes',
        original: 'Las ensaladas de La Mamounia',
        platos: [
          ['Zaalouk', 8.9, 'Berenjena y tomate.', ['sin-carne']],
          ['Bekoula', 8.9, 'Ensalada de espinacas.', ['sin-carne']],
          ['Taktouka', 8.9, 'Pimientos asados y tomate.', ['sin-carne']],
          ['Ensalada de zanahorias', 8.9, '', ['sin-carne']],
          ['Ensalada de patatas', 8.9, '', ['sin-carne']],
          ['Ensalada de remolacha', 8.9, '', ['sin-carne']],
          ['Ensalada marroquí', 8.9, 'Tomate, pepino y cebolla.', ['sin-carne']],
          ['La Mamounia salad', 11.9, 'Una mezcla generosa de las mejores ensaladas tradicionales de la casa.', ['sin-carne', 'especialidad']]
        ]
      },
      {
        id: 'ensaladas-libanesas',
        nombre: 'Ensaladas libanesas',
        original: 'Frescura del Líbano',
        platos: [
          ['Tabbouleh', 11.9, 'Tabulé fresco con perejil, tomate, cebolla y bulgur, aliñado con limón y aceite de oliva.', ['sin-carne']],
          ['Fattoush', 11.9, 'Hojas verdes, rábano, pepino, perejil, menta y tomate, con aliño de melaza de granada y aceite de oliva.', ['sin-carne']],
          ['Hummus falafel', 11.9, 'Hummus clásico acompañado de 3 piezas de falafel crujiente.', ['sin-carne']]
        ]
      }
    ]
  },
  {
    id: 'principales',
    nombre: 'Principales',
    subtitulo: 'Tajines, cuscús y guisos',
    entradilla: 'La cocina lenta de Marruecos y los clásicos libaneses. Cada uno con su plato.',
    secciones: [
      {
        id: 'especialidades',
        nombre: 'Especialidades de la casa',
        original: 'La excelencia de los sabores de La Mamounia',
        descripcion: 'Los grandes platos, agrupados así por el propio restaurante.',
        platos: [
          ['Tanjia de ternera', 18.9, 'Especialidad de Marrakech: ternera cocida lentamente con especias.', ['especialidad']],
          ['Rfissa', 17.9, 'Plato festivo marroquí con pollo, lentejas y msemen.', ['especialidad']],
          ['Kabsa de cordero (jarrete)', 19.9, 'Arroz especiado saudí acompañado de jarrete de cordero.', ['especialidad']],
          ['Kabsa de pollo', 16.9, 'Arroz especiado saudí acompañado de pollo.', ['especialidad']],
          ['Tajín de cordero (jarrete)', 19.9, 'Tajín marroquí tradicional con jarrete de cordero.', ['especialidad']],
          ['Tajín de dorada', 22.9, 'Tajín marroquí con dorada fresca.', ['especialidad']]
        ]
      },
      {
        id: 'tajines',
        nombre: 'Tajines',
        original: 'Tesoros del tajine',
        descripcion: 'Guisados despacio en cazuela de barro.',
        platos: [
          ['Kefta tajine', 13.9, 'Albóndigas de carne especiada cocinadas en salsa de tomate.', []],
          ['Tajine de kefta de sardina', 13.9, 'Kefta de sardinas frescas con una sabrosa salsa de tomate.', []],
          ['Tajine de pollo con aceitunas y limón en conserva', 14.9, 'Una receta clásica marroquí con sabores intensos y equilibrados.', []],
          ['Tajine de ternera con ciruelas y albaricoques caramelizados', 16.9, 'El emblemático tajine dulce y salado, tierno y reconfortante.', ['especialidad']]
        ]
      },
      {
        id: 'cuscus',
        nombre: 'Cuscús',
        original: 'Cuscús tradición',
        platos: [
          ['Cuscús vegetariano', 13.9, 'Con verduras de temporada y tfaya.', ['sin-carne']],
          ['Cuscús tfaya', 14.9, 'Con pollo, cebolla confitada y pasas caramelizadas.', []],
          ['Cuscús de pollo', 14.9, 'Con verduras y tfaya.', []],
          ['Cuscús de ternera', 15.9, 'Con verduras y tfaya.', []]
        ]
      },
      {
        id: 'pastillas',
        nombre: 'Pastillas',
        descripcion: 'Hojaldre marroquí, entre dulce y salado.',
        platos: [
          ['Pastilla fes', 12.9, 'Rellena de pollo especiado y almendra crujiente.', ['especialidad']],
          ['Pastilla souira', 13.9, 'Versión marina con pescado y marisco, delicadamente sazonada.', ['especialidad']]
        ]
      },
      {
        id: 'shawarma',
        nombre: 'Shawarma',
        descripcion: 'Cortado del asador, al estilo libanés.',
        platos: [
          ['Shawarma de pollo', 9.9, 'Pollo marinado con especias libanesas, asado a la perfección.', []],
          ['Shawarma de ternera', 9.9, 'Ternera tierna marinada con especias, asada al estilo libanés.', []],
          ['Shawarma de falafel', 9.9, 'Falafels crujientes servidos con salsa tahini.', ['sin-carne']]
        ]
      }
    ]
  },
  {
    id: 'parrilla',
    nombre: 'A la parrilla',
    subtitulo: 'Brasa, a la oriental y a la marroquí',
    entradilla: 'Brochetas marinadas, chuletas de cordero y la parrillada de la casa.',
    secciones: [
      {
        id: 'brasa',
        nombre: 'Brochetas y parrilla',
        original: 'A la parrilla y glorioso',
        platos: [
          ['2 Brochetas de pollo marinado', 13.9, '', []],
          ['2 Brochetas de kefta', 14.9, '', []],
          ['2 Brochetas de ternera tierna', 15.9, '', []],
          ['3 Brochetas mixtas', 17.9, '', []],
          ['4 Chuletas de cordero a la parrilla', 19.9, '', []],
          ['La Mamounia mixtas', 24.9, 'Pollo marinado, kefta, ternera tierna, chuletas de cordero a la parrilla y merguez.', ['especialidad']]
        ]
      },
      {
        id: 'acompanamientos',
        nombre: 'Acompañamientos',
        platos: [
          ['Patatas fritas', 3.9, '', ['sin-carne']],
          ['Arroz', 3.9, '', ['sin-carne']],
          ['Pan marroquí', 1.5, '', ['sin-carne']],
          ['Pan pita', 1.5, '', ['sin-carne']],
          ['Ensalada verde', 3.5, '', ['sin-carne']]
        ]
      }
    ]
  },
  {
    id: 'postres',
    nombre: 'Postres',
    subtitulo: 'La dulzura de La Mamounia',
    entradilla: 'Sémola, azahar, almendra y amlou. El final que alarga la sobremesa.',
    secciones: [
      {
        id: 'dulces',
        nombre: 'Postres',
        original: 'Dulzura de La Mamounia',
        platos: [
          ['Bassboussa', 7.9, 'Pastel de sémola esponjoso con jarabe ligero.', ['sin-carne']],
          ['Pasteles marroquíes', 7.9, 'Surtido de dulces tradicionales marroquíes.', ['sin-carne']],
          ['Kunaffa', 8.9, 'Pastel crujiente de Oriente Medio, relleno de queso fundido y bañado en jarabe de azahar.', ['sin-carne']],
          ['Amlou cheesecake', 8.9, 'Tarta de queso cremosa con amlou (pasta de almendra, argán y miel).', ['sin-carne']],
          ['Tostada francesa con amlou y helado de vainilla', 11.9, '', ['sin-carne']]
        ]
      }
    ]
  },
  {
    id: 'bebidas',
    nombre: 'Bebidas',
    subtitulo: 'Del té moruno a la bodega',
    entradilla: 'El té marroquí es parte del rito, no un añadido al final.',
    secciones: [
      {
        id: 'te-cafe',
        nombre: 'Té, café e infusiones',
        original: 'Calientes',
        platos: [
          ['Té marroquí', 2.5, '', ['sin-carne']],
          ['Té clásico', 2, '', ['sin-carne']],
          ['Té verde', 2, '', ['sin-carne']],
          ['Té rojo', 2, '', ['sin-carne']],
          ['Café solo', 1.5, '', ['sin-carne']],
          ['Café espresso', 1.5, '', ['sin-carne']],
          ['Cortado', 1.5, '', ['sin-carne']],
          ['Café con leche', 1.8, '', ['sin-carne']],
          ['Americano', 2, '', ['sin-carne']],
          ['Capuchino', 2, '', ['sin-carne']],
          ['Cacao', 2, '', ['sin-carne']]
        ]
      },
      {
        id: 'refrescos',
        nombre: 'Refrescos',
        platos: [
          ['Coca-Cola', 2, '', ['sin-carne']],
          ['Coca-Cola Zero', 2, '', ['sin-carne']],
          ['Fanta naranja', 2, '', ['sin-carne']],
          ['Fanta limón', 2, '', ['sin-carne']],
          ['Sprite', 2, '', ['sin-carne']],
          ['Tónica', 2, '', ['sin-carne']],
          ['Red Bull', 2, '', ['sin-carne']],
          ['Aquarius', 2, '', ['sin-carne']],
          ['Nestea', 2, '', ['sin-carne']],
          ['Agua mineral', 2, '', ['sin-carne']],
          ['Agua con gas', 2, '', ['sin-carne']]
        ]
      },
      {
        id: 'zumos',
        nombre: 'Zumos',
        platos: [
          ['Zumo de piña', 2.5, '', ['sin-carne']],
          ['Zumo de melocotón', 2.5, '', ['sin-carne']],
          ['Zumo de naranja', 2.5, '', ['sin-carne']],
          ['Zumo de naranja natural', 3.5, '', ['sin-carne']]
        ]
      },
      {
        id: 'cerveza',
        nombre: 'Cervezas',
        platos: [
          ['Caña', 2.5, 'De barril.', []],
          ['Pinta', 3.5, 'De barril.', []],
          ['Jarra', 4, 'De barril.', []],
          ['Tinto de verano', 3, '', []],
          ['Estrella Galicia', 3, '', []],
          ['Heineken', 3, '', []],
          ['Corona', 3.5, '', []],
          ['Cruzcampo', 3, '', []],
          ['Victoria 0,0 %', 3, 'Sin alcohol.', []],
          ['San Miguel tostada 0,0 %', 3, 'Sin alcohol.', []]
        ]
      },
      {
        id: 'vinos',
        nombre: 'Vinos',
        descripcion: 'Precios por botella.',
        platos: [
          ['Fuente Espina', 14, 'Tinto.', []],
          ['Rioja Campo Viejo', 15, 'Tinto.', []],
          ['Pata Negra', 14, 'Tinto.', []],
          ['El Coto', 22, 'Tinto.', []],
          ['Marqués de Cáceres verdejo', 14, 'Blanco.', []],
          ['Poema verdejo (D.O. Rueda)', 12, 'Blanco.', []],
          ['Blanc Pescador', 14, 'Blanco.', []],
          ['Frizzante', 12, 'Blanco.', []],
          ['Barbadillo', 12, 'Rosado.', []],
          ['Acantus', 12, 'Rosado.', []],
          ['Valdemar', 14, 'Rosado.', []],
          ['Chivite Finca', 22, 'Rosado.', []],
          ['La Guita', 3, 'Manzanilla, por copa.', []],
          ['Muy Fina', 3, 'Manzanilla, por copa.', []],
          ['Jaume Serra cava', 4, 'Cava, por copa.', []]
        ]
      },
      {
        id: 'destilados',
        nombre: 'Destilados y licores',
        platos: [
          ['Absolut', 4, 'Vodka.', []],
          ['Smirnoff', 4, 'Vodka.', []],
          ['Grey Goose', 6, 'Vodka.', []],
          ['Belvedere', 6, 'Vodka.', []],
          ['Bombay Sapphire', 5, 'Gin.', []],
          ["Seagram's", 5, 'Gin.', []],
          ['Beefeater', 4, 'Gin.', []],
          ['Red Label', 6, 'Whisky.', []],
          ["Jack Daniel's", 7, 'Whisky.', []],
          ['J&B', 6, 'Whisky.', []],
          ["Ballantine's", 6, 'Whisky.', []],
          ['Cutty Sark', 6, 'Whisky.', []],
          ['DYC 8', 4, 'Whisky.', []],
          ['Bacardi', 4, 'Ron.', []],
          ['Ron Barceló añejo', 7, 'Ron.', []],
          ['Brugal añejo', 5, 'Ron.', []],
          ['Licor 43', 4, '', []],
          ['Jägermeister', 4, '', []],
          ['Frangelico', 4, '', []],
          ['Baileys', 3.5, '', []],
          ['Limoncello', 3, '', []],
          ['Tía María', 3, '', []],
          ['Martini Rosso', 4, '', []],
          ['Brandy Terry', 4, '', []],
          ['Zoco pacharán', 4, '', []],
          ['Anís del Mono', 3.5, '', []]
        ]
      }
    ]
  }
];

/* Fotografías de platos descargadas de la ficha del restaurante en Glovo.
   Correspondencia verificada plato a plato; ver assets/images/platos/manifest.json.
   'shared' marca una imagen que Glovo reutiliza en varios productos.
   Se muestran agrupadas al inicio de su capítulo, no dentro de la lista. */
const PHOTOS = {
  'Harira': { file: 'assets/images/platos/harira.webp', shared: false },
  'Humus': { file: 'assets/images/platos/hummus.webp', shared: false },
  'Briouates vegetarianas': { file: 'assets/images/platos/briouates-vegetarianas.webp', shared: false },
  'Tajine de pollo con aceitunas y limón en conserva': { file: 'assets/images/platos/tajin-pollo.webp', shared: false },
  'Tajín de cordero (jarrete)': { file: 'assets/images/platos/tajin-cordero.webp', shared: false },
  'Tajín de dorada': { file: 'assets/images/platos/tajin-dorada.webp', shared: false },
  'Hummus falafel': { file: 'assets/images/platos/hummus-falafel.webp', shared: false },
  'Kibbeh': { file: 'assets/images/platos/kibbeh.webp', shared: false },
  'Zaalouk': { file: 'assets/images/platos/zaalouk.webp', shared: false },
  'Taktouka': { file: 'assets/images/platos/taktouka.webp', shared: false },
  'La Mamounia mixtas': { file: 'assets/images/platos/parrilla.webp', shared: true },
  'Pastilla fes': { file: 'assets/images/platos/pastilla-fes.webp', shared: false },
  'Tabbouleh': { file: 'assets/images/platos/tabule.webp', shared: false }
};
