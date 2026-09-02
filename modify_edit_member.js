const fs = require('fs');
let content = fs.readFileSync('src/pages/EditMember.jsx', 'utf8');

// Change component name and add useParams
content = content.replace(/export default function AddMember\(\) \{/g, import { useParams } from 'react-router-dom';\nexport default function EditMember() {\n  const { id } = useParams();\n  const [loadingMember, setLoadingMember] = useState(true););

// Update logic
content = content.replace(
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({,
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
);

content = content.replace(
  const [serverError, setServerError] = useState('');,
  const [serverError, setServerError] = useState('');\n
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const { data } = await api.get('/team/');
        // Find member by ID since there might not be a direct GET /team/:id/ endpoint configured to work perfectly
        // Or we just try GET /team/:id/
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

);

// Update onSubmit from POST to PUT
content = content.replace(
  wait api.post('/team/', payload);,
  wait api.put(\/team/\/\, payload);
);

content = content.replace(
  lert('Member added successfully!');,
  lert('Member updated successfully!');
);

// Add delete handler
content = content.replace(
  const [isSubmitting, setIsSubmitting] = useState(false);,
  const [isSubmitting, setIsSubmitting] = useState(false);\n
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await api.delete(\/team/\/\);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setServerError('Failed to delete member.');
    }
  };
);

// Change title
content = content.replace(/<h1 className="text-black mb-4 text-center font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">.*?<\/h1>/s, <h1 className="text-black mb-4 text-center font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">{t('admin_member_modify', 'Modify Member')}</h1>);

// Change submit button text
content = content.replace(/{isSubmitting \? 'Adding\.\.\.' : 'Add Member'}/, {isSubmitting ? 'Saving...' : 'Save Changes'});

// Add Delete Button next to submit button
content = content.replace(
  <button\n              type="button"\n              onClick={() => navigate('/admin')},
  <button\n              type="button"\n              onClick={handleDelete}\n              className="px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-error bg-error/10 hover:bg-error/20 transition-colors border border-transparent"\n            >\n              Delete Member\n            </button>\n            <button\n              type="button"\n              onClick={() => navigate('/admin')}
);

fs.writeFileSync('src/pages/EditMember.jsx', content, 'utf8');
