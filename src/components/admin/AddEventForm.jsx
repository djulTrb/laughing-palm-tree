import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import api from '../../lib/api';
import { v4 as uuidv4 } from 'uuid';

export default function AddEventForm({ onEventAdded }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  
  const titleVal = watch("title", "");
  const snippetVal = watch("snippet", "");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        titre: data.title,
        description: data.snippet,
        details: data.details,
        photo_url: data.image,
        lieu: data.location,
        deadline: data.deadline || null,
        date: data.deadline || new Date().toISOString().split('T')[0],
        uuid: uuidv4()
      };
      const res = await api.post('/events/', payload);
      onEventAdded(res.data);
      reset();
    } catch (err) {
      console.error(err);
      alert('Failed to add event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-outline-variant/30 pb-8" noValidate>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">
            {t("admin_event_name", "Event Name")}
          </label>
          <span className="text-xs text-on-surface-variant/60">{titleVal?.length || 0}/25</span>
        </div>
        <input 
          {...register("title", { 
            required: "Event name is required",
            maxLength: { value: 25, message: "Max 25 characters allowed" }
          })}
          maxLength={25}
          className={`w-full bg-surface-container-low border ${errors.title ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all`} 
          placeholder={t("admin_event_name_ph", "Enter event name")} 
          type="text" 
        />
        {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Image URL</label>
        <input 
          {...register("image", { 
            required: "Image URL is required",
            pattern: { value: /^https?:\/\/.+/, message: "Must be a valid URL" }
          })}
          className={`w-full bg-surface-container-low border ${errors.image ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all`} 
          placeholder="https://..." 
          type="url" 
        />
        {errors.image && <span className="text-red-500 text-xs">{errors.image.message}</span>}
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <div className="flex justify-between items-center">
          <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">
            {t("admin_event_snippet", "Short Snippet")}
          </label>
          <span className="text-xs text-on-surface-variant/60">{snippetVal?.length || 0}/90</span>
        </div>
        <textarea 
          {...register("snippet", { 
            required: "Short snippet is required",
            maxLength: { value: 90, message: "Max 90 characters allowed" }
          })}
          maxLength={90}
          className={`w-full bg-surface-container-low border ${errors.snippet ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all resize-none`} 
          placeholder={t("admin_event_snippet_ph", "Brief summary for the event card...")} 
          rows="2"
        ></textarea>
        {errors.snippet && <span className="text-red-500 text-xs">{errors.snippet.message}</span>}
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">
          {t("admin_event_details", "Full Details")}
        </label>
        <textarea 
          {...register("details", { required: "Full details are required" })}
          className={`w-full bg-surface-container-low border ${errors.details ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all resize-none`} 
          placeholder={t("admin_event_details_ph", "Enter full details here...")} 
          rows="4"
        ></textarea>
        {errors.details && <span className="text-red-500 text-xs">{errors.details.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">
          {t("admin_event_location", "Location")}
        </label>
        <input 
          {...register("location", { required: "Location is required" })}
          className={`w-full bg-surface-container-low border ${errors.location ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all`} 
          placeholder={t("admin_event_location_ph", "Enter location")} 
          type="text" 
        />
        {errors.location && <span className="text-red-500 text-xs">{errors.location.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">
          {t("admin_event_deadline", "Deadline")}
        </label>
        <input 
          {...register("deadline", { required: "Deadline is required" })}
          className={`w-full bg-surface-container-low border ${errors.deadline ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all`} 
          type="date" 
        />
        {errors.deadline && <span className="text-red-500 text-xs">{errors.deadline.message}</span>}
      </div>

      <div className="md:col-span-2">
        <button disabled={loading} type="submit" className="bg-[#9D4EDD] text-white hover:opacity-90 px-8 py-3.5 font-body font-semibold text-xs uppercase tracking-wider rounded-xl  transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Adding...' : t("admin_event_add", "Add Event")}
        </button>
      </div>
    </form>
  );
}
