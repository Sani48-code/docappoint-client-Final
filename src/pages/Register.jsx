import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

function PasswordStrength({ password }) {
  const checks = [
    { label: 'Uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'Lowercase letter', ok: /[a-z]/.test(password) },
    { label: 'Min 6 characters', ok: password.length >= 6 },
  ];
  const strength = checks.filter((c) => c.ok).length;
  const colors = ['bg-rose-400', 'bg-amber-400', 'bg-emerald-400'];
  const labels = ['Weak', 'Fair', 'Strong'];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${i < strength ? colors[strength - 1] : 'bg-slate-200'}`} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
        <span className={`text-xs font-medium ${strength === 3 ? 'text-emerald-500' : strength === 2 ? 'text-amber-500' : 'text-rose-500'}`}>
          {labels[strength - 1] || 'Too weak'}
        </span>
        {checks.map((c) => (
          <span key={c.label} className={`text-xs ${c.ok ? 'text-emerald-500' : 'text-slate-400'}`}>
            {c.ok ? '✓' : '✗'} {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

const formVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [watchedPassword, setWatchedPassword] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch('password', '');

  const onSubmit = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password, data.photoURL);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Register – DocAppoint</title>
      </Helmet>
      <div className="min-h-screen grid lg:grid-cols-2">
        {/* Right form first on mobile, left panel hidden on small */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#0A0F2C] to-[#0F1A35] p-12 relative overflow-hidden order-2 lg:order-1">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6,182,212,0.4) 1px, transparent 0)`, backgroundSize: '35px 35px' }}
          />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[80px]" />

          <div className="relative">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-white font-bold text-xl">Doc<span className="text-gradient">Appoint</span></span>
            </Link>
          </div>

          <div className="relative text-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/20 mx-auto mb-8 flex items-center justify-center">
              <svg className="w-24 h-24 text-accent/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-white text-3xl font-black mb-3">Start Your Health<br />Journey Today</h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
              Create a free account and access the best healthcare professionals in your area.
            </p>
          </div>

          <div className="relative space-y-3">
            {['Free account, no credit card required', 'Access to 1,200+ verified doctors', 'Manage all bookings in one place'].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/70 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form panel */}
        <div className="flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-white order-1 lg:order-2 min-h-screen lg:min-h-0">
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-slate-800 text-2xl sm:text-3xl font-black mb-2">Create Account</h1>
              <p className="text-slate-500 mb-6 sm:mb-8">Join DocAppoint — it's free and takes 30 seconds</p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <motion.div variants={itemVariants}>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2 block">Full Name</label>
                <input
                  {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name too short' } })}
                  placeholder="John Doe"
                  className="input-field"
                />
                {errors.name && <p className="text-rose-500 text-xs mt-1.5">{errors.name.message}</p>}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2 block">Email Address</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                  })}
                  type="email"
                  placeholder="you@example.com"
                  className="input-field"
                />
                {errors.email && <p className="text-rose-500 text-xs mt-1.5">{errors.email.message}</p>}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2 block">Photo URL <span className="text-slate-400 normal-case font-normal">(optional)</span></label>
                <input
                  {...register('photoURL')}
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="input-field"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2 block">Password</label>
                <div className="relative">
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Minimum 6 characters' },
                      validate: {
                        hasUpper: (v) => /[A-Z]/.test(v) || 'Must include an uppercase letter',
                        hasLower: (v) => /[a-z]/.test(v) || 'Must include a lowercase letter',
                      },
                    })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    className="input-field pr-11"
                    onChange={(e) => setWatchedPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" : "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                    </svg>
                  </button>
                </div>
                {errors.password && <p className="text-rose-500 text-xs mt-1.5">{errors.password.message}</p>}
                <PasswordStrength password={password || watchedPassword} />
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-60 mt-2"
              >
                {isSubmitting ? 'Creating account...' : 'Create Free Account'}
              </motion.button>
            </form>

            <motion.p variants={itemVariants} className="text-center text-sm text-slate-500 mt-8">
              Already have an account?{' '}
              <Link to="/login" className="text-accent font-semibold hover:underline">
                Sign in
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
