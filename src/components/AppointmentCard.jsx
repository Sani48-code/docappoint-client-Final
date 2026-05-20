import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function AppointmentCard({ doctor }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleView = () => {
    if (!user) {
      toast.error('Please login to view doctor details');
      navigate('/login');
      return;
    }
    navigate(`/doctors/${doctor._id}`);
  };

  return (
    <div className="bg-white rounded-2xl border-l-4 border-l-accent border border-slate-100 p-5 hover:shadow-lg hover:shadow-cyan-100/50 transition-all duration-300 group">
      <div className="flex gap-4">
        {/* Photo */}
        <div className="shrink-0">
          <img
            src={doctor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=0EA5E9&color=fff&size=80`}
            alt={doctor.name}
            className="w-16 h-16 rounded-xl object-cover border-2 border-slate-100 group-hover:border-accent/30 transition-all"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-800 text-base leading-tight truncate">{doctor.name}</h3>
              <span className="inline-block mt-1 bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                {doctor.specialty}
              </span>
            </div>
            <span className="shrink-0 font-bold text-accent text-sm">${doctor.fee}</span>
          </div>

          <p className="text-slate-500 text-xs mt-2 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {doctor.hospital}
          </p>

          {/* Availability pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {(doctor.availability || ['Mon', 'Wed', 'Fri']).slice(0, 3).map((slot) => (
              <span key={slot} className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full font-medium">
                {slot}
              </span>
            ))}
            {(doctor.availability || []).length > 3 && (
              <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">
                +{doctor.availability.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleView}
          className="px-4 py-2 text-sm font-semibold text-accent border border-accent/30 rounded-xl hover:bg-accent hover:text-white transition-all duration-200"
        >
          View Details →
        </button>
      </div>
    </div>
  );
}
