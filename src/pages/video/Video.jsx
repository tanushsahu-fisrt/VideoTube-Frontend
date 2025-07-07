import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import {
  ThumbsUp,
  MessageCircle,
  Bell,
  Edit,
  Delete,
  Sparkles,
} from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UpdateVideoDetail from './UpdateVideoDetail';
import CommentCard from '../../components/comment/CommentCard';

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
  const [subscribedVideo, setSubscribedVideo] = useState(false);

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
    try {
      const toggleLike = await axios.post(`/api/likes/toggle/v/${videoId}`);

      if (Object.keys(toggleLike.data.data).length === 0) setlikedVideo(false);
      else {
        setlikedVideo(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  
  const handleSubscribtion = async () => {
    try{
      const channelId  = video?.owner
      
      const response =  await axios.post(`/api/subscriptions/c/${channelId}`)
      
      const data = response.data.data;
      
      if(Object.keys(data).length > 0){
        setSubscribedVideo(true);
      }
      else{
        setSubscribedVideo(false);
      }
    }
    catch(err){
      console.log(err)
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

              <div className="flex items-center gap-4 mt-4 flex-wrap ">
                <button
                  className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${likedVideo ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-800'} hover:bg-red-200`}
                  onClick={handleVideoLike}
                >
                  <ThumbsUp
                    className={`w-5 h-5 ${likedVideo ? 'fill-red-500' : ''}`}
                  />
                  Like
                </button>

                <button className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition">
                  <MessageCircle className="w-5 h-5" />
                  Comment
                </button>

                <button 
                className={`flex items-center cursor-pointer gap-2 px-4 py-2 ${subscribedVideo ? 'bg-red-500' : 'bg-blue-600'} text-white rounded-full`}
                onClick={handleSubscribtion}
                >
                  {
                  subscribedVideo ?  
                  (<p className='flex gap-2'> 
                  <Sparkles className="w-5 h-5" />
                    Subscribed </p>) : 
                  (<p className='flex gap-2'>
                  <Bell className="w-5 h-5" />
                     Subscribe </p>)
                  }
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
          {isOpen && (
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
          ) }
        </div>
      </div>

      <div className="mx-10 mt-4">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2>

  {/* Add Comment Input */}
  <div className="flex items-center gap-2 mb-6">
    <input
      type="text"
      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Add a comment..."
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
    <button
      type="button"
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      onClick={handelAddComment}
      disabled={!content.trim()}
    >
      Add
    </button>
  </div>

  {/* Comment List */}
  {comment.length > 0 ? (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-sm">
      {comment.map((cmt) => (
        <CommentCard
          key={cmt._id}
          cmt={cmt}
          getAllComment={getAllComment}
        />
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No comments yet.</p>
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
