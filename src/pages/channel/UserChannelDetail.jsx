import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { apiCall } from '../../utils/ApiCall';
import Loader from '../../assets/Loader';
import Sidebar from '../../components/Sidebar';
import { Bell, Sparkles } from 'lucide-react';

const UserChannelDetail = () => {
  const location = useLocation();
  const { channelId } = location.state;
  const { username } = useParams();
  const navigate = useNavigate();

  const [userprofile, setUserProfile] = useState(null);
  const [videos, setVideo] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [subscribedUser, setSubscribedUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tabsLoading, setTabsLoading] = useState(true);
  const [tabs, setTabs] = useState('video');

  const getChannelDetail = async () => {
    try {
      const channelDetail = await apiCall(`/api/users/c/${username}`);
      if (channelDetail.success) {
        setUserProfile(channelDetail.data);
        setSubscribedUser(channelDetail.data?.isSubscribed);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = async () => {
    try {
      setTabsLoading(true);
      const api = tabs === 'video'
        ? `/api/videos/c/${channelId}`
        : `/api/tweets/user/${channelId}`;

      const response = await apiCall(api);
      if (response.success) {
        tabs === 'video' ? setVideo(response.data) : setTweets(response.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTabsLoading(false);
    }
  };

  useEffect(() => {
    getChannelDetail();
  }, []);

  useEffect(() => {
    if (tabs === 'video' && videos.length === 0) handleTabChange();
    if (tabs === 'tweet' && tweets.length === 0) handleTabChange();
  }, [tabs]);

  return (
    <>
      <Header />
      <div className="flex min-h-161 bg-gradient-to-br from-white via-yellow-100 to-pink-300">
        <Sidebar />
        <main className="p-3 w-full max-h-[600px] overflow-y-scroll overflow-x-hidden scroll-smooth hide-scrollbar">
          {loading ? (
            <Loader />
          ) : (
            <div className="rounded-xl overflow-hidden relative">
              <div className="relative h-56 bg-gray-200">
                {userprofile?.coverImage && (
                  <img
                    src={userprofile.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="px-4 py-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-28 h-28 rounded-full border-4 border-blue-500 overflow-hidden shadow-md">
                    {userprofile?.avatar && (
                      <img
                        src={userprofile.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-gray-800">{userprofile?.username || 'username'}</h2>
                    <button
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-md transition ${
                        subscribedUser ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {subscribedUser ? (
                        <><Sparkles className="w-5 h-5" /> Subscribed</>
                      ) : (
                        <><Bell className="w-5 h-5" /> Subscribe</>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-700">
                  <div className="bg-gray-50 px-4 py-3 rounded-md shadow-sm">
                    <p className="text-xl font-semibold text-gray-500">Channels Subscribed :</p>
                    <p>{userprofile?.channelsSubscribedToCount}</p>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 rounded-md shadow-sm">
                    <p className="text-xl font-semibold text-gray-500">Total Channel Subscribers</p>
                    <p>{userprofile?.subscribersCount}</p>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 rounded-md shadow-sm">
                    <p className="text-xl font-semibold text-gray-500">Email</p>
                    <p>{userprofile?.email || 'your@email.com'}</p>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 rounded-md shadow-sm">
                    <p className="text-xl font-semibold text-gray-500">Full Name</p>
                    <p>{userprofile?.fullName || 'Full Name'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="p-2">
            <button
              className={`rounded-md mx-2 mb-2 px-2 py-2 
                ${tabs === 'video' ? 
                'bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white' : 
                'bg-white text-purple-600 border border-purple-600'}`}
              onClick={() => setTabs('video')}
            >
              Videos
            </button>
            <button
              className={`rounded-md mx-2 mb-2 px-2 py-2 
                ${tabs === 'tweet' ? 
                 'bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white' : 
                'bg-white text-purple-600 border border-purple-600'}`}
              onClick={() => setTabs('tweet')}
            >
              Tweets
            </button>
          </div>

          {/* Tab Content */}
          {tabsLoading ? (
            <Loader />
          ) : (
            <div>
              {tabs === 'video' ? (
                videos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                    {videos.map(video => (
                      <div
                        key={video._id}
                        className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition"
                        onClick={() => navigate(`/user/video/${video._id}`, {
                          state: { video, isIconOpen: true },
                        })}
                      >
                        <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover rounded-md" />
                        <div className="p-3">
                          <h3 className="text-sm font-semibold mb-1 truncate">{video.title}</h3>
                          <p className="text-xs text-gray-600 line-clamp-2">{video.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{Math.round(video.duration)} sec • {video.views} views</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-600">No videos uploaded yet.</p>
                )
              ) : (
                tweets.length > 0 ? (
                  <div>
                    {tweets.map(ele => (
                      <div key={ele._id} className="bg-white rounded-xl shadow-sm p-4 mb-4 hover:shadow-md transition">
                        <div className="flex items-start gap-3">
                          <img src={ele.owner.avatar} alt={ele.owner.username} className="w-10 h-10 rounded-full object-cover" />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-semibold text-gray-800">{ele.owner.username.toLowerCase()}</p>
                              <span className="text-sm text-gray-500">{new Date(ele.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <p className="mt-2 text-gray-700 text-base">{ele.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-600">No tweets posted yet.</p>
                )
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default UserChannelDetail;