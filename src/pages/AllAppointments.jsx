import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AOS from 'aos';
import AppointmentCard from '../components/AppointmentCard';
import SkeletonCard from '../components/SkeletonCard';

const FALLBACK_DOCTORS = [
  { _id: '1', name: 'Dr. Sarah Wilson', specialty: 'Cardiologist', hospital: 'City Heart Institute', fee: 120, experience: 12, rating: 4.9, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80', availability: ['Mon', 'Wed', 'Fri'] },
  { _id: '2', name: 'Dr. James Chen', specialty: 'Neurologist', hospital: 'NeuroCore Medical', fee: 150, experience: 15, rating: 4.8, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80', availability: ['Tue', 'Thu'] },
  { _id: '3', name: 'Dr. Emily Ross', specialty: 'Pediatrician', hospital: "Children's Health Hub", fee: 90, experience: 8, rating: 4.7, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80', availability: ['Mon', 'Tue', 'Thu'] },
  { _id: '4', name: 'Dr. Michael Torres', specialty: 'Dermatologist', hospital: 'SkinCare Clinic', fee: 100, experience: 10, rating: 4.6, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80', availability: ['Mon', 'Wed'] },
  { _id: '5', name: 'Dr. Aisha Patel', specialty: 'Orthopedist', hospital: 'Bone & Joint Center', fee: 130, experience: 11, rating: 4.8, image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&q=80', availability: ['Tue', 'Fri'] },
  { _id: '6', name: 'Dr. Robert Kim', specialty: 'Psychiatrist', hospital: 'Mind Wellness Institute', fee: 160, experience: 14, rating: 4.7, image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80', availability: ['Wed', 'Thu', 'Fri'] },
];

export default function AllAppointments() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const { data: doctors, isLoading } = useQuery({
    queryKey: ['all-doctors'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/doctors`);
      return res.data;
    },
    retry: false,
    placeholderData: FALLBACK_DOCTORS,
  });

  const displayDoctors = (doctors && doctors.length > 0) ? doctors : FALLBACK_DOCTORS;

  const filtered = useMemo(() => {
    let list = [...displayDoctors];
    if (search) {
      list = list.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sort === 'fee-asc') list.sort((a, b) => a.fee - b.fee);
    else if (sort === 'fee-desc') list.sort((a, b) => b.fee - a.fee);
    else if (sort === 'exp-desc') list.sort((a, b) => b.experience - a.experience);
    else if (sort === 'rating-desc') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [displayDoctors, search, sort]);

  return (
    <>
      <Helmet>
        <title>All Doctors – DocAppoint</title>
        <meta name="description" content="Browse all available doctors. Filter by specialty, sort by fee or experience." />
      </Helmet>

      {/* Page hero */}
      <div className="bg-[#0A0F2C] pt-10 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6,182,212,0.4) 1px, transparent 0)`, backgroundSize: '35px 35px' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <span className="section-label">Our Specialists</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Find Your <span className="text-gradient">Doctor</span>
          </h1>
          <p className="text-white/50 max-w-lg mx-auto mb-8">
            Browse {displayDoctors.length}+ verified specialists. Use the filters below to narrow your search.
          </p>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or specialty..."
                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="sm:w-48 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-accent transition-colors text-sm appearance-none"
            >
              <option value="" className="bg-dark">Sort by</option>
              <option value="fee-asc" className="bg-dark">Fee: Low → High</option>
              <option value="fee-desc" className="bg-dark">Fee: High → Low</option>
              <option value="exp-desc" className="bg-dark">Most Experienced</option>
              <option value="rating-desc" className="bg-dark">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-accent/10 text-accent font-bold text-sm px-3 py-1 rounded-full">
                {isLoading ? '...' : filtered.length} results
              </span>
              {search && (
                <span className="text-slate-500 text-sm">for "{search}"</span>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard key={n} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-slate-700 font-bold text-xl mb-2">No doctors found</h3>
              <p className="text-slate-500 text-sm mb-6">Try a different name or specialty</p>
              <button
                onClick={() => { setSearch(''); setSort(''); }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((doctor, i) => (
                <div key={doctor._id} data-aos="fade-up" data-aos-delay={i * 50}>
                  <AppointmentCard doctor={doctor} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
