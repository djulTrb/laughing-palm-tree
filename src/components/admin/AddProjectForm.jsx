import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../lib/api';

export default function AddProjectForm({ onProjectAdded }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  
  const titleVal = watch("title", "");
  const catVal = watch("category", "");
  const descVal = watch("description", "");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        title: data.title,
        description: data.description,
        category: data.category,
        link: data.link || ''
      };
      const res = await api.post('/website/projects/', payload);
      onProjectAdded(res.data);
      reset();
    } catch (err) {
      console.error(err);
      alert('Failed to add project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-outline-variant/30 pb-8" noValidate>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Project Name</label>
          <span className="text-xs text-on-surface-variant/60">{titleVal?.length || 0}/30</span>
        </div>
        <input 
          {...register("title", { 
            required: "Project name is required",
            maxLength: { value: 30, message: "Max 30 characters allowed" }
          })}
          maxLength={30}
          className={`w-full bg-surface-container-low border ${errors.title ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all`} 
          placeholder="Enter project name" 
          type="text" 
        />
        {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Category</label>
          <span className="text-xs text-on-surface-variant/60">{catVal?.length || 0}/25</span>
        </div>
        <input 
          {...register("category", { 
            required: "Category is required",
            maxLength: { value: 25, message: "Max 25 characters allowed" }
          })}
          maxLength={25}
          className={`w-full bg-surface-container-low border ${errors.category ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all`} 
          placeholder="e.g. Web Development" 
          type="text" 
        />
        {errors.category && <span className="text-red-500 text-xs">{errors.category.message}</span>}
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <div className="flex justify-between items-center">
          <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Description</label>
          <span className="text-xs text-on-surface-variant/60">{descVal?.length || 0}/100</span>
        </div>
        <textarea 
          {...register("description", { 
            required: "Description is required",
            maxLength: { value: 100, message: "Max 100 characters allowed" }
          })}
          maxLength={100}
          className={`w-full bg-surface-container-low border ${errors.description ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all resize-none`} 
          placeholder="Describe the project..." 
          rows="3"
        ></textarea>
        {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant">Project Link (Optional)</label>
        <input 
          {...register("link", { 
            pattern: { value: /^https?:\/\/.+/, message: "Must be a valid URL" }
          })}
          className={`w-full bg-surface-container-low border ${errors.link ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all`} 
          placeholder="https://github.com/..." 
          type="url" 
        />
        {errors.link && <span className="text-red-500 text-xs">{errors.link.message}</span>}
      </div>

      <div className="md:col-span-2">
        <button disabled={loading} type="submit" className="bg-[#9D4EDD] text-white hover:opacity-90 px-8 py-3.5 font-body font-semibold text-xs uppercase tracking-wider rounded-xl  transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Adding...' : 'Add Project'}
        </button>
      </div>
    </form>
  );
}
