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

          {/* Divider */}
          <div className="border-t border-gray-200 my-8" />

          {/* Video Section Header */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Video className="text-purple-600" /> Your Videos
          </h2>

          {/* Videos */}
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto max-h-[300px] pr-2 hide-scrollbar">
              {videos.map((video) => (
                <div
                  key={video._id}
                  onClick={() =>
                    navigate(`/user/video/${video._id}`, {
                      state: { video: video, isIconOpen: true },
                    })
                  }
                  className="bg-white shadow-md hover:shadow-xl transition rounded-xl cursor-pointer overflow-hidden border border-gray-100"
                >
                  <img
                    src={video?.thumbnail}
                    alt={video?.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-md font-semibold truncate text-gray-800">
                      {video?.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {video?.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {Math.round(video?.duration)} sec • {video?.views} views
                    </p>
                    <p className="text-xs font-medium text-gray-600 mt-1">
                      Public: <span className={video.ispublished ? 'text-green-600' : 'text-red-500'}>{video.ispublished ? 'Yes' : 'No'}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg mt-10">
              No videos uploaded yet.
            </p>
          )}
        </main>
      </div>
    </>
  );
};

export default UserDashboard;
