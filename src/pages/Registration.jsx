import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';
import LoadingState from '../components/ui/LoadingState';

const Registration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState(''); // idle, loading, success, error
  
  const { register, handleSubmit, reset, watch, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
      type_candidature: 'adherent',
      skills: [{ value: '', experience: '' }]
    }
  });
  
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: "skills"
  });

  const typeCandidature = watch('type_candidature');
  const reasonVal = watch('reason') || '';
  
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/recruitment/settings/');
        setIsOpen(res.data.is_recruitment_open || res.data.phase === 'ouvert');
      } catch (err) {
        console.error('Failed to fetch recruitment status:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const onSubmit = async (data) => {
    setStatus('loading');
    try {
      // Concatenate skills into a comma-separated string mapping value and experience
      const competences = data.skills
        .filter(skill => skill.value.trim().length > 0)
        .map(skill => `${skill.value.trim()} (${skill.experience})`)
        .join(', ');

      const payload = {
        type_candidature: data.type_candidature,
        prenom: data.fullName.split(' ')[0] || data.fullName,
        nom: data.fullName.split(' ').slice(1).join(' ') || '.', 
        email: data.email,
        departement: data.fieldOfStudy,
        niveau_etude: data.yearOfStudy,
        motivation: data.reason,
      };

      if (data.type_candidature === 'actif') {
        payload.github_url = data.github_url || '';
        payload.linkedin_url = data.linkedin_url || '';
        payload.portfolio_url = data.portfolio_url || '';
        payload.competences = competences;
      }

      await api.post('/recruitment/candidatures/', payload);
      setStatus('success');
      reset();
      setTimeout(() => {
        setStatus('idle');
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Failed to submit application:', error.response?.data || error);
      if (error.response?.data?.email && Array.isArray(error.response.data.email)) {
          setErrorMessage(error.response.data.email[0]);
      } else {
          setErrorMessage('Failed to submit application. Please check your fields and try again.');
      }
      setStatus('error');
      setTimeout(() => {
          setStatus('idle');
          setErrorMessage('');
      }, 5000);
    }
  };

  if (loading) {
    return (
      <main className="flex-grow flex flex-col justify-center relative w-full pt-16 bg-background font-body items-center min-h-[60vh]">
        <LoadingState variant="Dots" showPercentage={false} />
  
      {status === 'success' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col items-center max-w-md w-full shadow-2xl text-center transform scale-100 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h2 className="font-display font-bold text-2xl text-black mb-3">Application Submitted!</h2>
            <p className="font-body text-on-surface-variant text-base mb-8">
              Thank you for applying to MIRAI Club. We will review your application and get back to you soon.
            </p>
            <div className="w-6 h-6 border-2 border-green-600/30 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        </div>
      )}

    </main>
    );
  }

  return (
    <main className="flex-grow flex flex-col justify-start relative w-full pt-16 bg-background font-body">
      <Helmet>
        <title>{t("recruitment")} | Mirai Club</title>
      </Helmet>

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-24 pt-24 md:pt-32 pb-16 flex flex-col items-center relative z-10 gap-4">
        <div className="w-full flex flex-col items-center mb-12 sm:mb-16 px-2 text-center relative" ref={containerRef}>
          <span className="font-accent font-semibold text-xs text-[#9D4EDD] uppercase tracking-wider mb-3 sm:mb-4">{t('recruitment_tag')}</span>
          <h1 className="text-black mb-4 sm:mb-6 font-display font-bold text-4xl sm:text-5xl lg:text-7xl tracking-tight">{t('recruitment_title')}</h1>
          <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {t('recruitment_desc')}
          </p>
        </div>
        
        {isOpen ? (
          <div className="w-full max-w-2xl bg-white border border-outline-variant/30 rounded-2xl p-6 sm:p-8 md:p-12 flex flex-col items-center shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6" noValidate>


              {/* Type of Application as Real Buttons */}
              <div className="flex flex-col gap-3 pb-6 border-b border-outline-variant/30">
                <label className="font-body font-semibold text-sm text-black">
                  {(t('form_type') || 'Application Type *').replace('*', '')}
                  <span className="text-red-500 text-base ml-1">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => setValue('type_candidature', 'adherent')}
                    className={`flex-1 py-4 px-6 rounded-xl border-2 font-semibold text-sm transition-all ${
                      typeCandidature === 'adherent' 
                        ? 'border-[#9D4EDD] bg-[#9D4EDD]/5 text-[#9D4EDD]' 
                        : 'border-outline-variant/30 bg-transparent text-on-surface-variant hover:border-outline-variant/60'
                    }`}
                    disabled={status === 'loading'}
                  >
                    {t('form_type_adherent') || 'Adherent'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue('type_candidature', 'actif')}
                    className={`flex-1 py-4 px-6 rounded-xl border-2 font-semibold text-sm transition-all ${
                      typeCandidature === 'actif' 
                        ? 'border-[#9D4EDD] bg-[#9D4EDD]/5 text-[#9D4EDD]' 
                        : 'border-outline-variant/30 bg-transparent text-on-surface-variant hover:border-outline-variant/60'
                    }`}
                    disabled={status === 'loading'}
                  >
                    {t('form_type_actif') || 'Active Member'}
                  </button>
                </div>
                  
                  <div className="mt-3 text-sm leading-relaxed text-on-surface-variant bg-[#9D4EDD]/5 p-4 rounded-xl border border-[#9D4EDD]/20 animate-in fade-in slide-in-from-top-1">
                    <span className="material-symbols-outlined text-[18px] float-left mr-2 mt-0.5 text-[#9D4EDD]">lightbulb</span>
                    <strong className="mr-1">
                      {typeCandidature === 'adherent' 
                        ? (t('form_type_adherent') || 'Adherent') + ':'
                        : (t('form_type_actif') || 'Active Member') + ':'}
                    </strong>
                    {typeCandidature === 'adherent' ? (
                      t('form_note_adherent', "Less commitment than an active member. You can attend our events and participate in our public activities.")
                    ) : (
                      t('form_note_actif', "Requires more commitment. You will be meeting and discussing with the members, planning projects, sharing your thoughts, and gaining full access to internal club operations.")
                    )}
                  </div>
              </div>

              {/* Base Information (For Both) */}
              <div className="flex flex-col gap-2 mt-2">
                <label>{(t('form_name') || 'Name *').replace('*', '')}<span className="text-red-500 text-base ml-1">*</span></label>
                <input {...register("fullName", { required: true })} type="text" className={`w-full bg-surface-container-low border ${errors.fullName ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50`} disabled={status === 'loading'} />
              </div>

              <div className="flex flex-col gap-2">
                <label>{(t('form_uni_email') || 'University Email *').replace('*', '')}<span className="text-red-500 text-base ml-1">*</span></label>
                <input {...register("email", { required: true })} type="email" className={`w-full bg-surface-container-low border ${errors.email ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50`} disabled={status === 'loading'} />
              </div>
              

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-2 flex-1">
                  <label>{(t('form_major') || 'Major *').replace('*', '')}<span className="text-red-500 text-base ml-1">*</span></label>
                  <input {...register("fieldOfStudy", { required: true })} type="text" className={`w-full bg-surface-container-low border ${errors.fieldOfStudy ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50`} disabled={status === 'loading'} />
                </div>

                <div className="flex flex-col gap-2 md:w-1/3">
                  <label>{(t('form_year') || 'Year *').replace('*', '')}<span className="text-red-500 text-base ml-1">*</span></label>
                  <select {...register("yearOfStudy", { required: true })} dir="ltr" className={`w-full bg-surface-container-low border ${errors.yearOfStudy ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50`} disabled={status === 'loading'}>
                    <option value="">--</option>
                    <option value="Licence 1">Licence 1</option>
                    <option value="Licence 2">Licence 2</option>
                    <option value="Licence 3">Licence 3</option>
                    <option value="Master 1">Master 1</option>
                    <option value="Master 2">Master 2</option>
                    <option value="Doctorat">Doctorat</option>
                  </select>
                </div>
              </div>

              {/* Additional Information for Active Members */}
              {typeCandidature === 'actif' && (
                <div className="flex flex-col gap-6 mt-4 pt-6 border-t border-outline-variant/30 animate-in fade-in slide-in-from-top-4 duration-500">
                  <h3 className="font-display font-semibold text-lg text-black">
                    {t('form_type_actif') || 'Active Member Details'}
                  </h3>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-2 flex-1">
                      <label>{(t('form_github') || 'GitHub URL *').replace('*', '')}<span className="text-red-500 text-base ml-1">*</span></label>
                      <input {...register("github_url", { required: true })} type="url" placeholder="https://github.com/..." className={`w-full bg-surface-container-low border ${errors.github_url ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50`} disabled={status === 'loading'} />
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                      <label>{(t('form_linkedin') || 'LinkedIn URL').replace('*', '')}</label>
                      <input {...register("linkedin_url")} type="url" placeholder="https://linkedin.com/in/..." className={`w-full bg-surface-container-low border ${errors.linkedin_url ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50`} disabled={status === 'loading'} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>{(t('form_portfolio') || 'Portfolio URL')}</label>
                    <input {...register("portfolio_url")} type="url" placeholder="https://my-portfolio.com" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50" disabled={status === 'loading'} />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="flex items-center justify-between">
                      <span>{(t('form_competences') || 'Technical Skills *').replace('*', '')}<span className="text-red-500 text-base ml-1">*</span></span>
                      <span className="text-xs text-on-surface-variant font-medium">({skillFields.length}/5)</span>
                    </label>
                    
                    {skillFields.map((field, index) => (
                      <div key={field.id} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center animate-in fade-in slide-in-from-top-1 duration-200">
                        <input
                          {...register(`skills.${index}.value`, { required: true })}
                          type="text"
                          placeholder={index === 0 ? "e.g. React" : "Add another skill"}
                          className={`flex-1 w-full sm:w-auto bg-surface-container-low border ${errors.skills?.[index]?.value ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50`}
                          disabled={status === 'loading'}
                        />
                        <select
                          {...register(`skills.${index}.experience`, { required: true })}
                          className={`w-full sm:w-48 bg-surface-container-low border ${errors.skills?.[index]?.experience ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50`}
                          disabled={status === 'loading'}
                        >
                          <option value="">Exp. Level *</option>
                          <option value="Beginner">{t('form_experience_beginner') || 'Beginner'}</option>
                          <option value="Intermediate">{t('form_experience_intermediate') || 'Intermediate'}</option>
                          <option value="Advanced">{t('form_experience_advanced') || 'Advanced'}</option>
                        </select>
                        {skillFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="w-12 h-12 flex items-center justify-center rounded-xl bg-error/10 text-error hover:bg-error/20 transition-colors shrink-0"
                            title="Remove skill"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        )}
                      </div>
                    ))}
                    
                    {skillFields.length < 5 && (
                      <button
                        type="button"
                        onClick={() => appendSkill({ value: '', experience: '' })}
                        className="w-fit flex items-center gap-2 text-sm font-semibold text-[#9D4EDD] hover:opacity-80 transition-opacity mt-1"
                      >
                        <span className="material-symbols-outlined text-[18px]">add_circle</span>
                        Add Skill
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Placed at the very end as requested */}
              <div className="flex flex-col gap-2 mt-4 pt-6 border-t border-outline-variant/30">
                <label>{(t('form_why') || 'Why do you want to join MIRAI Club? *').replace('*', '')}<span className="text-red-500 text-base ml-1">*</span></label>
                <textarea {...register("reason", { required: true })} rows="4" className={`w-full bg-surface-container-low border ${errors.reason ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all resize-none disabled:opacity-50`} disabled={status === 'loading'}></textarea>
              </div>

              {/* Warning Note */}
              <div className="bg-[#fff8e1] border border-[#ffe082] text-[#8f6a00] p-4 rounded-xl flex items-start gap-3 mt-2 shadow-sm">
                <span className="material-symbols-outlined shrink-0 text-[#ffb300]">warning</span>
                <p className="font-body text-sm font-medium leading-relaxed">
                  <strong className="block mb-1 text-[#664d00]">{t('form_warning_title') || 'Warning!'}</strong>
                  <br />
                  {t('form_warning_desc') || 'Please fill out all fields accurately.'}
                </p>
              </div>

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 mt-2 animate-in fade-in">
                  <span className="material-symbols-outlined">error</span>
                  {errorMessage}
                </div>
              )}

              <button type="submit" disabled={status === 'loading'} className="mt-4 bg-[#9D4EDD] text-white px-8 py-4 font-body font-semibold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 transition-opacity shadow-sm flex justify-center items-center gap-2 disabled:opacity-70">
                {status === 'loading' ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (t('form_submit') || 'Submit Application')}
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-white border border-outline-variant/30 rounded-2xl p-8 md:p-16 flex flex-col items-center shadow-sm">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-black mb-4 text-center tracking-tight">{t('app_closed_title')}</h2>
            <p className="font-body text-base text-on-surface-variant text-center mb-8 max-w-md leading-relaxed">
              {t('app_closed_desc')}
            </p>
            <a href="mailto:contact@mirai-club.dz" className="bg-[#9D4EDD] text-white px-8 py-3.5 font-body font-semibold text-xs uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity shadow-sm">
              CONTACT US
            </a>
          </div>
        )}
      </div>

      {status === 'success' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col items-center max-w-md w-full shadow-2xl text-center transform scale-100 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h2 className="font-display font-bold text-2xl text-black mb-3">Application Submitted!</h2>
            <p className="font-body text-on-surface-variant text-base mb-8">
              Thank you for applying to MIRAI Club. We will review your application and get back to you soon.
            </p>
            <div className="w-6 h-6 border-2 border-green-600/30 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        </div>
      )}

    </main>
  );
};

export default Registration;
