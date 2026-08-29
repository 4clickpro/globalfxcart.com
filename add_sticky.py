import re, glob, os
os.chdir('/tmp/gfc-work')

STICKY = '''  <!-- Sticky mobile call bar (24/7 booking) -->
  <div class="sticky-call-bar">
    <a href="tel:8502998575" class="call-now">📞 Call to Book — 24/7</a>
    <a href="sms:8502998575" class="text-now">💬 Text</a>
  </div>

</body>'''

n_bar = n_faq_notes = 0
for f in sorted(glob.glob('*.html')):
    s = open(f).read()
    o = s
    # 5) sticky call bar on every page (mobile-only via CSS)
    if 'sticky-call-bar' not in s:
        if '</body>' in s:
            s = s.replace('</body>', STICKY, 1)
        else:
            continue
    if s != o:
        open(f, 'w').write(s)
        n_bar += 1

print('sticky bar added to', n_bar, 'pages')
