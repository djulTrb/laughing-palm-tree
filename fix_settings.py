import os

filepath = 'backend/config/settings.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

if 'MEDIA_URL' not in content:
    content = content.replace('STATIC_URL = "/static/"', 'STATIC_URL = "/static/"\nMEDIA_URL = "/media/"\nMEDIA_ROOT = BASE_DIR / "media"')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
