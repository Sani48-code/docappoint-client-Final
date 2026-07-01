import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { FaTimes } from 'react-icons/fa';

export default function BookingModal({ doctor, onClose }) {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      patientName: user?.name || '',
      email: user?.email || '',
      doctorName: doctor?.name || '',
      gender: '',
      phone: '',
      date: '',
      time: '',
    },
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        userEmail: user.email,
        doctorName: data.doctorName,
        patientName: data.patientName,
        gender: data.gender,
        phone: data.phone,
        appointmentDate: data.date,
        appointmentTime: data.time,
        doctorId: doctor._id,
        fee: doctor.fee,
      });
      toast.success('Appointment booked successfully!');
      reset();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-5 sticky top-0">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold text-xl">Book Appointment</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            {/* Doctor summary */}
            <div className="flex items-center gap-3 mt-4 bg-white/10 rounded-xl p-3">
              <img
                src={doctor?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor?.name)}&background=fff&color=0EA5E9&size=60`}
                alt={doctor?.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-white/30"
              />
              <div>
                <p className="text-white font-semibold text-sm">{doctor?.name}</p>
                <p className="text-white/70 text-xs">{doctor?.specialty} · ${doctor?.fee} fee</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-4">
            {/* Read-only fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Doctor</label>
                <input
                  {...register('doctorName')}
                  readOnly
                  className="input-field bg-slate-50 text-slate-500 cursor-not-allowed text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Your Email</label>
                <input
                  {...register('email')}
                  readOnly
                  className="input-field bg-slate-50 text-slate-500 cursor-not-allowed text-sm"
                />
              </div>
            </div>

            {/* Patient Name */}
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Patient Name *</label>
              <input
                {...register('patientName', { required: 'Patient name is required' })}
                placeholder="Full name"
                className="input-field text-sm"
              />
              {errors.patientName && <p className="text-rose-500 text-xs mt-1">{errors.patientName.message}</p>}
            </div>

            {/* Gender + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Gender *</label>
                <select {...register('gender', { required: 'Required' })} className="input-field text-sm">
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-rose-500 text-xs mt-1">{errors.gender.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Phone *</label>
                <input
                  {...register('phone', {
                    required: 'Phone is required',
                    pattern: { value: /^[0-9+\-\s()]{7,15}$/, message: 'Invalid phone' },
                  })}
                  type="tel"
                  placeholder="+1 234 567 890"
                  className="input-field text-sm"
                />
                {errors.phone && <p className="text-rose-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Date *</label>
                <input
                  {...register('date', { required: 'Date is required' })}
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field text-sm"
                />
                {errors.date && <p className="text-rose-500 text-xs mt-1">{errors.date.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Time *</label>
                <select {...register('time', { required: 'Time is required' })} className="input-field text-sm">
                  <option value="">Select slot</option>
                  {(doctor?.availability || ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']).map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                {errors.time && <p className="text-rose-500 text-xs mt-1">{errors.time.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
