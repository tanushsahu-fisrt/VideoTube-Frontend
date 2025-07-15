import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { apiCall } from '../../utils/ApiCall';
import Loader from '../../assets/Loader';
import Sidebar from '../../components/Sidebar';
import { Bell, Sparkles } from 'lucide-react';

const UserChannelDetail = () => {

const location = useLocation();

const { channelId} = location.state;

  const [userprofile, setUserProfile] = useState(null);
  const[videos,setVideo] = useState([]);
  const navigate = useNavigate();

  const [subscribedUser, setSubscribedUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tabs,setTabs] = useState('video')
  const { username } = useParams();

  useEffect(() => {
    const getChannelDetail = async () => {
      const channelDetail = await apiCall(`/api/users/c/${username}`);
      const channelVideo = await apiCall(`/api/videos/c/${channelId}`)
    
      if (channelDetail.success) {
        setUserProfile(channelDetail.data);
        setSubscribedUser(channelDetail.data?.isSubscribed)
        setLoading(false);
      }
      if(channelVideo.success){
        if(channelVideo.data == null){
            setVideo([]);
        }else{
            setVideo(channelVideo.data);
        }
        console.log(channelVideo.data);
      }
    };
    getChannelDetail();
  }, []);

  return (
    <>
      <Header />
      <div className="flex min-h-161 bg-gradient-to-br from-white via-yellow-100 to-pink-300">
        <Sidebar />
        <main className="p-3 w-full
        max-h-[600px] overflow-y-scroll overflow-x-hidden 
                scroll-smooth hide-scrollbar">
          {loading ? (
            <Loader />
          ) : (
            <div className="rounded-xl overflow-hidden relative
            ">
              {/* Cover Image */}
              <div className="relative h-56 bg-gray-200 group">
                {userprofile?.coverImage && (
                  <img
                    src={userprofile.coverImage}
                    alt="Cover"
                    className="w-full h-full "
                  />
                )}
              </div>

              {/* Avatar + Info */}
              <div className="px-6 py-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative w-28 h-28 rounded-full border-4 border-white  overflow-hidden shadow-md group">
                    {userprofile?.avatar && (
                      <img
                        src={userprofile.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {userprofile?.username || 'username'}
                      </h2>
                    </div>
                    <div>
                    <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-md transition ${
                      subscribedUser
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {subscribedUser ? (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Subscribed
                      </>
                    ) : (
                      <>
                        <Bell className="w-5 h-5" />
                        Subscribe
                      </>
                    )}
                  </button>
                    </div>
                  </div>
                </div>
                
                <div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700 ">
                  <div className="flex  justify-between items-center bg-gray-50 px-4 py-3 rounded-md shadow-sm">
                    <div>
                      <p className=" font-semibold text-gray-500 text-xl">
                        Channels Subscribed :
                      </p>
                      <p>{userprofile?.channelsSubscribedToCount}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md shadow-sm">
                    <div>
                      <p className=" font-semibold text-gray-500 text-xl">
                        Total Channel Subscribers
                      </p>
                      <p>{userprofile?.subscribersCount}</p>
                    </div>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700 ">
                  <div className="flex  justify-between items-center bg-gray-50 px-4 py-3 rounded-md shadow-sm">
                    <div>
                      <p className=" font-semibold text-gray-500 text-xl">
                        Email
                      </p>
                      <p>{userprofile?.email || 'your@email.com'}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md shadow-sm">
                    <div>
                      <p className=" font-semibold text-gray-500 text-xl">
                        FullName
                      </p>
                      <p>{userprofile?.fullName || 'Full Name'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <button className={` 
            ${tabs == 'video' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border-purple-600'} 
            rounded-md mx-2 mb-2 px-2 py-2`}
            onClick={() => setTabs('video')}
            >
                Videos
            </button>
            <button className={`rounded-md mx-2 mb-2 px-2 py-2
            ${tabs != 'video' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border-purple-600'} 
            `}
            onClick={() => setTabs('')}
            >
              Tweets
            </button>
          </div>

          { 
            videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition "
                  onClick={() => navigate(`/user/video/${video._id}`, { state: { video : video , isIconOpen : true} })}
                >
                  <img
                  src={video?.thumbnail}
                  alt={video?.title}
                  className="w-full h-40 object-cover rounded-md"
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-semibold mb-1 truncate">
                      {video?.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {video?.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round(video?.duration)} sec • {video?.views} views
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-600 mt-10">No videos uploaded yet.</p>
          )
          }
        </main>
      </div>
    </>
  );
};

export default UserChannelDetail;
