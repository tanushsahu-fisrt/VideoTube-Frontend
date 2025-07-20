import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { apiCall } from '../../utils/ApiCall';
import { Heart, Sparkle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../assets/Loader';

const Tweets = () => {
  const [tweets, setTweets] = useState([]);

  const [subscribedMap, setSubscribedMap] = useState({});
  const [likedMap, setLikedMap] = useState({});
  const [loading, setLoading] = useState(true);

  const { userData } = useAuth();

  let userId;
  userId = userData?.data?.user?._id;

  useEffect(() => {
    const getTweet = async () => {
      const allUserTweet = await apiCall('/api/tweets');
      const allUserLikedTweet = await apiCall('/api/likes/tweets');

      if (allUserTweet?.success) {
        setTweets(allUserTweet?.data);
        setLoading(false);
      } else {
        setLoading(false);
      }

      if (allUserLikedTweet?.success) {
        const likedTweet = allUserLikedTweet?.data;
        if (likedTweet.length > 0) {
          const likedMapData = {};

          likedTweet.forEach((ele) => (likedMapData[ele?.tweet] = true));
          setLikedMap(likedMapData);
        }
      }
    };

    getTweet();
  }, []);

  const handleSubscribtion = async (channelId) => {
    try {
      const res = await axios.post(`/api/subscriptions/c/${channelId}`);

      if (res.data.success) {
        setSubscribedMap((prev) => ({
          ...prev,
          [channelId]: true,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTweetLike = async (tweetId) => {
    try {
      const res = await axios.post(`/api/likes/toggle/t/${tweetId}`);

      if (res.data.success) {
        setLikedMap((prev) => ({
          ...prev,
          [tweetId]: !prev[tweetId],
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div className="flex bg-gradient-to-br from-white via-yellow-100 to-pink-300 min-h-screen">
        {/* Sidebar */}

        <Sidebar />
        <div className="px-8 py-6 w-full">
          <h1 className="text-3xl font-semibold mb-6 bg-white shadow-sm rounded-4xl text-center">Tweets</h1>
          <div className="p-[2px] rounded-xl mt-1">
            <main className="flex-1 flex justify-center  px-3">
              <div
                className="w-full max-w-2xl
              max-h-[500px] overflow-y-scroll overflow-x-hidden scroll-smooth hide-scrollbar"
              >
                {loading ? (
                  <Loader />
                ) : tweets.length > 0 ? (
                  tweets.map((ele) => (
                    <div
                      key={ele._id}
                      className="bg-white
                     rounded-xl shadow-sm p-4 mb-4 hover:shadow-md transition"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={ele?.owner?.avatar}
                          alt={ele?.owner?.username}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-800">
                                {ele?.owner?.username}
                                <span className="text-sm text-gray-500 ml-2">
                                  @{ele?.owner?.username?.toLowerCase()}
                                </span>
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(ele?.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <p className="mt-2 text-xl text-gray-700">
                            {ele.content}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          className={`px-3 py-1 rounded-full 
                     text-black
                    hover:scale-105 transition duration-200`}
                          onClick={() => handleTweetLike(ele._id || '')}
                        >
                          <Heart
                            className={`mt-1 ${likedMap[ele._id] ? 'text-white fill-red-500' : ''}`}
                          />
                        </button>
                        {ele?.owner?._id != userId && (
                          <button
                            className="flex items-center gap-1 cursor-pointer px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105"
                            onClick={() => handleSubscribtion(ele?.owner?._id)}
                          >
                            {subscribedMap[ele?.owner?._id] ? (
                              <div className="flex gap-1 items-center">
                                <Sparkle className="w-5 h-5" /> Subscribed
                              </div>
                            ) : (
                              <div className="flex gap-1 items-center">
                                <Sparkle className="w-5 h-5" /> Subscribe
                              </div>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 mt-6">
                    No tweets found.
                  </p>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tweets;
