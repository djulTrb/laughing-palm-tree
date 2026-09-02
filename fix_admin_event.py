import os

filepath = 'src/pages/Admin.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure uuidv4 is imported in Admin.jsx!
if 'import { v4 as uuidv4 } from \'uuid\';' not in content:
    content = content.replace('import api from \'../lib/api\';', 'import api from \'../lib/api\';\nimport { v4 as uuidv4 } from \'uuid\';')

# Fix handleAddEvent payload
old_payload = """        const payload = {
          titre: newEvent.title,
          description: newEvent.snippet,
          details: newEvent.details,
          date: newEvent.date,
          lieu: newEvent.location,
          deadline: newEvent.deadline || null
        };"""
new_payload = """        const payload = {
          uuid: uuidv4(),
          titre: newEvent.title,
          description: newEvent.snippet,
          details: newEvent.details,
          date: new Date().toISOString().split('T')[0], // Today's date
          lieu: newEvent.location,
          photo_url: newEvent.image || '',
          deadline: newEvent.deadline || null
        };"""
content = content.replace(old_payload, new_payload)

# Fix Event Form fields
old_date_field = """                <div className="flex flex-col gap-2">
                  <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_event_date", "Date")}</label>
                  <input required value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" type="date" />
                </div>"""
new_image_field = """                <div className="flex flex-col gap-2">
                  <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Image URL</label>
                  <input required value={newEvent.image || ''} onChange={e => setNewEvent({...newEvent, image: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" type="url" placeholder="https://example.com/image.jpg" />
                </div>"""
content = content.replace(old_date_field, new_image_field)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
