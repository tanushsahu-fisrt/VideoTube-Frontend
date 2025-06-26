import { User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="w-full sm:w-64 bg-white rounded-lg overflow-hidden shadow-md">
      {isLogin ? (
        <div>
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-36 object-cover"
          />
          <div className="p-3">
            <h3 className="text-sm font-semibold mb-1 truncate">
              {video.title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2">
              {video.description}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round(video.duration)} sec • {video.views} views
            </p>
          </div>
        </div>
      ) : (
        <div onClick={() => navigate('/user/login')}>
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-36 object-cover"
          />
          <div className="p-3">
            <h3 className="text-sm font-semibold mb-1 truncate">
              {video.title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2">
              {video.description}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round(video.duration)} sec • {video.views} views
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
