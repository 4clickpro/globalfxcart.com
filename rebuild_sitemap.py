import re, glob, os, datetime
os.chdir('/tmp/gfc-work')

# Task 7: rebuild sitemap from actual files (all 58 html pages, incl. generated ones)
# Task 4 prep: priority boost for location pages
LOCATION_BOOST = ('sandestin', '30a', 'crab-island', 'miramar', 'okaloosa', 'grand-boulevard', 'baytowne', 'destin')

today = datetime.date.today().isoformat()
files = sorted(glob.glob('*.html'))
entries = []
for f in files:
    if f == 'index.html':
        loc = 'https://www.globalfxcart.com/'
        pri = '1.0'; freq = 'daily'
    else:
        loc = f'https://www.globalfxcart.com/{f}'
        pri = '0.9' if any(k in f for k in LOCATION_BOOST) else '0.7'
        freq = 'weekly' if f.startswith(('99-', 'rental')) else 'monthly'
    entries.append(f'''  <url>
    <loc>{loc}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{pri}</priority>
  </url>''')

xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + '\n'.join(entries) + '\n</urlset>\n'
open('sitemap.xml', 'w').write(xml)
print('sitemap rebuilt with', len(entries), 'urls')
