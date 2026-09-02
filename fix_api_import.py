import os
for filepath in ['src/pages/AddMember.jsx', 'src/pages/EditEvent.jsx']:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace("import api from '../services/api';", "import api from '../lib/api';")
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
