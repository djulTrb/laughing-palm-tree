import os

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'const routeComponents = {',
    'const routeComponents = {\n  AddMember: () => import("./pages/AddMember"),'
)

content = content.replace(
    'const Admin = React.lazy(routeComponents.Admin);',
    'const Admin = React.lazy(routeComponents.Admin);\nconst AddMember = React.lazy(routeComponents.AddMember);'
)

content = content.replace(
    '<Route path="admin" element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />',
    '<Route path="admin" element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />\n                    <Route path="admin/add-member" element={<ProtectedAdminRoute><AddMember /></ProtectedAdminRoute>} />'
)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
