import os

files_to_modify = [
    'backend/apps/contact/models.py',
    'backend/apps/events/models.py',
    'backend/apps/gallery/models.py',
    'backend/apps/recruitment/models.py',
    'backend/apps/resources/models.py',
    'backend/apps/website/models.py'
]

for filepath in files_to_modify:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'uuid = models.CharField' not in content:
        # Find the first CharField or TextField and insert uuid before it
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if '= models.' in line and 'class ' not in line:
                lines.insert(i, '    uuid = models.CharField(max_length=100, blank=True, null=True, unique=True)')
                break
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
