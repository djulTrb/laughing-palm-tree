import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import api from '../services/api';

const AddMember = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError('');
    try {
      // Create member payload with generated UUID
      const payload = {
        uuid: uuidv4(),
        prenom: data.prenom,
        nom: data.nom,
        poste: data.poste,
        skills: data.skills || '',
        linkedin: data.linkedin || '',
        github: data.github || '',
        photo_url: data.photo_url || '',
        ordre_affichage: parseInt(data.ordre_affichage) || 0
      };

      await api.post('/team/', payload);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setServerError(err.response?.data?.detail || 'Failed to add member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-12 font-body flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-surface-container rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display font-bold text-3xl text-black">Add New Member</h1>
          <button onClick={() => navigate('/admin')} className="text-on-surface-variant hover:text-black transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>
        </div>

        {serverError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
            <span className="material-symbols-outlined">error</span>
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">First Name *</label>
              <input 
                {...register('prenom', { required: 'First name is required' })}
                className={w-full bg-surface-variant border  rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors} 
                placeholder="e.g. John" 
              />
              {errors.prenom && <span className="text-red-500 text-xs mt-1">{errors.prenom.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Last Name *</label>
              <input 
                {...register('nom', { required: 'Last name is required' })}
                className={w-full bg-surface-variant border  rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors} 
                placeholder="e.g. Doe" 
              />
              {errors.nom && <span className="text-red-500 text-xs mt-1">{errors.nom.message}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Role / Position *</label>
            <input 
              {...register('poste', { required: 'Role is required' })}
              className={w-full bg-surface-variant border  rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors} 
              placeholder="e.g. Developer" 
            />
            {errors.poste && <span className="text-red-500 text-xs mt-1">{errors.poste.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Skills (max 2, comma separated)</label>
            <input 
              {...register('skills')}
              className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors" 
              placeholder="e.g. React, Figma" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">LinkedIn URL</label>
              <input 
                type="url"
                {...register('linkedin')}
                className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors" 
                placeholder="https://linkedin.com/in/..." 
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">GitHub URL</label>
              <input 
                type="url"
                {...register('github')}
                className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors" 
                placeholder="https://github.com/..." 
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Photo URL</label>
            <input 
              type="url"
              {...register('photo_url')}
              className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors" 
              placeholder="https://example.com/photo.jpg" 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Display Order</label>
            <input 
              type="number"
              defaultValue={0}
              {...register('ordre_affichage')}
              className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors" 
            />
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-outline-variant/30">
            <button 
              type="button" 
              onClick={() => navigate('/admin')}
              className="px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-on-surface-variant hover:bg-surface-variant transition-colors border border-outline-variant/30"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider bg-[#9D4EDD] text-white hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center min-w-[140px] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Add Member'
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddMember;
