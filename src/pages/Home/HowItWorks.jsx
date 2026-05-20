import { useEffect } from 'react';
import AOS from 'aos';
import { FaSearch, FaCalendarAlt, FaHeartbeat, FaArrowRight } from 'react-icons/fa';

const steps = [
  {
    number: '01',
    title: 'Search a Doctor',
    desc: 'Browse our curated list of top-rated doctors. Filter by specialty, fee, location, and availability.',
    icon: <FaSearch className="text-3xl" />,
    aosAnim: 'fade-right',
  },
  {
    number: '02',
    title: 'Book Appointment',
    desc: 'Select your preferred date and time slot. Fill in patient details and confirm your booking instantly.',
    icon: <FaCalendarAlt className="text-3xl" />,
    aosAnim: 'fade-up',
  },
  {
    number: '03',
    title: 'Get Treatment',
    desc: 'Visit the doctor at the scheduled time. Manage your booking history from your personal dashboard.',
    icon: <FaHeartbeat className="text-3xl" />,
    aosAnim: 'fade-left',
  },
];

export default function HowItWorks() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });
  }, []);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="section-label">Simple Process</span>
          <h2 className="section-title mb-4">How It Works</h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Getting the care you need is easier than ever. Three simple steps to your appointment.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-accent via-primary to-accent opacity-30 z-0" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              data-aos={step.aosAnim}
              data-aos-delay={i * 150}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Big faded step number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[100px] font-black text-accent/5 select-none leading-none pointer-events-none">
                {step.number}
              </div>

              {/* Step circle */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-xl shadow-cyan-500/30 group-hover:shadow-2xl group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:-translate-y-2">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-dark text-white text-xs font-black flex items-center justify-center">
                  {i + 1}
                </div>
              </div>

              <h3 className="text-slate-800 font-bold text-xl mb-3">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-dark to-[#0F1A35] p-8 md:p-12 text-center"
        >
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6,182,212,0.5) 1px, transparent 0)`,
              backgroundSize: '30px 30px',
            }}
          />
          <div className="relative">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Ready to get started?</p>
            <h3 className="text-white text-3xl md:text-4xl font-black mb-4">
              Book Your Appointment <span className="text-gradient">Today</span>
            </h3>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              Join thousands of patients who trust DocAppoint for their healthcare needs.
            </p>
            <a
              href="/appointments"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              Get Started — It's Free
              <FaArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
