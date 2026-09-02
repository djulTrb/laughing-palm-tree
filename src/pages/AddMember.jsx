import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import api from '../lib/api';

const AddMember = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: { skills: [] }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [skillInput, setSkillInput] = useState('');
  
  const skillsList = watch('skills');

  const addSkill = () => {
    if (skillInput.trim() && skillsList.length < 2) {
      setValue('skills', [...skillsList, skillInput.trim()], { shouldValidate: true });
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    setValue('skills', skillsList.filter((_, i) => i !== index), { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError('');
    try {
      // Extract photo URL from GitHub URL (e.g. https://github.com/djultb -> https://github.com/djultb.png)
      const githubClean = data.github.trim().replace(/\/$/, '');
      const photo_url = `${githubClean}.png`;

      const payload = {
        uuid: uuidv4(),
        prenom: data.prenom,
        nom: data.nom,
        poste: data.poste,
        skills: data.skills.join(', '),
        linkedin: data.linkedin,
        github: data.github,
        photo_url: photo_url,
        ordre_affichage: parseInt(data.ordre_affichage) || 0
      };

      await api.post('/team/', payload);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setServerError(err.response?.data?.detail || t('error_add_member', 'Failed to add member. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-12 font-body flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/30">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display font-bold text-3xl text-black">{t('admin_add_member_title', 'Add New Member')}</h1>
          <button onClick={() => navigate('/admin')} className="text-on-surface-variant hover:text-black transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined">arrow_back</span>
            {t('btn_back', 'Back')}
          </button>
        </div>

        {serverError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
            <span className="material-symbols-outlined">error</span>
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">
                {t('add_member_firstname', 'First Name')} <span className="text-red-500">*</span>
              </label>
              <input 
                {...register('prenom', { required: t('err_req_firstname', 'First name is required') })}
                className={`w-full bg-surface-variant border ${errors.prenom ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors`} 
                placeholder={t('ph_firstname', 'e.g. John')}
              />
              {errors.prenom && <span className="text-red-500 text-xs mt-1">{errors.prenom.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">
                {t('add_member_lastname', 'Last Name')} <span className="text-red-500">*</span>
              </label>
              <input 
                {...register('nom', { required: t('err_req_lastname', 'Last name is required') })}
                className={`w-full bg-surface-variant border ${errors.nom ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors`} 
                placeholder={t('ph_lastname', 'e.g. Doe')}
              />
              {errors.nom && <span className="text-red-500 text-xs mt-1">{errors.nom.message}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">
              {t('add_member_role', 'Role / Position')} <span className="text-red-500">*</span>
            </label>
            <input 
              {...register('poste', { required: t('err_req_role', 'Role is required') })}
              className={`w-full bg-surface-variant border ${errors.poste ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors`} 
              placeholder={t('ph_role', 'e.g. Developer')}
            />
            {errors.poste && <span className="text-red-500 text-xs mt-1">{errors.poste.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">
              {t('add_member_skills', 'Skills')} <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <input 
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                className={`w-full bg-surface-variant border ${errors.skills ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors`} 
                placeholder={t('ph_skills', 'Type a skill and click + (max 2)')}
                disabled={skillsList.length >= 2}
              />
              <button 
                type="button" 
                onClick={addSkill}
                disabled={skillsList.length >= 2 || !skillInput.trim()}
                className="absolute right-2 w-8 h-8 bg-[#9D4EDD] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
            
            {/* Hidden input to register the skills array in react-hook-form */}
            <input 
              type="hidden" 
              {...register('skills', { validate: v => v && v.length > 0 || t('err_req_skills', 'At least one skill is required') })} 
            />
            {errors.skills && <span className="text-red-500 text-xs mt-1">{errors.skills.message}</span>}

            {skillsList.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skillsList.map((s, idx) => (
                  <span key={idx} className="bg-[#9D4EDD]/10 text-[#9D4EDD] px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 border border-[#9D4EDD]/20">
                    {s}
                    <button type="button" onClick={() => removeSkill(idx)} className="hover:text-red-500 transition-colors flex items-center">
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">
                {t('add_member_linkedin', 'LinkedIn URL')} <span className="text-red-500">*</span>
              </label>
              <input 
                type="url"
                {...register('linkedin', { required: t('err_req_linkedin', 'LinkedIn URL is required') })}
                className={`w-full bg-surface-variant border ${errors.linkedin ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors`} 
                placeholder="https://linkedin.com/in/..." 
              />
              {errors.linkedin && <span className="text-red-500 text-xs mt-1">{errors.linkedin.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">
                {t('add_member_github', 'GitHub URL')} <span className="text-red-500">*</span>
              </label>
              <input 
                type="url"
                {...register('github', { required: t('err_req_github', 'GitHub URL is required') })}
                className={`w-full bg-surface-variant border ${errors.github ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors`} 
                placeholder="https://github.com/..." 
              />
              {errors.github && <span className="text-red-500 text-xs mt-1">{errors.github.message}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">
              {t('add_member_order', 'Display Order')} <span className="text-red-500">*</span>
            </label>
            <input 
              type="number"
              {...register('ordre_affichage', { required: t('err_req_order', 'Display order is required') })}
              className={`w-full bg-surface-variant border ${errors.ordre_affichage ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors`} 
            />
            {errors.ordre_affichage && <span className="text-red-500 text-xs mt-1">{errors.ordre_affichage.message}</span>}
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-outline-variant/30">
            <button 
              type="button" 
              onClick={() => navigate('/admin')}
              className="px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-on-surface-variant hover:bg-surface-variant transition-colors border border-outline-variant/30"
            >
              {t('btn_cancel', 'Cancel')}
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider bg-[#9D4EDD] text-white hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center min-w-[140px] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                t('btn_add_member', 'Add Member')
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddMember;
