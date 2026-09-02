import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import api from '../../lib/api';

export default function AddGalleryForm({ onGalleryAdded }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post('/gallery/albums/', { titre: data.title });
      onGalleryAdded(res.data);
      reset();
    } catch (err) {
      console.error(err);
      alert('Failed to add gallery album');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-outline-variant/30 pb-8" noValidate>
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">
          {t("admin_gallery_group", "Group Title")}
        </label>
        <input 
          {...register("title", { required: "Group title is required" })}
          className={`w-full bg-surface-container-low border ${errors.title ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all`} 
          placeholder={t("admin_gallery_group_ph", "Enter group title (e.g. Workshop 2024)")} 
          type="text" 
        />
        {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
      </div>

      <div className="md:col-span-2">
        <button disabled={loading} type="submit" className="bg-[#9D4EDD] text-white hover:opacity-90 px-8 py-3.5 font-body font-semibold text-xs uppercase tracking-wider rounded-xl  transition-colors shadow-sm disabled:opacity-50">
          {loading ? 'Adding...' : t("admin_gallery_add", "Add Album")}
        </button>
      </div>
    </form>
  );
}
