# -*- coding: utf-8 -*-
import os

filepath = 'src/App.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "const AddMember = lazy(() => import('./pages/AddMember'));", 
    "const AddMember = lazy(() => import('./pages/AddMember'));\nconst EditMember = lazy(() => import('./pages/EditMember'));"
)

content = content.replace(
    "<Route path=\"add-member\" element={<AddMember />} />", 
    "<Route path=\"add-member\" element={<AddMember />} />\n              <Route path=\"edit-member/:id\" element={<EditMember />} />"
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

filepath = 'src/utils/routePreloader.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "import('./pages/AddMember')", 
    "import('./pages/AddMember');\n    import('./pages/EditMember')"
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

