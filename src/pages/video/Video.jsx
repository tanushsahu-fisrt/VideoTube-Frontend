import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import {
  ThumbsUp,
  MessageCircle,
  Bell,
  Edit,
  Delete,
  Heart,
  MoreVertical,
} from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UpdateVideoDetail from './UpdateVideoDetail';
import CommentCard from '../../components/CommentCard';

const VideoPage = () => {
  const location = useLocation();
  const video = location.state?.video;
  const isOpen = location.state?.isIconOpen;

  const { videoId } = useParams();
  const navigate = useNavigate();

  const [isUpdatePopUpOpen, setIsUpdatePopUpOpen] = useState(false);
  const [comment, setComment] = useState([]);
  const [content, setContent] = useState('');
  const [likedVideo, setlikedVideo] = useState(false);

  const handleVideoDelete = async () => {
    const deleteVideo = await axios.delete(`/api/videos/${videoId}`);

    if (deleteVideo.data.success) {
      navigate('/my-videos');
    }
  };

  const getAllComment = async () => {
    const getComment = await axios.get(`/api/comments/${videoId}`);
    
    if (getComment.data.success) {
      setComment(getComment.data.data);
    }
  };
  
  useEffect(() => {
  getAllComment();
  }, []);

  const [isOn, setIsOn] = useState(video.ispublished);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    togglePublishStatus();
  };

  const togglePublishStatus = async () => {
    const toggleSwitch = await axios.patch(
      `/api/videos/toggle/publish/${videoId}`
    );

    if (toggleSwitch.data.success) {
      navigate('/my-videos');
    }
  };

  const handelAddComment = async () => {
    try {
      const addComment = await axios.post(`/api/comments/${videoId}`, {
        content: content,
      });
      const newComment = addComment.data.data;
      console.log(addComment.data.data);

      if (addComment.data.success) {
        setComment((prev) => [...prev, newComment]);
        setContent('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleVideoLike = async () => {
    try{
      const toggleLike = await axios.post(`/api/likes/toggle/v/${videoId}`)
      
      if(Object.keys(toggleLike.data.data).length === 0 )
          setlikedVideo(false);
      else{
        setlikedVideo(true);
      }
    }
    catch(err){
      console.log(err);
    }
  }

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

              <h1 className="mt-4 text-2xl font-semibold text-gray-800">
                {video.title}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {video.views} views •{' '}
                {new Date(video.createdAt).toLocaleDateString()}
              </p>

              <div className="flex items-center gap-4 mt-4 flex-wrap">
                <button 
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                onClick={handleVideoLike}
                >
                  <ThumbsUp className = {`w-5 h-5 overflow-hidden  ${likedVideo ? 'fill-red-500' : ''}`} /> Like
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
            <p className="text-center text-gray-600 text-lg">
              No video data found
            </p>
          )}
        </div>

        <div className="w-full lg:w-1/3 space-y-4 overflow-y-auto max-h-[85vh]">
          {isOpen ? (
            <div className="flex justify-between">
              <p>
                <Edit onClick={() => setIsUpdatePopUpOpen(true)} />
              </p>
              <p>
                <Delete onClick={handleVideoDelete} />
              </p>
              <p>
                <div
                  className={`w-12 h-6 flex items-center px-1 rounded-full cursor-pointer transition-all duration-300 ${
                    isOn ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  onClick={toggleSwitch}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                      isOn ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></div>
                </div>
              </p>
            </div>
          ) : (
            [1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="flex gap-4 bg-white p-3 rounded-lg shadow"
              >
                <div className="w-32 h-20 bg-gray-300 rounded"></div>
                <div className="flex flex-col justify-between">
                  <h3 className="font-medium text-gray-800">
                    Sample Video Title {num}
                  </h3>
                  <p className="text-xs text-gray-500">
                    1.2M views • 1 day ago
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mx-10 mt-1">
        <h1>Comments</h1>
        <div>
          <input
            type="text"
            className="w-full underline-offset-1"
            placeholder="Add a Comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="button"
            className="bg-red-300 rounded-xl px-2 "
            onClick={handelAddComment}
          >
            Add
          </button>
        </div>

        <div className="flex justify-end mb-2"></div>
        {comment.length > 0 ? (
          <div className="flex-col gap-4 bg-white p-3 rounded-lg shadow">
            {
            comment.map((cmt) => 
                <CommentCard 
                key={cmt._id} 
                cmt={cmt} 
                getAllComment = {() => getAllComment()}
                />
            )
            }
          </div>
        ) : (
          <p>No comments</p>
        )}
      </div>

      {isUpdatePopUpOpen && (
        <UpdateVideoDetail
          video={video}
          onClose={() => setIsUpdatePopUpOpen(false)}
          
        />
      )}

      
    </>
  );
};

export default VideoPage;
