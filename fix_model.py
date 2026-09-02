import os

filepath = 'backend/apps/team/models.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

if 'uuid' not in content:
    content = content.replace(
        'prenom          = models.CharField(max_length=100)',
        'uuid            = models.CharField(max_length=100, blank=True, null=True, unique=True)\n    prenom          = models.CharField(max_length=100)'
    )

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
