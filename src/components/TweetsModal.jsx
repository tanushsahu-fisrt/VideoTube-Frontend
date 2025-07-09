import { XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { apiCall } from "../utils/ApiCall";

const TweetsModal = ({ onClose , setActiveTab }) => {
  const [tweet, setTweet] = useState("");
  const maxChars = 280;

  const [userAvatar, setUserAvatar] = useState('');
    
    useEffect( () => {
      const getuser  = async () => {
        const currUser = await apiCall(`/api/users/current-user`)
  
        if(currUser?.success)
            setUserAvatar(currUser.data?.avatar)
      }
  
      getuser();
    } , [userAvatar])

  const handleclose = () => {
    setActiveTab(false);
    onClose()
  }

  const handleTweet = async () => {
        const createTweet = await apiCall('/api/tweets','POST', { content : tweet } )

        if(createTweet?.success)
            console.log(createTweet?.data)
        onClose()
  }

  


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-2 backdrop-blur-sm z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={handleclose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition"
        >
          <XCircle size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">Create Tweet</h2>

        {/* Tweet Box */}
        <div className="flex gap-3">
            <div className="relative group">
              <img
                src={userAvatar}
                alt="User Avatar"
                className="w-15 h-15 rounded-full object-cover border-2 border-gray-200 
                         group-hover:border-red-300 transition-colors"
              />
            </div>
          <textarea
            placeholder="What's happening?"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            className="flex-1 resize-none min-h-[100px] border-none focus:outline-none text-gray-800 placeholder-gray-500"
            maxLength={maxChars}
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          {/* Character Count */}
          <span className="text-sm text-gray-500">
            {tweet.length}/{maxChars}
          </span>

          {/* Tweet Button */}
          <button
            onClick={handleTweet}
            disabled={!tweet.trim()}
            className={`px-5 py-2 rounded-full text-sm font-medium transition 
              ${tweet.trim()
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"}
            `}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetsModal;
