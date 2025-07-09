import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { apiCall } from '../../utils/ApiCall';
import { useNavigate } from 'react-router-dom';
import { InfoIcon, Video } from 'lucide-react';

const UserDashboard = () => {
  const [channelStats, setChannelStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      const stats = await apiCall('/api/dashboard/stats');
      if (stats?.success) setChannelStats(stats.data);
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await apiCall('/api/dashboard/videos');
      if (response?.success) setVideos(response.data);
    };
    fetchVideos();
  }, []);

  const stats = [
    {
      label: 'Total Views',
      value: channelStats?.totalViews || 0,
      icon: '👁️',
    },
    {
      label: 'Subscribers',
      value: channelStats?.totalSubscribers || 0,
      icon: '👥',
      nvgt: '/user/subscribed-list',
    },
    {
      label: 'Total Likes',
      value: channelStats?.totalLikes || 0,
      icon: '👍',
    },
    {
      label: 'Total Videos',
      value: channelStats?.totalVideos || 0,
      icon: '🎥',
    },
  ];

  return (
    <>
      <Header />
      <div className="flex bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 min-h-screen">
        <Sidebar />

        <main className="p-6 w-full">
          {/* Dashboard Header */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <InfoIcon className="text-purple-600" /> Dashboard
          </h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                onClick={() => stat.nvgt && navigate(stat.nvgt)}
                className="bg-white/80 backdrop-blur-md border border-white/30 shadow-md hover:shadow-lg rounded-2xl p-6 text-center cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-md text-gray-600">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              </div>
            ))}
          </div>

         

          
        </main>
      </div>
    </>
  );
};

export default UserDashboard;
