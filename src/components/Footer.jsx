import { Link } from 'react-router-dom';

const footerLinks = {
  Company: [
    { label: 'About Us', to: '/' },
    { label: 'Our Doctors', to: '/appointments' },
    { label: 'Careers', to: '/' },
    { label: 'Blog', to: '/' },
  ],
  Services: [
    { label: 'Book Appointment', to: '/appointments' },
    { label: 'Find Specialists', to: '/appointments' },
    { label: 'Video Consultation', to: '/' },
    { label: 'Health Records', to: '/' },
  ],
  Support: [
    { label: 'Help Center', to: '/' },
    { label: 'Privacy Policy', to: '/' },
    { label: 'Terms of Service', to: '/' },
    { label: 'Contact Us', to: '/' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#060C1E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-bold text-xl">Doc<span className="text-gradient">Appoint</span></span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Your trusted platform for finding and booking top-rated doctors. Quality healthcare, made simple.
            </p>
            <div className="flex items-center gap-3">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-accent/20 hover:text-accent flex items-center justify-center text-white/40 transition-all duration-200 border border-white/10 hover:border-accent/30"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{section}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-white/50 hover:text-accent text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-accent/20 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg">Stay Informed</h3>
            <p className="text-white/50 text-sm mt-1">Get health tips and updates delivered to your inbox.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-64 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent/50"
            />
            <button className="btn-primary py-2.5 text-sm whitespace-nowrap">Subscribe</button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} DocAppoint. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/30 text-sm">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
