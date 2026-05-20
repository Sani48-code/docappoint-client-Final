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

const FALLBACK_DOCTORS = {
  '1': { _id: '1', name: 'Dr. Sarah Wilson', specialty: 'Cardiologist', hospital: 'City Heart Institute', fee: 120, experience: 12, rating: 4.9, location: 'New York, NY', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80', availability: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'], description: 'Dr. Sarah Wilson is a board-certified cardiologist with 12 years of experience treating complex heart conditions. She completed her fellowship at Johns Hopkins Hospital and specializes in preventive cardiology, heart failure management, and advanced echocardiography. Dr. Wilson is known for her patient-first approach and comprehensive treatment plans.' },
  '2': { _id: '2', name: 'Dr. James Chen', specialty: 'Neurologist', hospital: 'NeuroCore Medical', fee: 150, experience: 15, rating: 4.8, location: 'Los Angeles, CA', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80', availability: ['10:00 AM', '1:00 PM', '4:00 PM'], description: 'Dr. James Chen is a leading neurologist specializing in movement disorders, epilepsy, and neurodegenerative diseases. With 15 years of clinical experience and over 80 published research papers, he brings cutting-edge knowledge to patient care. He trained at UCSF and has received multiple excellence awards in neurology.' },
  '3': { _id: '3', name: 'Dr. Emily Ross', specialty: 'Pediatrician', hospital: "Children's Health Hub", fee: 90, experience: 8, rating: 4.7, location: 'Chicago, IL', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80', availability: ['9:00 AM', '11:30 AM', '3:00 PM', '5:00 PM'], description: "Dr. Emily Ross is a compassionate pediatrician dedicated to the health and wellbeing of children from birth through adolescence. She holds certifications in pediatric emergency medicine and developmental pediatrics. Parents appreciate her warm communication style and thorough approach to child healthcare." },
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-5 h-5 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
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

  const { data: doctor, isLoading } = useQuery({
    queryKey: ['doctor', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/doctors/${id}`);
      return res.data;
    },
    retry: false,
    placeholderData: FALLBACK_DOCTORS[id] || FALLBACK_DOCTORS['1'],
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
  if (!doctor) return <div className="text-center py-20 text-slate-500">Doctor not found.</div>;

  const displayDoctor = (doctor && doctor._id) ? doctor : (FALLBACK_DOCTORS[id] || FALLBACK_DOCTORS['1']);

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
                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
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
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {displayDoctor.hospital}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={displayDoctor.rating} />
              </div>

              <p className="text-white/60 flex items-center gap-2 mb-6">
                <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
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
