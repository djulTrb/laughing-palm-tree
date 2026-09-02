const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.jsx', 'utf8');

// Replace newResource state
content = content.replace(
  "const [newResource, setNewResource] = useState({ title: '', description: '', link: '' });",
  "const [newResource, setNewResource] = useState({ title: '', description: '', link: '', category: 'pdf', file: null });"
);

// Replace handleAddResource
const oldHandleAddResource = const handleAddResource = async (e) => {
      e.preventDefault();
      try {
        const payload = {
          titre: newResource.title,
          description: newResource.description,
          fichier_url: newResource.link,
          type_ressource: 'DOCUMENT'
        };
        await api.post('/resources/', payload);
        setNewResource({ title: '', description: '', link: '' });
        alert("Resource added successfully!");
      } catch (err) {
        console.error(err);
      }
    };;

const newHandleAddResource = const handleAddResource = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append('titre', newResource.title);
        formData.append('description', newResource.description);
        formData.append('categorie', newResource.category);
        if (newResource.file) {
          formData.append('fichier', newResource.file);
        }
        formData.append('uuid', uuidv4());
        
        await api.post('/resources/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        setNewResource({ title: '', description: '', link: '', category: 'pdf', file: null });
      } catch (err) {
        console.error(err);
      }
    };;

content = content.replace(oldHandleAddResource, newHandleAddResource);

// Replace the form fields for Resources
const oldFormFields = <div className="flex flex-col gap-2">
                  <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_resource_pdf", "Upload PDF")}</label>
                  <div className="w-full bg-surface-container-low border border-dashed border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-colors">
                    <span className="text-on-surface-variant/60 text-xs">{t("admin_resource_pdf_hint", "Click to upload PDF...")}</span>
                    <span className="material-symbols-outlined text-sm text-[#9D4EDD]">picture_as_pdf</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_resource_link", "Resource Link")}</label>
                  <input required value={newResource.link} onChange={e => setNewResource({...newResource, link: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all" placeholder="https://..." type="url" />
                </div>;

const newFormFields = <div className="flex flex-col gap-2">
                  <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_resource_pdf", "Upload File")}</label>
                  <input 
                    type="file" 
                    onChange={e => setNewResource({...newResource, file: e.target.files[0]})}
                    className="w-full bg-surface-container-low border border-dashed border-outline-variant/30 rounded-xl px-4 py-2 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#9D4EDD]/10 file:text-[#9D4EDD] hover:file:bg-[#9D4EDD]/20"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">{t("admin_resource_type", "Type de Ressource")}</label>
                  <select 
                    value={newResource.category} 
                    onChange={e => setNewResource({...newResource, category: e.target.value})}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all"
                  >
                    <option value="pdf">PDF</option>
                    <option value="support_cours">Support de cours</option>
                    <option value="tutoriel">Tutoriel</option>
                    <option value="presentation">Présentation</option>
                    <option value="lien_utile">Lien utile</option>
                  </select>
                </div>;

content = content.replace(oldFormFields, newFormFields);

fs.writeFileSync('src/pages/Admin.jsx', content, 'utf8');
