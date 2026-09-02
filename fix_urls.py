import os

filepath = 'backend/config/urls.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

if 'settings.MEDIA_URL' not in content:
    content = content.replace('from django.urls import path, include', 'from django.urls import path, include\nfrom django.conf import settings\nfrom django.conf.urls.static import static')
    content += "\n\nif settings.DEBUG:\n    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)\n"

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
