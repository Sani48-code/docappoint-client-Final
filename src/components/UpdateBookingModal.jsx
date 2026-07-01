import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function UpdateBookingModal({ booking, onClose }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      doctorName: booking?.doctorName || '',
      email: booking?.userEmail || '',
      patientName: booking?.patientName || '',
      phone: booking?.phone || '',
      date: booking?.appointmentDate || '',
      time: booking?.appointmentTime || '',
    },
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/bookings/${booking._id}`, {
        patientName: data.patientName,
        phone: data.phone,
        appointmentDate: data.date,
        appointmentTime: data.time,
      });
      toast.success('Booking updated successfully!');
      queryClient.invalidateQueries(['bookings']);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold text-xl">Update Booking</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            {/* Read-only */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Doctor</label>
                <input {...register('doctorName')} readOnly className="input-field bg-slate-50 text-slate-500 cursor-not-allowed text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Email</label>
                <input {...register('email')} readOnly className="input-field bg-slate-50 text-slate-500 cursor-not-allowed text-sm" />
              </div>
            </div>

            {/* Editable */}
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Patient Name *</label>
              <input
                {...register('patientName', { required: 'Required' })}
                className="input-field text-sm"
              />
              {errors.patientName && <p className="text-rose-500 text-xs mt-1">{errors.patientName.message}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Phone *</label>
              <input
                {...register('phone', { required: 'Required' })}
                type="tel"
                className="input-field text-sm"
              />
              {errors.phone && <p className="text-rose-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Date *</label>
                <input
                  {...register('date', { required: 'Required' })}
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field text-sm"
                />
                {errors.date && <p className="text-rose-500 text-xs mt-1">{errors.date.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Time *</label>
                <input
                  {...register('time', { required: 'Required' })}
                  type="time"
                  className="input-field text-sm"
                />
                {errors.time && <p className="text-rose-500 text-xs mt-1">{errors.time.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-60"
            >
              {isSubmitting ? 'Updating...' : 'Save Changes'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
