import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { v4 as uuidv4 } from 'uuid';
import LoadingState from '../components/ui/LoadingState';
import AddEventForm from '../components/admin/AddEventForm';
import AddProjectForm from '../components/admin/AddProjectForm';
import AddGalleryForm from '../components/admin/AddGalleryForm';
import AddResourceForm from '../components/admin/AddResourceForm';

const Admin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [members, setMembers] = useState([]);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);


  const [isRecruitmentOpen, setIsRecruitmentOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [galleries, setGalleries] = useState([]);
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);

  
  
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.get('/accounts/me/');
        
        const [eventsRes, projectsRes, galleriesRes, recruitmentRes, membersRes] = await Promise.all([
          api.get('/events/').catch(() => ({ data: [] })),
          api.get('/website/projects/').catch(() => ({ data: [] })),
          api.get('/gallery/albums/').catch(() => ({ data: [] })),
          api.get('/recruitment/settings/').catch(() => ({ data: {} })),
          api.get('/team/').catch(() => ({ data: [] }))
        ]);
        
        setEvents(eventsRes.data || []);
        setProjects(projectsRes.data || []);
        setGalleries(galleriesRes.data || []);
        setMembers(membersRes.data || []);
        
        const phase = recruitmentRes.data?.phase || (Array.isArray(recruitmentRes.data) && recruitmentRes.data[0]?.phase);
        setIsRecruitmentOpen(phase === 'ouvert');
        setLoading(false);
      } catch (err) {
        console.error('Auth error or API error:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          // Do not set loading to false here. Keep the loader visible while the browser redirects.
          window.location.href = '/admin-auth';
        } else {
          setLoading(false);
        }
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedEvent || selectedGallery || selectedMember) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedEvent, selectedGallery, selectedMember]);

  
  const handleSaveMember = async (e) => {
    e.preventDefault();
    try {
      if (selectedMember.id) {
        await api.put(`/team/${selectedMember.id}/`, selectedMember);
      } else {
        await api.post('/team/', selectedMember);
      }
      const membersRes = await api.get('/team/');
      setMembers(membersRes.data);
      setSelectedMember(null);
    } catch (err) {
      console.error("Failed to save member", err);
      
    }
  };


  const toggleRecruitment = async () => {
    try {
      await api.put('/recruitment/settings/', { recrutements_ouverts: !isRecruitmentOpen });
      setIsRecruitmentOpen(!isRecruitmentOpen);
    } catch (err) {
      console.error("Failed to toggle recruitment phase:", err);
      alert("Failed to update recruitment settings on the server.");
    }
  };

  const handleDeleteMember = async () => {
    if (!memberToDelete) return;
    try {
      await api.delete(`/team/${memberToDelete}/`);
      setMembers(members.filter(m => (m.uuid || m.id) !== memberToDelete));
      setMemberToDelete(null);
    } catch (err) {
      console.error("Failed to delete member", err);
    }
  };


  const handleLogout = async () => {
    try {
      await api.post('/accounts/logout/');
      localStorage.removeItem('mirai_auth_token');
      window.location.href = '/';
    } catch (err) {
      console.error("Logout failed:", err);
      localStorage.removeItem('mirai_auth_token');
      window.location.href = '/';
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await api.delete(`/events/${id}/`);
      setEvents(events.filter(ev => ev.id !== id));
      setSelectedEvent(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title) return;
    try {
      const res = await api.post('/website/projects/', { ...newProject, uuid: uuidv4() });
      setProjects([...projects, res.data]);
      setNewProject({ title: '', category: '', description: '', link: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await api.delete(`/website/projects/${id}/`);
      setProjects(projects.filter(p => p.id !== id));
      setSelectedProject(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddGallery = async (e) => {
    e.preventDefault();
    if (!newGalleryTitle) return;
    try {
      const res = await api.post('/gallery/albums/', { title: newGalleryTitle, uuid: uuidv4() });
      setGalleries([...galleries, { ...res.data, images: [] }]);
      setNewGalleryTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteGallery = async (id) => {
    try {
      await api.delete(`/gallery/albums/${id}/`);
      setGalleries(galleries.filter(g => g.id !== id));
      setSelectedGallery(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteImage = async (galleryId, imageId) => {
    try {
      await api.delete(`/gallery/images/${imageId}/`);
      setGalleries(galleries.map(g => {
        if (g.id === galleryId) {
          return { ...g, images: (g.images || []).filter(img => img.id !== imageId) };
        }
        return g;
      }));
      if (selectedGallery && selectedGallery.id === galleryId) {
        setSelectedGallery({
          ...selectedGallery,
          images: (selectedGallery.images || []).filter(img => img.id !== imageId)
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddResource = async (e) => {
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
      alert("Resource added successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <main className="flex-grow flex items-center justify-center w-full h-screen bg-background font-body">
        <LoadingState variant="Dots" showPercentage={false} />
      
      {/* Delete Confirmation Modal */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl border border-outline-variant/30 transform transition-all">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center text-error mb-2">
                <span className="material-symbols-outlined text-3xl">warning</span>
              </div>
              <h3 className="font-display font-bold text-xl text-black">Delete Member?</h3>
              <p className="font-body text-sm text-on-surface-variant">
                This action cannot be undone. Are you sure you want to remove this member from the club?
              </p>
              <div className="flex gap-3 w-full mt-4">
                <button 
                  onClick={() => setMemberToDelete(null)}
                  className="flex-1 py-3 px-4 font-body font-semibold text-xs uppercase tracking-wider rounded-xl border border-outline-variant/30 hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteMember}
                  className="flex-1 py-3 px-4 font-body font-semibold text-xs uppercase tracking-wider rounded-xl bg-error text-white shadow-sm hover:bg-error/80 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </main>
    );
  }

  return (
    <main className="flex-grow flex flex-col justify-start relative w-full py-16 bg-background font-body">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-24 pt-32 pb-16 flex flex-col items-center relative z-10 gap-4">
        <div className="absolute top-8 right-8 z-20">
          <button onClick={handleLogout} className="px-6 py-2 bg-red-50 text-red-600 font-body font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-red-100 transition-colors flex items-center gap-1.5 shadow-sm">
            <span className="material-symbols-outlined text-sm">logout</span> Logout
          </button>
        </div>
        <div className="absolute top-8 right-8 z-20">
          <button onClick={handleLogout} className="px-6 py-2 bg-red-50 text-red-600 font-body font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-red-100 transition-colors flex items-center gap-1.5 shadow-sm">
            <span className="material-symbols-outlined text-sm">logout</span> Logout
          </button>
        </div>
        <span className="font-accent font-semibold text-xs text-[#9D4EDD] uppercase tracking-wider mb-2">{t('admin_portal', 'Backoffice Portal')}</span>
        <h1 className="text-black mb-4 text-center font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight">{t('admin_title', 'Admin Page')}</h1>
        <p className="font-body text-base text-on-surface-variant mb-8 text-center max-w-xl">{t('admin_desc', 'Manage executive members, calendar events, media galleries, and public learning resources.')}</p>
        
        <div className="w-full flex flex-col gap-8 max-w-[1400px]">
          
          {/* Recruitment Toggle & Applications */}
          <div className="flex flex-col gap-4 bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h2 className="font-display font-bold text-xl text-black tracking-tight mb-1">{t('admin_recruit_status', 'Recruitment Status')}</h2>
                <p className="font-body text-xs sm:text-sm text-on-surface-variant max-w-md">{t('admin_recruit_desc', 'Toggle whether the student recruitment application form is open or closed for public applicants.')}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={() => navigate('/admin/applications')} className="px-5 py-3 bg-white text-black font-body font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-surface-variant transition-colors flex items-center gap-2 shadow-sm border border-outline-variant/30">
                  <span className="material-symbols-outlined text-sm">inbox</span>
                  Applications
                </button>
                <button onClick={() => navigate('/admin/adherents')} className="px-5 py-3 bg-white text-black font-body font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-surface-variant transition-colors flex items-center gap-2 shadow-sm border border-outline-variant/30">
                  <span className="material-symbols-outlined text-sm">groups</span>
                  Adherents List
                </button>
                <button 
                  onClick={toggleRecruitment}
                  className={`px-6 py-3 text-white font-body font-semibold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center gap-2 shadow-sm ${
                    isRecruitmentOpen ? 'bg-error hover:bg-error/80' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {isRecruitmentOpen ? 'block' : 'check_circle'}
                  </span>
                  {isRecruitmentOpen ? t('admin_recruit_close', 'Close Recruitment') : t('admin_recruit_open', 'Open Recruitment')}
                </button>
              </div>
            </div>
          </div>

          {/* Manage Members */}
          <div className="flex flex-col gap-4 bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-display font-bold text-xl text-black tracking-tight">{t("admin_members_title", "Manage members")}</h2>
                <button 
                  onClick={() => navigate('/admin/add-member')}
                  className="px-6 py-2 bg-[#9D4EDD] text-white font-body font-semibold text-xs uppercase tracking-wider rounded-full hover:opacity-80 transition-opacity flex items-center gap-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-sm">add</span>{t("admin_member_add", "Add Member")}
                </button>
              </div>
              <div className="flex flex-col divide-y divide-outline-variant/30 border-y border-outline-variant/30">
                {members.length === 0 ? (
                  <div className="py-4 font-body text-on-surface-variant text-sm">No members found.</div>
                ) : (
                  members.map((member) => (
                    <div key={member.id} className="py-4 font-body text-black flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        {member.photo_url ? (
                          <img src={member.photo_url} alt={member.prenom} className="w-10 h-10 rounded-full object-cover border border-outline-variant/30" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center border border-outline-variant/30">
                            <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm sm:text-base">{member.prenom} {member.nom}</p>
                          <p className="text-xs text-on-surface-variant">{member.poste}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => navigate('/admin/edit-member/' + (member.uuid || member.id))} className="hover:text-[#9D4EDD] transition-colors flex items-center gap-1 font-body font-semibold text-xs uppercase tracking-wider">
                          <span className="material-symbols-outlined text-sm">edit</span>{t("admin_member_modify", "Modify")}
                        </button>
                        <button onClick={() => setMemberToDelete(member.uuid || member.id)} className="hover:text-error transition-colors flex items-center gap-1 font-body font-semibold text-xs uppercase tracking-wider">
                          <span className="material-symbols-outlined text-sm">delete</span>{t("admin_member_delete", "Delete")}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div></div>

          {/* Add & Manage Event */}
          <div className="flex flex-col gap-4 bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-display font-bold text-xl text-black tracking-tight">{t("admin_events_title", "Manage Events")}</h2>
            </div>
            <AddEventForm onEventAdded={(event) => setEvents([event, ...events])} />

            <h3 className="font-display font-bold text-lg text-black tracking-tight mb-2">{t("admin_events_existing", "Existing Events")}</h3>
            <div className="flex flex-col divide-y divide-outline-variant/30">
              {events.map((event) => (
                <div key={event.id} className="py-4 font-body text-black flex justify-between items-center hover:bg-surface-container-low px-4 -mx-4 rounded-xl transition-colors">
                  <div className="cursor-pointer flex-1" onClick={() => navigate(`/admin/edit-event/${event.id}`)}>
                    <span className="font-medium text-sm sm:text-base block">{event.titre || event.title}</span>
                    <span className="text-xs text-on-surface-variant">{event.deadline ? `Deadline: ${event.deadline.split('T')[0]}` : 'No deadline'}</span>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => navigate(`/admin/edit-event/${event.id}`)} className="hover:text-[#9D4EDD] transition-colors flex items-center gap-1 font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">edit</span>Edit
                    </button>
                    <button onClick={() => { if(window.confirm('Are you sure you want to delete this event?')) handleDeleteEvent(event.id); }} className="hover:text-error transition-colors flex items-center gap-1 font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">delete</span>Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          {/* Manage Projects */}
          <div className="flex flex-col gap-4 bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-display font-bold text-xl text-black tracking-tight">{t("admin_projects_title", "Manage Projects")}</h2>
            </div>
            
            <AddProjectForm onProjectAdded={(project) => setProjects([project, ...projects])} />

            <h3 className="font-display font-bold text-lg text-black tracking-tight mb-2">Existing Projects</h3>
            <div className="flex flex-col divide-y divide-outline-variant/30">
              {projects.length === 0 ? <p className="text-sm text-on-surface-variant py-4">No projects yet.</p> : null}
              {projects.map((project) => (
                <div key={project.id} className="py-4 font-body text-black flex justify-between items-center hover:bg-surface-container-low px-4 -mx-4 rounded-xl cursor-pointer transition-colors" onClick={() => setSelectedProject(project)}>
                  <div>
                    <span className="font-medium text-sm sm:text-base block">{project.title}</span>
                    <span className="text-xs text-on-surface-variant uppercase">{project.category}</span>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }} className="hover:text-error transition-colors flex items-center gap-1 font-body font-semibold text-xs uppercase tracking-wider">
                      <span className="material-symbols-outlined text-sm">delete</span>Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* {t("admin_gallery_title", "Manage Gallery")} */}
          <div className="flex flex-col gap-4 bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-display font-bold text-xl text-black tracking-tight">{t("admin_gallery_title", "Manage Gallery")}</h2>
            </div>
            <AddGalleryForm onGalleryAdded={(gallery) => setGalleries([gallery, ...galleries])} />

            <h3 className="font-display font-bold text-lg text-black tracking-tight mb-2">{t("admin_galleries_existing", "Existing Galleries")}</h3>
            <div className="flex flex-col divide-y divide-outline-variant/30">
              {galleries.map((gallery) => (
                <div key={gallery.id} className="py-4 font-body text-black flex justify-between items-center hover:bg-surface-container-low px-4 -mx-4 rounded-xl cursor-pointer transition-colors" onClick={() => setSelectedGallery(gallery)}>
                  <div>
                    <span className="font-medium text-sm sm:text-base block">{gallery.title}</span>
                    <span className="text-xs text-on-surface-variant">{gallery.images?.length || 0} {t("admin_gallery_images", "images")}</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="hover:text-[#9D4EDD] transition-colors flex items-center gap-1 font-body font-semibold text-xs uppercase tracking-wider">
                      <span className="material-symbols-outlined text-sm">edit</span>{t("admin_gallery_edit", "Edit Album")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* {t("admin_resources_title", "Manage Resources")} */}
          <div className="flex flex-col gap-4 bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-display font-bold text-xl text-black tracking-tight">{t("admin_resources_title", "Manage Resources")}</h2>
            </div>
            <AddResourceForm onResourceAdded={(resource) => { /* Update resources state if you had it, maybe you fetch again or just refresh page */ window.location.reload(); }} />
          </div>
        </div>
      </div>

      {/* Modals */}

        {selectedMember && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div className="absolute inset-0 overflow-y-auto" onClick={() => setSelectedMember(null)}>
              <div className="min-h-full flex items-center justify-center p-4">
                <div 
                  className="relative bg-surface-container rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl my-8"
                  onClick={(e) => e.stopPropagation()}
                >
                <button onClick={() => setSelectedMember(null)} className="absolute top-6 right-6 w-10 h-10 bg-surface-container hover:bg-surface-variant rounded-full flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-black">close</span>
                </button>
                
                <h3 className="font-display font-bold text-2xl text-black mb-6">{selectedMember.id ? 'Edit Member' : 'Add Member'}</h3>
                
                <form onSubmit={handleSaveMember} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">First Name</label>
                      <input type="text" required value={selectedMember.prenom} onChange={e => setSelectedMember({...selectedMember, prenom: e.target.value})} className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm text-black focus:outline-none focus:border-[#9D4EDD] transition-colors" placeholder="e.g. John" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Last Name</label>
                      <input type="text" required value={selectedMember.nom} onChange={e => setSelectedMember({...selectedMember, nom: e.target.value})} className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm text-black focus:outline-none focus:border-[#9D4EDD] transition-colors" placeholder="e.g. Doe" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Role / Position</label>
                    <input type="text" required value={selectedMember.poste} onChange={e => setSelectedMember({...selectedMember, poste: e.target.value})} className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm text-black focus:outline-none focus:border-[#9D4EDD] transition-colors" placeholder="e.g. Developer" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Skill 1 (Optional)</label>
                      <input type="text" value={(selectedMember.skills || '').split(',')[0]?.trim() || ''} onChange={e => {
                        const val = e.target.value.trim();
                        const s2 = (selectedMember.skills || '').split(',')[1]?.trim() || '';
                        setSelectedMember({...selectedMember, skills: [val, s2].filter(Boolean).join(', ')});
                      }} className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm text-black focus:outline-none focus:border-[#9D4EDD] transition-colors" placeholder="e.g. React" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Skill 2 (Optional)</label>
                      <input type="text" value={(selectedMember.skills || '').split(',')[1]?.trim() || ''} onChange={e => {
                        const val = e.target.value.trim();
                        const s1 = (selectedMember.skills || '').split(',')[0]?.trim() || '';
                        setSelectedMember({...selectedMember, skills: [s1, val].filter(Boolean).join(', ')});
                      }} className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm text-black focus:outline-none focus:border-[#9D4EDD] transition-colors" placeholder="e.g. Figma" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">LinkedIn URL</label>
                      <input type="url" value={selectedMember.linkedin} onChange={e => setSelectedMember({...selectedMember, linkedin: e.target.value})} className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm text-black focus:outline-none focus:border-[#9D4EDD] transition-colors" placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">GitHub URL</label>
                      <input type="url" value={selectedMember.github} onChange={e => setSelectedMember({...selectedMember, github: e.target.value})} className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm text-black focus:outline-none focus:border-[#9D4EDD] transition-colors" placeholder="https://github.com/..." />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Photo URL</label>
                    <input type="url" value={selectedMember.photo_url} onChange={e => setSelectedMember({...selectedMember, photo_url: e.target.value})} className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm text-black focus:outline-none focus:border-[#9D4EDD] transition-colors" placeholder="https://example.com/photo.jpg" />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Display Order</label>
                    <input type="number" value={selectedMember.ordre_affichage} onChange={e => setSelectedMember({...selectedMember, ordre_affichage: parseInt(e.target.value) || 0})} className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm text-black focus:outline-none focus:border-[#9D4EDD] transition-colors" />
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <button type="button" onClick={() => setSelectedMember(null)} className="px-6 py-2.5 rounded-full font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant hover:bg-surface-variant transition-colors border border-outline-variant/30">
                      Cancel
                    </button>
                    <button type="submit" className="px-6 py-2.5 rounded-full font-body font-semibold text-xs uppercase tracking-wider bg-[#9D4EDD] text-white hover:opacity-90 transition-opacity shadow-sm">
                      {t("admin_modal_save", "Save Changes")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedEvent && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div className="absolute inset-0 overflow-y-auto" onClick={() => setSelectedEvent(null)}>
            <div className="min-h-full flex items-center justify-center p-4">
              <div 
                className="relative bg-surface-container rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl my-8"
                onClick={(e) => e.stopPropagation()}
              >
              <button onClick={() => setSelectedEvent(null)} className="absolute top-6 right-6 w-10 h-10 bg-surface-container hover:bg-surface-variant rounded-full flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
              
              <h2 className="font-display font-bold text-2xl mb-6">{t("admin_modal_edit_event", "Edit Event")}</h2>
              <form className="flex flex-col gap-4">
                <input defaultValue={selectedEvent.title} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none" type="text" />
                <input defaultValue={selectedEvent.date} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none" type="date" />
                <textarea defaultValue={selectedEvent.snippet} rows="2" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none resize-none"></textarea>
                <textarea defaultValue={selectedEvent.details} rows="4" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none resize-none"></textarea>
                <input defaultValue={selectedEvent.location} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none" type="text" />
                
                <div className="flex justify-between mt-6">
                  <button type="button" onClick={() => handleDeleteEvent(selectedEvent.id)} className="px-6 py-2.5 rounded-full font-body font-semibold text-xs uppercase tracking-wider text-error border border-error hover:bg-error/10 transition-colors">
                    {t("admin_modal_delete", "Delete Event")}
                  </button>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setSelectedEvent(null)} className="px-6 py-2.5 rounded-full font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant hover:bg-surface-variant transition-colors">
                      {t("admin_modal_cancel", "Cancel")}
                    </button>
                    <button type="button" className="px-6 py-2.5 rounded-full font-body font-semibold text-xs uppercase tracking-wider bg-[#9D4EDD] text-white hover:opacity-90 transition-opacity shadow-sm">
                      {t("admin_modal_save", "Save Changes")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
      )}

      {selectedGallery && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div className="absolute inset-0 overflow-y-auto" onClick={() => setSelectedGallery(null)}>
            <div className="min-h-full flex items-center justify-center p-4">
              <div 
                className="relative bg-surface-container rounded-3xl p-6 md:p-8 max-w-4xl w-full shadow-2xl my-8"
                onClick={(e) => e.stopPropagation()}
              >
              <button onClick={() => setSelectedGallery(null)} className="absolute top-6 right-6 w-10 h-10 bg-surface-container hover:bg-surface-variant rounded-full flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
              
              <h2 className="font-display font-bold text-2xl mb-2">{t("admin_modal_edit_gallery", "Edit Gallery")}</h2>
              <input defaultValue={selectedGallery.title} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none mb-6" type="text" />
              
              <h3 className="font-display font-bold text-lg mb-4">{t("admin_modal_gallery_images", "Images")}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {(selectedGallery.images || []).map(img => (
                <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square border border-outline-variant/30">
                  <img src={img.url} alt="Gallery item" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => handleDeleteImage(selectedGallery.id, img.id)} className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-6 border-t border-outline-variant/30">
              <button type="button" onClick={() => handleDeleteGallery(selectedGallery.id)} className="px-6 py-3 bg-red-50 text-red-600 font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">delete_forever</span> {t("admin_member_delete", "Delete")} Entire Album
              </button>
              <button type="button" onClick={() => setSelectedGallery(null)} className="px-8 py-3 bg-[#9D4EDD] text-white font-semibold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 transition-opacity">
                Done
              </button>
            </div>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Background SVG elements */}
      
      {/* Delete Confirmation Modal */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl border border-outline-variant/30 transform transition-all">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center text-error mb-2">
                <span className="material-symbols-outlined text-3xl">warning</span>
              </div>
              <h3 className="font-display font-bold text-xl text-black">Delete Member?</h3>
              <p className="font-body text-sm text-on-surface-variant">
                This action cannot be undone. Are you sure you want to remove this member from the club?
              </p>
              <div className="flex gap-3 w-full mt-4">
                <button 
                  onClick={() => setMemberToDelete(null)}
                  className="flex-1 py-3 px-4 font-body font-semibold text-xs uppercase tracking-wider rounded-xl border border-outline-variant/30 hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteMember}
                  className="flex-1 py-3 px-4 font-body font-semibold text-xs uppercase tracking-wider rounded-xl bg-error text-white shadow-sm hover:bg-error/80 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </main>
  );
};

export default Admin;


