# Genera versiones WebP responsive de las fotos de ambiente y reescribe los
# <img> de las páginas para servirlas. Los JPG originales se conservan.
# Requiere Pillow. Reejecutable: regenera y deja los HTML igual.
from PIL import Image
from pathlib import Path
import re, json

ORIGEN = Path('assets/images')
ANCHOS = [640, 1024, 1600]
CALIDAD = 82

# Ancho que ocupa cada foto en pantalla, para que el navegador elija bien.
SIZES = {
    'interior': '(max-width:560px) 100vw, 54vw',
    'sala': '(max-width:560px) 100vw, 33vw',
    'tajines': '(max-width:560px) 100vw, 33vw',
    'cuscus': '(max-width:560px) 100vw, 50vw',
    'mezze': '(max-width:560px) 50vw, 20vw',
    'dulces': '(max-width:560px) 50vw, 20vw',
    'mesa': '(max-width:560px) 100vw, 40vw',
    'mar': '(max-width:560px) 100vw, 40vw',
}
POR_DEFECTO = '(max-width:560px) 100vw, 50vw'

informe = {}
for jpg in sorted(ORIGEN.glob('*.jpg')):
    nombre = jpg.stem
    with Image.open(jpg) as im:
        im = im.convert('RGB')
        original = jpg.stat().st_size
        generados = []
        for ancho in ANCHOS:
            if ancho > im.width:
                continue
            alto = round(im.height * ancho / im.width)
            copia = im.resize((ancho, alto), Image.LANCZOS)
            destino = ORIGEN / f'{nombre}-{ancho}.webp'
            copia.save(destino, 'WEBP', quality=CALIDAD, method=6)
            generados.append((ancho, destino, destino.stat().st_size))
        # El mayor disponible hace de src por defecto.
        if not generados:
            destino = ORIGEN / f'{nombre}-{im.width}.webp'
            im.save(destino, 'WEBP', quality=CALIDAD, method=6)
            generados.append((im.width, destino, destino.stat().st_size))
        informe[nombre] = {
            'jpg_bytes': original,
            'webp': [{'ancho': a, 'file': str(d).replace('\\', '/'), 'bytes': b} for a, d, b in generados],
        }
        print(f'{nombre}: {original // 1024} KB JPG → ' +
              ', '.join(f'{a}px {b // 1024} KB' for a, _, b in generados))

Path(ORIGEN / 'webp-manifest.json').write_text(json.dumps(informe, ensure_ascii=False, indent=2), encoding='utf-8')

# Reescribe los <img src="assets/images/X.jpg"> con srcset WebP.
for pagina in Path('.').glob('*.html'):
    html = pagina.read_text(encoding='utf-8')
    cambios = 0

    def sustituir(m):
        global cambios
        etiqueta, nombre = m.group(0), m.group(1)
        if nombre not in informe or 'srcset' in etiqueta:
            return etiqueta
        entradas = informe[nombre]['webp']
        srcset = ', '.join(f"{e['file']} {e['ancho']}w" for e in entradas)
        mayor = entradas[-1]['file']
        sizes = SIZES.get(nombre, POR_DEFECTO)
        etiqueta = etiqueta.replace(f'assets/images/{nombre}.jpg', mayor)
        etiqueta = etiqueta.replace('<img ', f'<img srcset="{srcset}" sizes="{sizes}" ', 1)
        cambios += 1
        return etiqueta

    html = re.sub(r'<img [^>]*?assets/images/([a-z]+)\.jpg[^>]*?>', sustituir, html)
    if cambios:
        pagina.write_text(html, encoding='utf-8')
    print(f'{pagina.name}: {cambios} imágenes servidas en WebP')

total_jpg = sum(v['jpg_bytes'] for v in informe.values())
total_webp = sum(v['webp'][-1]['bytes'] for v in informe.values())
print(f'\nA tamaño máximo: {total_jpg // 1024} KB en JPG → {total_webp // 1024} KB en WebP')
