import { useEffect } from 'react';
import AOS from 'aos';
import { FaShieldAlt, FaCalendarCheck, FaBriefcaseMedical, FaLock, FaClock, FaDollarSign } from 'react-icons/fa';

const features = [
  {
    icon: <FaShieldAlt className="text-3xl text-cyan-400" />,
    title: 'Verified Doctors',
    desc: 'Every doctor is thoroughly verified with credentials checked and peer-reviewed ratings.',
  },
  {
    icon: <FaCalendarCheck className="text-3xl text-cyan-400" />,
    title: 'Easy Scheduling',
    desc: 'Book, reschedule, or cancel appointments in seconds. Real-time availability shown.',
  },
  {
    icon: <FaBriefcaseMedical className="text-3xl text-cyan-400" />,
    title: 'All Specialties',
    desc: 'From Cardiology to Pediatrics — over 40 specialties covered under one platform.',
  },
  {
    icon: <FaLock className="text-3xl text-cyan-400" />,
    title: 'Secure & Private',
    desc: 'Your health data is encrypted and protected with enterprise-grade security standards.',
  },
  {
    icon: <FaClock className="text-3xl text-cyan-400" />,
    title: '24/7 Support',
    desc: 'Round-the-clock customer support and emergency booking assistance whenever you need it.',
  },
  {
    icon: <FaDollarSign className="text-3xl text-cyan-400" />,
    title: 'Transparent Fees',
    desc: 'No hidden charges. See consultation fees upfront before booking any appointment.',
  },
];

export default function WhyChooseUs() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });
  }, []);

  return (
    <section className="py-20 bg-[#0A0F2C] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="section-label">Why DocAppoint</span>
          <h2 className="section-title-light mb-4">
            Why Patients Choose Us
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base">
            We combine technology with compassionate care to deliver the best healthcare booking experience.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="group bg-[#0F1A35] border border-white/5 hover:border-accent/30 rounded-2xl p-6 hover:shadow-xl hover:shadow-cyan-900/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-accent/20 flex items-center justify-center text-accent mb-5 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:text-white group-hover:border-transparent transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom stats bar */}
        <div className="mt-12 md:mt-16 bg-gradient-to-r from-primary/10 to-accent/10 border border-accent/20 rounded-2xl p-5 sm:p-8" data-aos="fade-up" data-aos-delay="200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { value: '98%', label: 'Patient Satisfaction' },
              { value: '1,200+', label: 'Verified Doctors' },
              { value: '50K+', label: 'Appointments Booked' },
              { value: '40+', label: 'Medical Specialties' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl sm:text-3xl font-black text-gradient mb-1">{stat.value}</div>
                <div className="text-white/50 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
