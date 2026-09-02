import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import api from '../../lib/api';

export default function AddResourceForm({ onResourceAdded }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  
  const [selectedFile, setSelectedFile] = useState(null);
  const titleVal = watch("title", "");
  const descVal = watch("description", "");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('titre', data.title);
      formData.append('description', data.description);
      formData.append('categorie', data.category);
      
      if (selectedFile) {
        formData.append('fichier', selectedFile);
      } else if (data.link) {
        formData.append('lien_fichier', data.link);
      }

      const res = await api.post('/resources/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onResourceAdded(res.data);
      reset();
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      alert('Failed to add resource');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6" noValidate>
      <div className="flex flex-col gap-2 md:col-span-2">
        <div className="flex justify-between items-center">
          <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">
            {t("admin_resource_title", "Resource Title")}
          </label>
          <span className="text-xs text-on-surface-variant/60">{titleVal?.length || 0}/32</span>
        </div>
        <input 
          {...register("title", { 
            required: "Resource title is required",
            maxLength: { value: 32, message: "Max 32 characters allowed" }
          })}
          maxLength={32}
          className={`w-full bg-surface-container-low border ${errors.title ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all`} 
          placeholder={t("admin_resource_title_ph", "Enter resource title (e.g. ML Cheat Sheet)")} 
          type="text" 
        />
        {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <div className="flex justify-between items-center">
          <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">
            {t("admin_resource_desc", "Description")}
          </label>
          <span className="text-xs text-on-surface-variant/60">{descVal?.length || 0}/85</span>
        </div>
        <textarea 
          {...register("description", { 
            required: "Description is required",
            maxLength: { value: 85, message: "Max 85 characters allowed" }
          })}
          maxLength={85}
          className={`w-full bg-surface-container-low border ${errors.description ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all resize-none`} 
          placeholder={t("admin_resource_desc_ph", "Enter description...")} 
          rows="2"
        ></textarea>
        {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Category</label>
        <select 
          {...register("category", { required: "Category is required" })}
          className={`w-full bg-surface-container-low border ${errors.category ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all`}
        >
          <option value="pdf">PDF</option>
          <option value="support_cours">Support de cours</option>
          <option value="tutoriel">Tutoriel</option>
          <option value="presentation">PrAcsentation</option>
          <option value="lien_utile">Lien utile</option>
        </select>
        {errors.category && <span className="text-red-500 text-xs">{errors.category.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">
          Resource Link (Optional)
        </label>
        <input 
          {...register("link", { 
            pattern: { value: /^https?:\/\/.+/, message: "Must be a valid URL" }
          })}
          className={`w-full bg-surface-container-low border ${errors.link ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all`} 
          placeholder="https://..." 
          type="url" 
        />
        {errors.link && <span className="text-red-500 text-xs">{errors.link.message}</span>}
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">
          Or Upload Resource File
        </label>
        <input 
          type="file" 
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#9D4EDD] file:text-white hover:file:bg-[#9D4EDD]/80" 
        />
      </div>

      <div className="md:col-span-2 mt-4">
        <button disabled={loading} type="submit" className="bg-[#9D4EDD] text-white hover:opacity-90 px-8 py-3.5 font-body font-semibold text-xs uppercase tracking-wider rounded-xl  transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Adding...' : t("admin_resource_add", "Add")}
        </button>
      </div>
    </form>
  );
}
