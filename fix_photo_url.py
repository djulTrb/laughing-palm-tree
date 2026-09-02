import os

filepath = 'src/pages/AddMember.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("const photo_url = .png;", "const photo_url = ${githubClean}.png;")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
