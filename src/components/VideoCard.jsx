import { Check, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  const handleVideoClick = (id) => {
    navigate(`/user/video/${id}`,{ state : {video : video } })
  }

  return (
    <div className="w-full sm:w-70 bg-white rounded-lg overflow-hidden shadow-md">
      {isLogin ? (
        <div onClick={() => handleVideoClick(video?._id)}>
          <img
            src={video?.thumbnail}
            alt={video?.title}
            className="w-full h-36 object-cover"
          />
          <div className="p-3 flex items-center ">
              <h3 className="text-sm justify-center mb-1 truncate ">
                <img
                  src={video?.owner?.avatar}
                  alt={video?.owner?._id}
                  className="w-9 h-9 rounded-full border-1 border-blue-500"
                />
                <p className="text-sm flex font-semibold gap-1 items-center">
                  {video?.owner?.username}
                  <span className="bg-blue-500 p-0.5 rounded-full flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </span>
                </p>
              </h3>
            <div className='mx-5'>
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
        </div>
      ) : (
        <div onClick={() => navigate('/user/login')}>
          <img
            src={video?.thumbnail}
            alt={video?.title}
            className="w-full h-36 object-cover"
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
      )}
    </div>
  );
};

export default VideoCard;
