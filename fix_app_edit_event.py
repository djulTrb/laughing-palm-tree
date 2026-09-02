import os

filepath = 'src/App.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add EditEvent to React.lazy list
if 'const EditEvent = React.lazy(routeComponents.EditEvent);' not in content:
    content = content.replace(
        'const AddMember = React.lazy(routeComponents.AddMember);',
        'const AddMember = React.lazy(routeComponents.AddMember);\nconst EditEvent = React.lazy(routeComponents.EditEvent);'
    )

# Add Route for EditEvent
if '<Route path="admin/edit-event/:id"' not in content:
    content = content.replace(
        '<Route path="admin/add-member" element={<ProtectedAdminRoute><AddMember /></ProtectedAdminRoute>} />',
        '<Route path="admin/add-member" element={<ProtectedAdminRoute><AddMember /></ProtectedAdminRoute>} />\n                    <Route path="admin/edit-event/:id" element={<ProtectedAdminRoute><EditEvent /></ProtectedAdminRoute>} />'
    )

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
