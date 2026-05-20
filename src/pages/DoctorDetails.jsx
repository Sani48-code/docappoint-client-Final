import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import BookingModal from '../components/BookingModal';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';
import { FaStar, FaHospitalAlt, FaMapMarkerAlt } from 'react-icons/fa';


function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar key={star} className={`text-lg ${star <= Math.round(rating) ? 'text-amber-400' : 'text-slate-300'}`} />
      ))}
      <span className="text-slate-600 font-semibold ml-1">{rating?.toFixed(1)}</span>
    </div>
  );
}

export default function DoctorDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { data: doctor, isLoading, isError } = useQuery({
    queryKey: ['doctor', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/doctors/${id}`);
      return res.data;
    },
    retry: false,
  });

  const handleBooking = () => {
    if (!user) {
      toast.error('Please login to book an appointment');
      navigate('/login');
      return;
    }
    setShowModal(true);
  };

  if (isLoading) return <Spinner />;
  if (isError || !doctor) return <div className="text-center py-20 text-slate-500">Doctor not found.</div>;

  const displayDoctor = doctor;

  return (
    <>
      <Helmet>
        <title>{displayDoctor.name} – DocAppoint</title>
        <meta name="description" content={`Book an appointment with ${displayDoctor.name}, ${displayDoctor.specialty} at ${displayDoctor.hospital}`} />
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A0F2C] to-[#0F1A35] py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6,182,212,0.4) 1px, transparent 0)`, backgroundSize: '35px 35px' }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                <div className="w-72 h-80 lg:w-80 lg:h-96 rounded-3xl overflow-hidden border-2 border-accent/30 shadow-2xl shadow-accent/20">
                  <img src={displayDoctor.image} alt={displayDoctor.name} className="w-full h-full object-cover object-top" />
                </div>
                {/* Rating overlay */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center">
                    <FaStar className="text-amber-500 text-sm" />
                  </div>
                  <div>
                    <div className="font-black text-slate-800 text-sm leading-none">{displayDoctor.rating}</div>
                    <div className="text-slate-500 text-xs">Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="bg-accent/10 border border-accent/30 text-accent text-xs font-bold px-4 py-1.5 rounded-full mb-4 inline-block">
                {displayDoctor.specialty}
              </span>
              <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">{displayDoctor.name}</h1>
              <p className="text-white/60 mb-4 flex items-center gap-2">
                <FaHospitalAlt className="text-accent text-base" />
                {displayDoctor.hospital}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={displayDoctor.rating} />
              </div>

              <p className="text-white/60 flex items-center gap-2 mb-6">
                <FaMapMarkerAlt className="text-accent text-base shrink-0" />
                {displayDoctor.location || 'United States'}
              </p>

              {/* Availability slots */}
              <div className="mb-6">
                <p className="text-white/60 text-sm font-semibold mb-3">Available Time Slots</p>
                <div className="flex flex-wrap gap-2">
                  {(displayDoctor.availability || ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']).map((slot) => (
                    <span key={slot} className="border border-accent/40 text-accent text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-accent hover:text-white transition-colors cursor-default">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>

              {/* Consultation fee */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-accent/10 border border-accent/20 rounded-xl px-5 py-3">
                  <div className="text-accent text-xs font-semibold mb-0.5">Consultation Fee</div>
                  <div className="text-white font-black text-2xl">${displayDoctor.fee}</div>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-semibold">Accepting patients</span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="w-full sm:w-auto btn-primary px-10 py-4 text-base font-bold"
              >
                Book Appointment Now
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Details section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Experience', value: `${displayDoctor.experience} Years`, icon: '🏆' },
            { label: 'Hospital', value: displayDoctor.hospital, icon: '🏥' },
            { label: 'Location', value: displayDoctor.location || 'United States', icon: '📍' },
            { label: 'Consult Fee', value: `$${displayDoctor.fee}`, icon: '💳' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md hover:border-accent/30 transition-all">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">{stat.label}</div>
              <div className="text-slate-800 font-bold text-sm">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-slate-800 font-black text-xl mb-4">About {displayDoctor.name}</h2>
          <p className="text-slate-600 leading-relaxed">{displayDoctor.description || 'A highly experienced and dedicated specialist committed to providing the highest quality of patient care.'}</p>
        </div>

        {/* Mobile booking button */}
        <div className="lg:hidden">
          <button
            onClick={handleBooking}
            className="w-full btn-primary py-4 text-base font-bold"
          >
            Book Appointment — ${displayDoctor.fee}
          </button>
        </div>
      </div>

      {showModal && <BookingModal doctor={displayDoctor} onClose={() => setShowModal(false)} />}
    </>
  );
}
