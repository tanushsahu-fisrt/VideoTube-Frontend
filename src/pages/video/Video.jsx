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
import { apiCall } from '../../utils/ApiCall';

const VideoPage = () => {
  const location = useLocation();
  const video = location.state?.video;
  const isOpen = location.state?.isIconOpen;

  const { videoId } = useParams();
  const navigate = useNavigate();

  const [isUpdatePopUpOpen, setIsUpdatePopUpOpen] = useState(false);
  const [comment, setComment] = useState([]);
  const [content, setContent] = useState('');
  const [likedVideo, setLikedVideo] = useState(false);
  const [subscribedVideo, setSubscribedVideo] = useState(false);
  const [isOn, setIsOn] = useState(video?.ispublished);
  const [subsLength, setSubsLength] = useState(null);
  const [userId, setUserId] = useState(video?.owner?._id);

  const handleVideoDelete = async () => {
    const res = await axios.delete(`/api/videos/${videoId}`);
    if (res.data.success) navigate('/my-videos');
  };

  const getAllComment = async () => {
    const res = await axios.get(`/api/comments/${videoId}`);
    if (res.data.success) setComment(res.data.data);
  };


  useEffect(() => {
    getAllComment();
  }, );

  const fetchData = async () => {
    const endpoint = `/api/subscriptions/c/${userId}`
    try {
      const res = await apiCall(endpoint, 'GET');

      if(res?.success){
        setSubsLength(res?.data.length || 0);
      }
    } catch (err) {
      console.error('Error fetching data', err);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, );

  const toggleSwitch = () => {
    setIsOn(!isOn);
    togglePublishStatus();
  };

  const togglePublishStatus = async () => {
    const res = await axios.patch(`/api/videos/toggle/publish/${videoId}`);
    if (res.data.success) navigate('/my-videos');
  };

  const handelAddComment = async () => {
    try {
      const res = await axios.post(`/api/comments/${videoId}`, {
        content,
      });
      if (res.data.success) {
        setComment((prev) => [...prev, res.data.data]);
        setContent('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleVideoLike = async () => {
    try {
      const res = await axios.post(`/api/likes/toggle/v/${videoId}`);
      setLikedVideo(Object.keys(res.data.data).length > 0);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect( () => {
      const isSubscriber = async () => {
        const channelId = video?.owner?._id;

        const check = await axios.post(`/api/subscriptions/check/isSubscriber`,{
          channelId : channelId
        });
        
        if(check.data.data){
          setSubscribedVideo(true)
        }
      }

      isSubscriber();
  },)

  
  const handleSubscribtion = async () => {
    try {
      const channelId = video?.owner?._id;
      const res = await axios.post(`/api/subscriptions/c/${channelId}`);
      if(Object.keys(res.data.data).length > 0){
        setSubscribedVideo(true);
      }
      else{
        setSubscribedVideo(false)
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row gap-6 px-6 py-6 bg-gray-100 min-h-screen">
        {/* Left Section: Video Player */}
        <div className="w-full lg:w-2/3">
          {video ? (
            <>
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
                <video
                  src={video.videofile}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              <h1 className="mt-5 text-2xl font-bold text-gray-800">
                {video.title}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {video.views} views •{' '}
                {new Date(video.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Channel Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={video?.owner?.avatar}
                    alt={video?.owner?._id}
                    className="w-10 h-10 rounded-full border border-cyan-300"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {video?.owner?.username}
                    </p>
                    <p className="text-sm text-gray-500">{subsLength} subscribers</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Subscribe Button */}
                  <button
                    onClick={handleSubscribtion}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-md transition ${
                      subscribedVideo
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {subscribedVideo ? (
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

                  {/* Like Button */}
                  <button
                    onClick={handleVideoLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-md transition ${
                      likedVideo
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <ThumbsUp
                      className={`w-5 h-5 ${likedVideo ? 'fill-red-500' : ''}`}
                    />
                    Like
                  </button>

                  {/* Comment Button */}
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 shadow-md hover:bg-gray-200 transition">
                    <MessageCircle className="w-5 h-5" />
                    Comment
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-600 text-center text-lg">
              Video not found.
            </p>
          )}
        </div>

        {/* Right Section: Controls */}
        {isOpen && (
          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-4 space-y-4 max-h-[85vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-700">Manage</h3>
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={() => setIsUpdatePopUpOpen(true)}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Edit size={18} /> Edit
              </button>
              <button
                onClick={handleVideoDelete}
                className="text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <Delete size={18} /> Delete
              </button>
              <div
                className={`w-12 h-6 flex items-center px-1 rounded-full cursor-pointer transition ${
                  isOn ? 'bg-green-500' : 'bg-gray-300'
                }`}
                onClick={toggleSwitch}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    isOn ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div className="px-6 lg:px-10 py-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2>

        {/* Comment Input */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
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

      {/* Update Video Modal */}
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
