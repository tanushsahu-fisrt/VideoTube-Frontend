import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Video,
  User,
  ThumbsUp,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Bird,
} from 'lucide-react';
import { apiCall } from '../utils/ApiCall';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { to: '/user', label: 'Home', icon: <Home size={20} /> },
    { to: '/dashboard', label: 'Channel', icon: <LayoutDashboard size={20} /> },
    { to: '/my-videos', label: 'My Videos', icon: <Video size={20} /> },
    { to: '/tweet', label: 'Tweets', icon: <Bird size={20} /> },
    { to: '/profile', label: 'Profile', icon: <User size={20} /> },
    { to: '/user/liked-video', label: 'Liked Videos', icon: <ThumbsUp size={20} /> },
    { to: '/user/subscribed-list', label: 'Subscribers', icon: <Sparkles size={20} /> },
  ];

  const { setIsLogin } = useAuth();
  const handleLogOut = async () => {
    const logOut = await apiCall(`/api/users/logout`, 'POST');
    if (logOut.success) {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('accessToken');
      setIsLogin(false)
      navigate('/');
    }
  };

  return (
    <aside className="w-64 h-auto 
    bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 
    text-white p-6 flex flex-col justify-between shadow-xl">
      <div>
        <nav className="flex flex-col gap-2">
          { menuItems.map(({ to, label, icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white shadow text-purple-600'
                    : 'hover:bg-white/10 text-white/80 hover:text-white'
                }`}
              >
                {icon}
                <span className="text-sm">{label}</span>
                
             </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 border-t border-white/20 pt-4">
        <button
          onClick={handleLogOut}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-white/80 hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
