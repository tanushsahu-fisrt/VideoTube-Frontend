import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Video,
  User,
  ThumbsUp,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { to: '/user', label: 'Home', icon: <Home size={20} /> },
    { to: '/my-videos', label: 'My Videos', icon: <Video size={20} /> },
    { to: '/profile', label: 'Profile', icon: <User size={20} /> },
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    { to: '/liked-video', label: 'Liked Videos', icon: <ThumbsUp size={20} /> },
  ];

  return (
    <>
      <aside className="w-64 h-auto bg-gradient-to-br from-purple-200 to-purple-600 text-white p-6 top-0 flex flex-col justify-between">
        {/* Top Menu */}
        <div>
          <nav className="flex flex-col gap-4">
            {menuItems.map(({ to, label, icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-white hover:text-blue-500'
                  }`}
                >
                  {icon}
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Logout */}
        <div>
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg text-white hover:text-red-300 transition">
            <LogOut />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
