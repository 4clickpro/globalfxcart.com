#!/usr/bin/env python3
"""Add FAQPage JSON-LD to every HTML page that has .faq-item blocks but no FAQPage schema.
Extracts Q/A from the visible <details class="faq-item"><summary>Q</summary><p>A</p></details>
and injects a FAQPage script before </head>. 24/7 note: pages already carry tel: CTAs.
"""
import re, glob, json, html as htmllib

BASE = 'https://www.globalfxcart.com'
n_added, n_skipped, n_nofaq = 0, 0, []

for f in sorted(glob.glob('/tmp/gfc-work/*.html')):
    s = open(f).read()
    if 'FAQPage' in s:
        n_skipped += 1
        continue
    items = re.findall(
        r'<details class="faq-item">\s*<summary>(.*?)</summary>\s*<p>(.*?)</p>\s*</details>',
        s, re.S)
    if not items:
        n_nofaq.append(f.split('/')[-1])
        continue
    qas = []
    for q, a in items:
        q = htmllib.unescape(re.sub(r'<[^>]+>', '', q)).strip()
        a = htmllib.unescape(re.sub(r'<[^>]+>', '', a)).strip()
        q = q.replace('\u2019', "'").replace('&rsquo;', "'")
        a = a.replace('\u2019', "'").replace('&rsquo;', "'")
        if q and a:
            qas.append({'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}})
    if not qas:
        n_nofaq.append(f.split('/')[-1])
        continue
    schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': qas,
    }
    blob = json.dumps(schema, ensure_ascii=False, indent=2)
    script = '  <script type="application/ld+json">\n  ' + blob + '\n  </script>\n'
    s = s.replace('</head>', script + '</head>', 1)
    open(f, 'w').write(s)
    n_added += 1

print(f'FAQPage added: {n_added}, already had: {n_skipped}, no faq blocks: {len(n_nofaq)}')
print('pages without faq blocks:', n_nofaq[:10])
