import re

with open('src/pages/Admin.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

def replace_modal(content, state_var):
    pattern = (
        r'\{' + state_var + r' && \(\s*'
        r'<div className="fixed inset-0 z-50 overflow-y-auto">\s*'
        r'<div className="min-h-full flex items-center justify-center p-4">\s*'
        r'<div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick=\{\(\) => set' + state_var[8:] + r'\(null\)\}></div>\s*'
        r'<div className="relative bg-surface-container ([^"]+)">'
    )
    
    replacement = (
        r'{' + state_var + r' && (\n'
        r'          <div className="fixed inset-0 z-50">\n'
        r'            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>\n'
        r'            <div className="absolute inset-0 overflow-y-auto" onClick={() => set' + state_var[8:] + r'(null)}>\n'
        r'              <div className="min-h-full flex items-center justify-center p-4">\n'
        r'                <div \n'
        r'                  className="relative bg-surface-container \1"\n'
        r'                  onClick={(e) => e.stopPropagation()}\n'
        r'                >'
    )
    
    new_content = re.sub(pattern, replacement, content)
    return new_content

content = replace_modal(content, "selectedMember")
content = replace_modal(content, "selectedEvent")
content = replace_modal(content, "selectedGallery")

with open('src/pages/Admin.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
