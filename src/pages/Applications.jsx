import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../lib/api';

export default function Applications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await api.get('/recruitment/candidatures/');
        setApplications(data.filter(app => app.statut === 'en_attente'));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleAction = async (app, actionType) => {
    try {
      if (actionType === 'accepte') {
        await api.patch(`/recruitment/candidatures/${app.id}/statut/`, { statut: 'accepte' });
      } else if (actionType === 'delete') {
        await api.delete(`/recruitment/candidatures/${app.id}/`);
      }
      setApplications(applications.filter(a => a.id !== app.id));
      setSelectedApp(null);
    } catch (err) {
      console.error(err);
      alert('Action failed.');
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  };

  return (
    <main className="flex-grow flex flex-col justify-start relative w-full pt-16 bg-background font-body min-h-screen">
      <Helmet>
        <title>Manage Applications | Mirai Admin</title>
      </Helmet>
      
      <div className="max-w-[1000px] mx-auto w-full px-4 sm:px-6 md:px-12 py-12 flex flex-col">
        <button onClick={() => navigate('/admin')} className="w-fit mb-8 flex items-center gap-2 text-on-surface-variant hover:text-[#9D4EDD] transition-colors font-semibold text-sm uppercase tracking-wider">
          <span className="material-symbols-outlined text-xl">arrow_back</span> Back to Admin
        </button>

        <h1 className="font-display font-bold text-3xl sm:text-4xl text-black mb-8">Pending Applications</h1>

        {loading ? (
          <p>Loading...</p>
        ) : applications.length === 0 ? (
          <p className="text-on-surface-variant">No pending applications.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {applications.map(app => (
              <div 
                key={app.id} 
                onClick={() => setSelectedApp(app)}
                className="bg-surface-container border border-outline-variant/30 rounded-2xl p-6 flex justify-between items-center cursor-pointer hover:bg-surface-container-high transition-colors shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${app.type_candidature === 'actif' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {app.type_candidature === 'actif' ? 'Active Member' : 'Adherent'}
                  </span>
                  <div>
                    <h3 className="font-bold text-lg">{app.prenom} {app.nom}</h3>
                    <p className="text-sm text-on-surface-variant">{formatDate(app.date_candidature)}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl">
            <div className="p-6 md:p-8 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block ${selectedApp.type_candidature === 'actif' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {selectedApp.type_candidature === 'actif' ? 'Active Member' : 'Adherent'}
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl">{selectedApp.prenom} {selectedApp.nom}</h2>
                  <p className="text-on-surface-variant text-sm mt-1">{formatDate(selectedApp.date_candidature)}</p>
                </div>
                <button onClick={() => setSelectedApp(null)} className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center hover:bg-outline-variant/30 transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-8">
                <div><strong className="block text-on-surface-variant text-xs uppercase tracking-wider mb-1">Email</strong> {selectedApp.email}</div>
                <div><strong className="block text-on-surface-variant text-xs uppercase tracking-wider mb-1">Field of Study</strong> {selectedApp.departement}</div>
                <div><strong className="block text-on-surface-variant text-xs uppercase tracking-wider mb-1">Year</strong> {selectedApp.niveau_etude}</div>
                
                {selectedApp.type_candidature === 'actif' && (
                  <>
                    <div className="md:col-span-2"><strong className="block text-on-surface-variant text-xs uppercase tracking-wider mb-1">Technical Skills</strong> {selectedApp.competences || '-'}</div>
                    <div className="md:col-span-2 flex flex-col gap-2">
                      <strong className="block text-on-surface-variant text-xs uppercase tracking-wider">Links</strong>
                      {selectedApp.github_url && <a href={selectedApp.github_url} target="_blank" rel="noreferrer" className="text-[#9D4EDD] hover:underline">GitHub</a>}
                      {selectedApp.linkedin_url && <a href={selectedApp.linkedin_url} target="_blank" rel="noreferrer" className="text-[#9D4EDD] hover:underline">LinkedIn</a>}
                      {selectedApp.portfolio_url && <a href={selectedApp.portfolio_url} target="_blank" rel="noreferrer" className="text-[#9D4EDD] hover:underline">Portfolio</a>}
                    </div>
                  </>
                )}
              </div>

              <div className="mb-6">
                <strong className="block text-on-surface-variant text-xs uppercase tracking-wider mb-2">Motivation</strong>
                <p className="bg-surface-container-low p-4 rounded-xl leading-relaxed whitespace-pre-wrap">{selectedApp.motivation}</p>
              </div>
            </div>
            
            <div className="p-6 bg-surface-container-low border-t border-outline-variant/30 flex gap-4 justify-end rounded-b-3xl">
              {selectedApp.type_candidature === 'adherent' ? (
                <>
                  <button onClick={() => handleAction(selectedApp, 'delete')} className="px-6 py-3 rounded-xl font-bold text-sm text-error bg-error/10 hover:bg-error/20 transition-colors uppercase tracking-wider">
                    Reject
                  </button>
                  <button onClick={() => handleAction(selectedApp, 'accepte')} className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#9D4EDD] hover:opacity-90 transition-opacity uppercase tracking-wider shadow-md">
                    Accept
                  </button>
                </>
              ) : (
                <button onClick={() => handleAction(selectedApp, 'delete')} className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#9D4EDD] hover:opacity-90 transition-opacity uppercase tracking-wider shadow-md">
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
