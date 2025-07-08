import { useState } from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Videos');

  return (
    <div className="flex justify-center">
      <div className="flex gap-2 rounded-full 
        bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 
        text-center px-1 py-1"
      >
        {['Videos', 'Tweets'].map((ele) => (
          <button
            key={ele}
            onClick={() => setActiveTab(ele)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300
              ${activeTab === ele
                ? 'bg-white text-indigo-600 shadow'
                : 'bg-transparent text-white hover:bg-white/20'
              }`}
          >
            {ele}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
