# Descarga las fuentes a assets/fonts/ para servirlas desde el propio sitio.
# Sin CDN ni peticiones a terceros en tiempo de visita: la web sigue sin
# dependencias remotas. Ambas familias son SIL Open Font License 1.1.
import urllib.request, re, json
from pathlib import Path

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
FAMILIES = {
    # Titulares: serif de alto contraste, elegante.
    'Cormorant Garamond': [('400', 'normal'), ('600', 'normal'), ('400', 'italic')],
    # Interfaz y texto: geométrica cálida.
    'Jost': [('400', 'normal'), ('500', 'normal'), ('600', 'normal')],
}

folder = Path('assets/fonts')
folder.mkdir(parents=True, exist_ok=True)
manifest = {}

for family, styles in FAMILIES.items():
    for weight, style in styles:
        ital = '1' if style == 'italic' else '0'
        url = (f'https://fonts.googleapis.com/css2?family={family.replace(" ", "+")}'
               f':ital,wght@{ital},{weight}&display=swap&subset=latin')
        req = urllib.request.Request(url, headers={'User-Agent': UA})
        css = urllib.request.urlopen(req, timeout=30).read().decode('utf-8')
        # Sólo el bloque 'latin': evita descargar cirílico y vietnamita.
        blocks = css.split('/* ')
        latin = [b for b in blocks if b.startswith('latin */')]
        source = latin[0] if latin else css
        woff2 = re.search(r"url\((https://fonts\.gstatic\.com/[^)]+\.woff2)\)", source)
        if not woff2:
            raise SystemExit(f'Sin woff2 para {family} {weight} {style}')
        slug = family.lower().replace(' ', '-') + f'-{weight}' + ('-italic' if style == 'italic' else '')
        dest = folder / (slug + '.woff2')
        data = urllib.request.urlopen(urllib.request.Request(woff2.group(1), headers={'User-Agent': UA}), timeout=30).read()
        dest.write_bytes(data)
        manifest[slug] = {'family': family, 'weight': weight, 'style': style,
                          'file': str(dest).replace('\\', '/'), 'bytes': len(data),
                          'source': woff2.group(1), 'license': 'SIL Open Font License 1.1'}
        print(f'{slug}: {len(data) // 1024} KB')

(folder / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
print('Total:', sum(m['bytes'] for m in manifest.values()) // 1024, 'KB')
