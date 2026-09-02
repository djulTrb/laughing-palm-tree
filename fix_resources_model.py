import os

filepath = 'backend/apps/resources/models.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('"PrAcsentation"', '"Présentation"')
content = content.replace('fichier_url = models.URLField(max_length=500, blank=True)', 'fichier = models.FileField(upload_to="resources/", blank=True, null=True)')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
