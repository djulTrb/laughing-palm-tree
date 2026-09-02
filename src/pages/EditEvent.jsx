import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../lib/api';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}/`);
        const event = res.data;
        // Map backend French fields back to frontend English fields for the form
        reset({
          title: event.titre,
          snippet: event.description, 
          details: event.details,
          location: event.lieu,
          image: event.photo_url || event.image || '',
          deadline: event.deadline ? event.deadline.split('T')[0] : ''
        });
      } catch (err) {
        console.error(err);
        setServerError('Failed to load event details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError('');
    try {
      // Create event payload mapping frontend English fields back to backend French keys
      const payload = {
        titre: data.title,
        description: data.snippet,
        details: data.details,
        lieu: data.location,
        photo_url: data.image || '',
        deadline: data.deadline || null
      };

      await api.put(`/events/${id}/`, payload);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setServerError(err.response?.data?.detail || 'Failed to update event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
        await api.delete(`/events/${id}/`);
        navigate('/admin');
    } catch (err) {
        console.error(err);
        setServerError('Failed to delete event.');
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-background pt-24 pb-12 flex items-center justify-center font-body"><div className="w-8 h-8 border-4 border-[#9D4EDD]/30 border-t-[#9D4EDD] rounded-full animate-spin"></div></div>;
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-12 font-body flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-surface-container rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display font-bold text-3xl text-black">Edit Event</h1>
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
          <div className="flex flex-col gap-1.5">
            <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Event Name *</label>
            <input 
              {...register('title', { required: 'Event name is required' })}
              className={`w-full bg-surface-variant border ${errors.title ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors`} 
            />
            {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Short Snippet *</label>
            <textarea 
              rows={2}
              {...register('snippet', { required: 'Snippet is required' })}
              className={`w-full bg-surface-variant border ${errors.snippet ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors resize-none`} 
            ></textarea>
            {errors.snippet && <span className="text-red-500 text-xs mt-1">{errors.snippet.message}</span>}
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Full Details</label>
            <textarea 
              rows={4}
              {...register('details')}
              className={`w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors resize-none`} 
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Location *</label>
              <input 
                {...register('location', { required: 'Location is required' })}
                className={`w-full bg-surface-variant border ${errors.location ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors`} 
              />
              {errors.location && <span className="text-red-500 text-xs mt-1">{errors.location.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Deadline</label>
              <input 
                type="date"
                {...register('deadline')}
                className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body font-semibold text-xs uppercase tracking-wider text-black">Image URL</label>
            <input 
              type="url"
              {...register('image')}
              className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] transition-colors" 
              placeholder="https://example.com/image.jpg" 
            />
          </div>

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-outline-variant/30">
            <button 
                type="button" 
                onClick={handleDelete}
                className="px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-error bg-error/10 hover:bg-error/20 transition-colors border border-transparent"
              >
                Delete Event
            </button>
            <div className="flex gap-3">
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
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditEvent;
