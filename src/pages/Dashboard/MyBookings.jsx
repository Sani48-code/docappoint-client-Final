import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import UpdateBookingModal from '../../components/UpdateBookingModal';
import toast from 'react-hot-toast';

const statusColors = {
  Confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Pending: 'bg-amber-100 text-amber-700 border-amber-200',
  Cancelled: 'bg-rose-100 text-rose-700 border-rose-200',
};

export default function MyBookings() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [updateTarget, setUpdateTarget] = useState(null);
  const undoTimers = useRef({});

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings?email=${user?.email}`);
      return res.data;
    },
    retry: false,
    enabled: !!user?.email,
  });

  const displayBookings = bookings || [];

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`${import.meta.env.VITE_API_URL}/api/bookings/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['bookings']),
  });

  const handleDelete = (booking) => {
    const id = booking._id;
    queryClient.setQueryData(['bookings', user?.email], (old) =>
      (old || []).filter((b) => b._id !== id)
    );

    const toastId = toast(
      (t) => (
        <div className="flex items-center gap-3">
          <span className="text-sm">Booking deleted</span>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              clearTimeout(undoTimers.current[id]);
              queryClient.invalidateQueries(['bookings']);
            }}
            className="text-xs font-bold text-accent border border-accent/30 px-2 py-0.5 rounded-lg hover:bg-accent/10"
          >
            Undo
          </button>
        </div>
      ),
      { duration: 3000 }
    );

    undoTimers.current[id] = setTimeout(async () => {
      toast.dismiss(toastId);
      try {
        await deleteMutation.mutateAsync(id);
      } catch {
        queryClient.invalidateQueries(['bookings']);
        toast.error('Delete failed');
      }
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white rounded-2xl p-5 animate-pulse">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!displayBookings.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
          <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-slate-700 font-bold text-xl mb-2">No bookings yet</h3>
        <p className="text-slate-500 text-sm mb-6">Find a doctor and book your first appointment</p>
        <a href="/appointments" className="btn-primary">Browse Doctors</a>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-slate-800 font-black text-2xl">My Bookings</h2>
          <p className="text-slate-500 text-sm mt-0.5">{displayBookings.length} appointment{displayBookings.length !== 1 ? 's' : ''}</p>
        </div>
        <a href="/appointments" className="btn-primary text-sm py-2 px-5">
          + New Booking
        </a>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['Doctor', 'Patient', 'Date & Time', 'Fee', 'Status', 'Actions'].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <AnimatePresence>
              {displayBookings.map((booking) => (
                <motion.tr
                  key={booking._id}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{booking.doctorName}</div>
                      <div className="text-slate-500 text-xs">{booking.specialty || 'Specialist'}</div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-700 text-sm">{booking.patientName}</td>
                  <td className="px-5 py-4">
                    <div className="text-slate-800 text-sm font-medium">{new Date(booking.appointmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    <div className="text-slate-500 text-xs">{booking.appointmentTime}</div>
                  </td>
                  <td className="px-5 py-4 text-slate-800 font-bold text-sm">${booking.fee || '—'}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusColors[booking.status] || statusColors.Pending}`}>
                      {booking.status || 'Pending'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setUpdateTarget(booking)}
                        className="px-3 py-1.5 text-xs font-semibold text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(booking)}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-500 border border-rose-200 rounded-lg hover:bg-rose-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {displayBookings.map((booking) => (
          <div key={booking._id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-bold text-slate-800">{booking.doctorName}</div>
                <div className="text-slate-500 text-xs">{booking.specialty}</div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusColors[booking.status] || statusColors.Pending}`}>
                {booking.status || 'Pending'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <div>
                <div className="text-slate-400 text-xs">Patient</div>
                <div className="text-slate-700 font-medium">{booking.patientName}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs">Date</div>
                <div className="text-slate-700 font-medium">{new Date(booking.appointmentDate).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs">Time</div>
                <div className="text-slate-700 font-medium">{booking.appointmentTime}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs">Fee</div>
                <div className="text-accent font-bold">${booking.fee || '—'}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setUpdateTarget(booking)} className="flex-1 py-2 text-sm font-semibold text-primary border border-primary/30 rounded-xl hover:bg-primary/10 transition-colors">
                Update
              </button>
              <button onClick={() => handleDelete(booking)} className="flex-1 py-2 text-sm font-semibold text-rose-500 border border-rose-200 rounded-xl hover:bg-rose-50 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {updateTarget && (
        <UpdateBookingModal booking={updateTarget} onClose={() => setUpdateTarget(null)} />
      )}
    </div>
  );
}
