import os

filepath = 'src/pages/Admin.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('alert("Failed to save member");', '')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
