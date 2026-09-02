import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PageTitleBlob from '../components/ui/PageTitleBlob';
import api from '../lib/api';

const AdminAuth = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle');

  const onSubmit = async (data) => {
    setStatus('loading');
    try {
      await api.post('/accounts/login/', {
        username: data.username,
        password: data.password
      });
      setStatus('success');
      // Let the session cookie handle the state. Redirect to admin.
      navigate('/admin');
    } catch (error) {
      console.error(error);
      setStatus('idle');
      setError('root.serverError', {
        type: 'server',
        message: error.response?.data?.detail || "Login failed. Please check your credentials."
      });
    }
  };

  return (
    <main className="flex-grow flex flex-col justify-start relative w-full pt-16 bg-background font-body">
      <div className="max-w-[800px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-24 pt-24 md:pt-32 pb-16 relative z-10">
        <div className="w-full flex flex-col items-center mb-12 sm:mb-16 px-2 text-center relative">
          <PageTitleBlob />
          <span className="font-accent font-semibold text-xs text-[#9D4EDD] uppercase tracking-wider mb-3 sm:mb-4">Portal</span>
          <h1 className="text-black mb-4 sm:mb-6 font-display font-bold text-4xl sm:text-5xl lg:text-7xl tracking-tight">Admin Login</h1>
          <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Secure access for Mirai Club administrators.
          </p>
        </div>
          
        <div className="bg-white border border-outline-variant/30 p-6 md:p-12 rounded-2xl shadow-sm mx-auto w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            
            {errors.root?.serverError && (
              <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-red-500">error</span>
                <p className="font-body text-sm font-medium">{errors.root.serverError.message}</p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="font-body font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Username<span className="text-red-500 text-base ml-1">*</span></label>
              <input 
                {...register("username", { required: "Username is required" })}
                type="text" 
                className={`w-full bg-surface-container-low border ${errors.username ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50`} 
                disabled={status === 'loading'} 
              />
              {errors.username && <span className="text-red-500 text-xs font-semibold">{errors.username.message}</span>}
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-body font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Password<span className="text-red-500 text-base ml-1">*</span></label>
              <input 
                {...register("password", { required: "Password is required" })}
                type="password" 
                className={`w-full bg-surface-container-low border ${errors.password ? 'border-red-500' : 'border-outline-variant/30'} rounded-xl px-4 py-3 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all disabled:opacity-50`} 
                disabled={status === 'loading'} 
              />
              {errors.password && <span className="text-red-500 text-xs font-semibold">{errors.password.message}</span>}
            </div>
            
            <button type="submit" disabled={status === 'loading'} className="bg-[#9D4EDD] text-white font-body font-semibold text-xs uppercase tracking-wider py-4 rounded-xl hover:opacity-90 transition-opacity mt-4 shadow-sm w-full flex justify-center items-center gap-2 disabled:opacity-70">
              {status === 'loading' ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : 'Login to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminAuth;
