import { Link } from 'react-router-dom';
import { Home, Video, User } from 'lucide-react'; // icons (optional)

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-6 fixed left-0 top-0">
      <h1 className="text-2xl font-bold mb-8">VideoTube</h1>
      <nav className="space-y-4">
        <Link to="/user" className="block hover:text-blue-400"><Home size={20} className="inline mr-2"/> Home</Link>
        <Link to="/my-videos" className="block hover:text-blue-400"><Video size={20} className="inline mr-2"/> My Videos</Link>
        <Link to="/profile" className="block hover:text-blue-400"><User size={20} className="inline mr-2"/> Profile</Link>
        <Link to="/dashboard" className="block hover:text-blue-400"><User size={20} className="inline mr-2"/>Dashboard</Link>
        {/* Add more links as needed */}
      </nav>
    </aside>
  );
};

export default Sidebar;
