import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { FaCalendarAlt, FaUserMd, FaSignOutAlt } from 'react-icons/fa';

const sidebarLinks = [
  {
    to: '/dashboard/bookings',
    label: 'My Bookings',
    icon: <FaCalendarAlt className="text-lg" />,
  },
  {
    to: '/dashboard/profile',
    label: 'My Profile',
    icon: <FaUserMd className="text-lg" />,
  },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out');
  };

  return (
    <>
      <Helmet>
        <title>Dashboard – DocAppoint</title>
      </Helmet>
      <div className="min-h-screen bg-slate-50 flex">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#0A0F2C] fixed top-16 lg:top-20 left-0 bottom-0 z-30">
          {/* User card */}
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.name} className="w-11 h-11 rounded-xl object-cover border-2 border-accent/30" />
              ) : (
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate">{user?.name}</p>
                <p className="text-white/40 text-xs truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-4 px-3 space-y-1">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-accent/10 text-accent border border-accent/20'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 text-sm font-medium transition-colors"
            >
              <FaSignOutAlt className="text-lg" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 lg:pl-64">
          {/* Top bar */}
          <div className="bg-white border-b border-slate-100 px-4 lg:px-8 py-4 sticky top-16 lg:top-20 z-20">
            <div className="flex items-center justify-between">
              <h1 className="text-slate-800 font-black text-xl">Dashboard</h1>
              {/* Mobile tab navigation */}
              <div className="flex gap-2 lg:hidden">
                {sidebarLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive ? 'bg-accent/10 text-accent' : 'text-slate-600 hover:bg-slate-50'
                      }`
                    }
                  >
                    {link.icon}
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Page content */}
          <div className="p-4 lg:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
