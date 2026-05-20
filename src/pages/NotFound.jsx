import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 – Page Not Found | DocAppoint</title>
      </Helmet>
      <div className="min-h-screen bg-[#0A0F2C] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6,182,212,0.4) 1px, transparent 0)`, backgroundSize: '40px 40px' }}
        />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative text-center max-w-lg">
          {/* Animated 404 */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            className="relative mb-8"
          >
            <div className="text-[160px] font-black leading-none select-none"
              style={{
                background: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 50%, rgba(14,165,233,0.2) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              404
            </div>

            {/* Animated stethoscope icon */}
            <motion.div
              animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-cyan-500/40">
                <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-white text-3xl font-black mb-3">Oops! Page Not Found</h1>
            <p className="text-white/50 text-base mb-10 max-w-sm mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Let's get you back to good health — and the right page.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go Home
              </Link>
              <Link
                to="/appointments"
                className="inline-flex items-center gap-2 border-2 border-white/20 hover:border-accent text-white/80 hover:text-accent font-semibold px-8 py-4 rounded-2xl transition-all duration-300"
              >
                Browse Doctors
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
