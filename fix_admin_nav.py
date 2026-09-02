import re

with open('src/pages/Admin.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add useNavigate import
if 'useNavigate' not in content:
    content = content.replace('from \'react-i18next\';', 'from \'react-i18next\';\nimport { useNavigate } from \'react-router-dom\';')

# Add navigate = useNavigate()
if 'const navigate = useNavigate();' not in content:
    content = content.replace('const { t } = useTranslation();', 'const { t } = useTranslation();\n  const navigate = useNavigate();')

# Replace the onClick handler
pattern = r"onClick=\{\(\) => setSelectedMember\(\{ prenom: '', nom: '', poste: '', description: '', skills: '', linkedin: '', github: '', photo_url: '', ordre_affichage: 0 \}\)\}"
content = re.sub(pattern, "onClick={() => navigate('/admin/add-member')}", content)

with open('src/pages/Admin.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
