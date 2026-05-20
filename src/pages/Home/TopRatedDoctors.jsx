import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DoctorCard from '../../components/DoctorCard';
import SkeletonCard from '../../components/SkeletonCard';

export default function TopRatedDoctors() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 80 });
  }, []);

  const { data: doctors, isLoading, isError } = useQuery({
    queryKey: ['top-doctors'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/doctors?top=true`);
      return res.data;
    },
    retry: false,
  });

  const displayDoctors = doctors?.slice(0, 3) || [];

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
        {isError ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-sm">Unable to load doctors right now. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {isLoading
              ? [1, 2, 3].map((n) => <SkeletonCard key={n} />)
              : displayDoctors.length === 0
              ? (
                <div className="col-span-3 text-center py-12">
                  <p className="text-slate-400 text-sm">No top-rated doctors available right now.</p>
                </div>
              )
              : displayDoctors.map((doctor, i) => (
                <div key={doctor._id} data-aos="fade-up" data-aos-delay={i * 120}>
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
          </div>
        )}

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
