import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEnvelope, FaTimes } from 'react-icons/fa';

export default function MyProfile() {
  const { user, updateUser } = useAuth();
  const [editOpen, setEditOpen] = useState(false);

  const { data: bookingsData } = useQuery({
    queryKey: ['bookings-count', user?.email],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings?email=${user?.email}`);
      return res.data;
    },
    retry: false,
    placeholderData: [],
  });

  const totalBookings = bookingsData?.length || 0;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    defaultValues: { name: user?.name || '', photoURL: user?.photoURL || '' },
  });

  const onSubmit = async (data) => {
    try {
      updateUser({ name: data.name, photoURL: data.photoURL });
      toast.success('Profile updated successfully!');
      setEditOpen(false);
    } catch {
      toast.error('Update failed');
    }
  };

  const handleOpen = () => {
    reset({ name: user?.name || '', photoURL: user?.photoURL || '' });
    setEditOpen(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Header gradient */}
        <div className="bg-gradient-to-r from-[#0A0F2C] to-[#0F1A35] h-28 relative">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6,182,212,0.4) 1px, transparent 0)`, backgroundSize: '25px 25px' }}
          />
        </div>

        {/* Avatar */}
        <div className="px-4 sm:px-8 pb-6 sm:pb-8">
          <div className="relative -mt-14 mb-5 flex items-end justify-between">
            <div className="relative">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-xl"
                />
              ) : (
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-black text-4xl border-4 border-white shadow-xl">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white" />
            </div>
            <button
              onClick={handleOpen}
              className="btn-primary text-sm py-2.5 px-5"
            >
              Edit Profile
            </button>
          </div>

          <h2 className="text-slate-800 font-black text-xl sm:text-2xl mb-1 break-words">{user?.name}</h2>
          <p className="text-slate-500 text-sm flex items-center gap-2 mb-5 sm:mb-6 break-all">
            <FaEnvelope className="text-base" />
            {user?.email}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
            {[
              { label: 'Total Bookings', value: totalBookings, icon: '📅' },
              { label: 'Member Since', value: '2026', icon: '🗓️' },
              { label: 'Status', value: 'Active', icon: '✅' },
            ].map((stat) => (
              <div key={stat.label} className="bg-slate-50 border border-slate-100 rounded-xl p-2 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl mb-1">{stat.icon}</div>
                <div className="text-slate-800 font-black text-sm sm:text-lg">{stat.value}</div>
                <div className="text-slate-400 text-[10px] sm:text-xs leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Info rows */}
          <div className="space-y-3">
            {[
              { label: 'Display Name', value: user?.name },
              { label: 'Email Address', value: user?.email },
              { label: 'Account Type', value: 'Patient' },
            ].map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-4 py-3 border-b border-slate-100 last:border-0">
                <span className="text-slate-400 text-sm shrink-0">{row.label}</span>
                <span className="text-slate-700 font-medium text-sm text-right break-all">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setEditOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary to-accent p-5 flex items-center justify-between">
                <h3 className="text-white font-bold text-lg">Edit Profile</h3>
                <button onClick={() => setEditOpen(false)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white">
                  <FaTimes className="text-sm" />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5 block">Display Name</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="input-field"
                  />
                  {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5 block">Photo URL</label>
                  <input
                    {...register('photoURL')}
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    className="input-field"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-60"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
