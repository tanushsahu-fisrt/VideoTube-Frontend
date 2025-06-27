import { useLocation } from 'react-router-dom';
import Header from "../../components/Header";
import { ThumbsUp, MessageCircle, Bell } from 'lucide-react';

const VideoPage = () => {
  const location = useLocation();
  const video = location.state?.video;

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row gap-6 px-6 py-6 bg-gray-100 min-h-screen">
       
        {/* Left: Video Player & Details */}
        <div className="w-full lg:w-2/3">
          {video ? (
            <>
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg bg-black">
                <video
                  src={video.videofile}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              <h1 className="mt-4 text-2xl font-semibold text-gray-800">{video.title}</h1>
              <p className="text-sm text-gray-600 mt-1">
                {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
              </p>

              <div className="flex items-center gap-4 mt-4 flex-wrap">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
                  <ThumbsUp className="w-5 h-5" /> Like
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
                  <MessageCircle className="w-5 h-5" /> Comment
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
                  <Bell className="w-5 h-5" /> Subscribe
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600 text-lg">No video data found</p>
          )}
        </div>

        {/* Right: Recommended Videos */}
        <div className="w-full lg:w-1/3 space-y-4 overflow-y-auto max-h-[85vh]">
          {/* Placeholder cards for now */}
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="flex gap-4 bg-white p-3 rounded-lg shadow">
              <div className="w-32 h-20 bg-gray-300 rounded"></div>
              <div className="flex flex-col justify-between">
                <h3 className="font-medium text-gray-800">Sample Video Title {num}</h3>
                <p className="text-xs text-gray-500">1.2M views • 1 day ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoPage;
