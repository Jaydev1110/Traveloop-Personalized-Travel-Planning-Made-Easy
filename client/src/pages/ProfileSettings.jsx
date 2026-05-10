import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { User, Mail, MapPin, Phone, Lock, Save, Camera, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function ProfileSettings() {
  const { user: authUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    country: '',
    phone: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get('/profile');
      const data = res.data;
      setFormData(prev => ({
        ...prev,
        name: data.name || '',
        email: data.email || '',
        city: data.city || '',
        country: data.country || '',
        phone: data.phone || ''
      }));
    } catch (err) {
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      setSaving(true);
      const loadingToast = toast.loading('Updating profile...');
      await api.put('/profile', {
        name: formData.name,
        email: formData.email,
        city: formData.city,
        country: formData.country,
        phone: formData.phone,
        newPassword: formData.newPassword || undefined
      });
      toast.success('Profile updated successfully!', { id: loadingToast });
      setFormData(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 dark:bg-stone-900">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-20 pt-8 dark:bg-stone-900 font-sans text-stone-900 dark:text-stone-100">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Account Settings</h1>
            <p className="mt-2 text-stone-500 dark:text-stone-400">Manage your profile, preferences, and security.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            Account Secure
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/40 dark:border-stone-800 dark:bg-stone-800 dark:shadow-none"
          >
            <div className="border-b border-stone-100 bg-stone-50/50 px-6 py-4 dark:border-stone-700 dark:bg-stone-800/50">
              <h2 className="text-lg font-bold">Personal Information</h2>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="mb-8 flex items-center gap-6">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-stone-100 bg-stone-200 dark:border-stone-700 dark:bg-stone-600">
                  {authUser?.photo ? (
                    <img
                      src={authUser.photo.startsWith('http') ? authUser.photo : `http://localhost:5000/${authUser.photo}`}
                      alt="Profile"
                      className="h-full w-full object-cover"
                      onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser?.name || 'User')}&background=random`; }}
                    />
                  ) : (
                    <User className="absolute inset-0 m-auto h-12 w-12 text-stone-400" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100 cursor-pointer">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{formData.name || 'Traveler'}</h3>
                  <p className="text-stone-500 dark:text-stone-400">{formData.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700 dark:text-stone-300">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                      <User className="h-5 w-5" />
                    </div>
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 py-2.5 pl-10 pr-4 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-stone-600 dark:bg-stone-900/50 dark:focus:border-blue-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700 dark:text-stone-300">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 py-2.5 pl-10 pr-4 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-stone-600 dark:bg-stone-900/50 dark:focus:border-blue-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700 dark:text-stone-300">City</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <input 
                      type="text" name="city" value={formData.city} onChange={handleChange} placeholder="E.g. New York"
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 py-2.5 pl-10 pr-4 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-stone-600 dark:bg-stone-900/50 dark:focus:border-blue-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700 dark:text-stone-300">Country</label>
                  <input 
                    type="text" name="country" value={formData.country} onChange={handleChange} placeholder="E.g. USA"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 py-2.5 px-4 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-stone-600 dark:bg-stone-900/50 dark:focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700 dark:text-stone-300">Phone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                      <Phone className="h-5 w-5" />
                    </div>
                    <input 
                      type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890"
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 py-2.5 pl-10 pr-4 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-stone-600 dark:bg-stone-900/50 dark:focus:border-blue-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/40 dark:border-stone-800 dark:bg-stone-800 dark:shadow-none"
          >
            <div className="border-b border-stone-100 bg-stone-50/50 px-6 py-4 dark:border-stone-700 dark:bg-stone-800/50">
              <h2 className="text-lg font-bold text-red-600 dark:text-red-400">Security</h2>
            </div>
            <div className="p-6 md:p-8">
              <p className="mb-4 text-sm text-stone-500 dark:text-stone-400">Leave blank if you do not want to change your password.</p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700 dark:text-stone-300">New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input 
                      type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="••••••••"
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 py-2.5 pl-10 pr-4 outline-none transition-all focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 dark:border-stone-600 dark:bg-stone-900/50 dark:focus:border-red-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700 dark:text-stone-300">Confirm New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input 
                      type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••"
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 py-2.5 pl-10 pr-4 outline-none transition-all focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 dark:border-stone-600 dark:bg-stone-900/50 dark:focus:border-red-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={saving}
              className="flex items-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 font-bold text-white shadow-xl transition-all hover:scale-105 hover:bg-stone-800 active:scale-95 disabled:opacity-70 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
            >
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
