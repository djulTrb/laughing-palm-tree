import os

filepath = 'src/pages/Admin.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix handleAddProject
content = content.replace(
    "await api.post('/website/projects/', newProject);",
    "await api.post('/website/projects/', { ...newProject, uuid: uuidv4() });"
)

# Fix handleAddGallery
content = content.replace(
    "await api.post('/gallery/albums/', { title: newGalleryTitle });",
    "await api.post('/gallery/albums/', { title: newGalleryTitle, uuid: uuidv4() });"
)

# Fix handleAddResource (resource payload)
old_res_payload = """        const payload = {
          titre: newResource.title,
          description: newResource.description,
          fichier_url: newResource.link,
          type_ressource: 'DOCUMENT'
        };"""
new_res_payload = """        const payload = {
          uuid: uuidv4(),
          titre: newResource.title,
          description: newResource.description,
          fichier_url: newResource.link,
          type_ressource: 'DOCUMENT'
        };"""
content = content.replace(old_res_payload, new_res_payload)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
