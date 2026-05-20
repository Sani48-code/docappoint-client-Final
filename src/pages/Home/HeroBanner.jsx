import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slides = [
  {
    specialty: 'Cardiology',
    tagline: 'Heart & Vascular Care',
    desc: 'Expert cardiologists for comprehensive heart health management.',
    color: 'from-rose-500/20',
  },
  {
    specialty: 'Neurology',
    tagline: 'Brain & Nervous System',
    desc: 'Advanced neurological care with cutting-edge diagnostics.',
    color: 'from-violet-500/20',
  },
  {
    specialty: 'Pediatrics',
    tagline: 'Child Health Specialists',
    desc: 'Compassionate care for your little ones from birth to adolescence.',
    color: 'from-emerald-500/20',
  },
];

const stats = [
  { value: 1200, label: 'Doctors', suffix: '+' },
  { value: 50, label: 'Patients', suffix: 'K+' },
  { value: 40, label: 'Specialties', suffix: '+' },
];

function useCounter(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

function StatCard({ value, label, suffix, animate }) {
  const count = useCounter(value, 1800, animate);
  return (
    <div className="text-center">
      <div className="text-2xl lg:text-3xl font-bold text-white">
        {count}{suffix}
      </div>
      <div className="text-white/50 text-xs font-medium mt-0.5">{label}</div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function HeroBanner() {
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0A0F2C]">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6,182,212,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />

      {/* Swiper background slides */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          className="h-full"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} to-transparent opacity-30`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
              <span className="bg-accent/10 border border-accent/30 text-accent text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Trusted by 50,000+ Patients
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] mb-6">
              Modern Doctor
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-cyan-300 bg-clip-text text-transparent">
                Appointment
              </span>
              <br />
              Booking
            </motion.h1>

            <motion.p variants={itemVariants} className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
              Connect with top-rated specialists instantly. Book appointments online, manage your health records, and get expert care — all in one place.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
              <Link
                to="/appointments"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white font-bold px-7 py-4 rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 hover:-translate-y-1 text-base"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment
              </Link>
              <Link
                to="/appointments"
                className="inline-flex items-center gap-2 border-2 border-white/20 hover:border-accent text-white hover:text-accent font-bold px-7 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 text-base"
              >
                Browse Doctors
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={itemVariants} className="flex items-center gap-8 pt-6 border-t border-white/10">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} animate={animateStats} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Floating UI Cards */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Doctor image placeholder with glow */}
            <div className="relative">
              <div className="w-80 h-96 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 border border-accent/20 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=80"
                  alt="Doctor"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating card: Rating */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-8 bg-white rounded-2xl shadow-2xl p-3 flex items-center gap-3 min-w-[160px]"
              >
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-sm">4.9 / 5.0</div>
                  <div className="text-slate-500 text-xs">Patient Rating</div>
                </div>
              </motion.div>

              {/* Floating card: Available */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -right-6 bg-white rounded-2xl shadow-2xl p-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-600 font-bold text-xs">Available Now</span>
                </div>
                <div className="text-slate-700 font-semibold text-sm">Dr. Sarah Wilson</div>
                <div className="text-slate-500 text-xs">Cardiologist</div>
              </motion.div>

              {/* Floating: Next appointment */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 -right-10 -translate-y-1/2 bg-[#0A0F2C] border border-accent/20 rounded-2xl shadow-2xl p-3 min-w-[140px]"
              >
                <div className="text-accent text-xs font-semibold mb-1">Next Slot</div>
                <div className="text-white font-bold text-sm">Today, 2:00 PM</div>
                <div className="text-white/50 text-xs">3 slots left</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
