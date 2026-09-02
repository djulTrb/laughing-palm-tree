import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { Helmet } from 'react-helmet-async';

export default function Adherents() {
  const navigate = useNavigate();
  const [adherents, setAdherents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdherents = async () => {
      try {
        const { data } = await api.get('/recruitment/candidatures/');
        // AdhAcrents who have been accepted
        setAdherents(data.filter(app => app.statut === 'accepte' && app.type_candidature === 'adherent'));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdherents();
  }, []);

  return (
    <main className="flex-grow flex flex-col justify-start relative w-full pt-16 bg-background font-body min-h-screen">
      <Helmet>
        <title>Adherent List | Mirai Admin</title>
      </Helmet>
      
      <div className="max-w-[1000px] mx-auto w-full px-4 sm:px-6 md:px-12 py-12 flex flex-col">
        <button onClick={() => navigate('/admin')} className="w-fit mb-8 flex items-center gap-2 text-on-surface-variant hover:text-[#9D4EDD] transition-colors font-semibold text-sm uppercase tracking-wider">
          <span className="material-symbols-outlined text-xl">arrow_back</span> Back to Admin
        </button>

        <h1 className="font-display font-bold text-3xl sm:text-4xl text-black mb-8">Adherent List</h1>

        {loading ? (
          <p>Loading...</p>
        ) : adherents.length === 0 ? (
          <p className="text-on-surface-variant">No accepted adherents found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {adherents.map(ad => (
              <div 
                key={ad.id} 
                className="bg-surface-container border border-outline-variant/30 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 sm:gap-6 shadow-sm hover:shadow transition-shadow"
              >
                <div className="flex flex-col gap-1 w-full sm:w-auto">
                  <h3 className="font-bold text-lg text-black">{ad.prenom} {ad.nom}</h3>
                  <p className="text-sm text-on-surface-variant break-all">{ad.email}</p>
                  <p className="text-sm text-on-surface-variant font-medium">{ad.departement} <span className="opacity-70 font-normal">({ad.niveau_etude})</span></p>
                </div>
                <a 
                  href={`mailto:${ad.email}`}
                  className="w-full sm:w-auto justify-center px-6 py-3 sm:py-2.5 bg-[#9D4EDD]/10 text-[#9D4EDD] rounded-xl font-semibold text-sm hover:bg-[#9D4EDD]/20 transition-colors flex items-center gap-2 border border-[#9D4EDD]/20 shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  Contact
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
