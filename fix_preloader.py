import os

filepath = 'src/utils/routePreloader.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'AdminAuth: () => import(\'../pages/AdminAuth\'),',
    'AdminAuth: () => import(\'../pages/AdminAuth\'),\n  AddMember: () => import(\'../pages/AddMember\'),\n  EditEvent: () => import(\'../pages/EditEvent\'),'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
