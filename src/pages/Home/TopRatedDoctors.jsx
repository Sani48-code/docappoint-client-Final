import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DoctorCard from '../../components/DoctorCard';
import SkeletonCard from '../../components/SkeletonCard';

const FALLBACK_DOCTORS = [
  { _id: '1', name: 'Dr. Sarah Wilson', specialty: 'Cardiologist', hospital: 'City Heart Institute', fee: 120, experience: 12, rating: 4.9, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80', availability: ['9:00 AM', '11:00 AM', '2:00 PM'] },
  { _id: '2', name: 'Dr. James Chen', specialty: 'Neurologist', hospital: 'NeuroCore Medical', fee: 150, experience: 15, rating: 4.8, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80', availability: ['10:00 AM', '1:00 PM', '4:00 PM'] },
  { _id: '3', name: 'Dr. Emily Ross', specialty: 'Pediatrician', hospital: 'Children\'s Health Hub', fee: 90, experience: 8, rating: 4.7, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80', availability: ['9:00 AM', '11:30 AM', '3:00 PM'] },
];

export default function TopRatedDoctors() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 80 });
  }, []);

  const { data: doctors, isLoading } = useQuery({
    queryKey: ['top-doctors'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/doctors?top=true`);
      return res.data;
    },
    retry: false,
    placeholderData: FALLBACK_DOCTORS,
  });

  const displayDoctors = (doctors && doctors.length > 0) ? doctors.slice(0, 3) : FALLBACK_DOCTORS;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="section-label">Top Rated</span>
          <h2 className="section-title text-dark mb-4">
            Meet Our Expert Doctors
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
            Carefully selected specialists with proven track records of excellence. Only doctors with 4.5+ ratings appear here.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {isLoading
            ? [1, 2, 3].map((n) => <SkeletonCard key={n} />)
            : displayDoctors.map((doctor, i) => (
              <div key={doctor._id} data-aos="fade-up" data-aos-delay={i * 120}>
                <DoctorCard doctor={doctor} />
              </div>
            ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="200">
          <Link
            to="/appointments"
            className="inline-flex items-center gap-2 btn-primary px-8 py-3.5 text-base"
          >
            View All Doctors
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
