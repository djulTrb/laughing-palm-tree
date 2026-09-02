# -*- coding: utf-8 -*-
import os

filepath = 'src/pages/EditMember.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("export default function AddMember() {", "import { useParams } from 'react-router-dom';\nexport default function EditMember() {\n  const { id } = useParams();\n  const [loadingMember, setLoadingMember] = useState(true);")

content = content.replace("const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({", "const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({")

hook_code = """const [serverError, setServerError] = useState('');
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const { data } = await api.get('/team/');
        const member = data.find(m => m.id.toString() === id.toString());
        if (member) {
          reset({
            firstName: member.prenom,
            lastName: member.nom,
            role: member.poste,
            linkedin: member.linkedin,
            github: member.github
          });
          if (member.skills) {
            let parsedSkills = [];
            try {
              parsedSkills = typeof member.skills === 'string' ? JSON.parse(member.skills) : member.skills;
            } catch (e) {
              parsedSkills = [];
            }
            if (Array.isArray(parsedSkills)) {
              setSkills(parsedSkills);
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMember(false);
      }
    };
    fetchMember();
  }, [id, reset]);
"""
content = content.replace("const [serverError, setServerError] = useState('');", hook_code)

content = content.replace("await api.post('/team/', payload);", "await api.put(/team//, payload);")
content = content.replace("alert('Member added successfully!');", "alert('Member updated successfully!');")

delete_code = """const [isSubmitting, setIsSubmitting] = useState(false);
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await api.delete(/team//);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setServerError('Failed to delete member.');
    }
  };
"""
content = content.replace("const [isSubmitting, setIsSubmitting] = useState(false);", delete_code)

import re
content = re.sub(r'<h1.*?</h1>', "<h1 className=\"text-black mb-4 text-center font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight\">{t('admin_member_modify', 'Modify Member')}</h1>", content, count=1, flags=re.DOTALL)

content = content.replace("{isSubmitting ? 'Adding...' : 'Add Member'}", "{isSubmitting ? 'Saving...' : 'Save Changes'}")

delete_btn = """<button
              type="button"
              onClick={handleDelete}
              className="px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-error bg-error/10 hover:bg-error/20 transition-colors border border-transparent"
            >
              Delete Member
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}"""
content = content.replace("<button\n              type=\"button\"\n              onClick={() => navigate('/admin')}", delete_btn)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
