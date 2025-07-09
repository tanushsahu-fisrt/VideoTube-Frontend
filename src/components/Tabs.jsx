import { Bird, Plus, Video } from 'lucide-react';


const Tabs = ({ activeTab}) => {

  return (
    <div className="flex justify-center">
      <div className="flex gap-2 rounded-full 
        bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 
        text-center px-1 py-1"
      >
        <button
            className={`flex gap-1 px-4 py-2 rounded-full font-medium transition-all duration-300
              ${activeTab 
                ? 'bg-white text-indigo-600 shadow'
                : 'bg-transparent text-white hover:bg-white/20'
              }`}
          >
          <Plus/> tweets
          </button>
        
      </div>
    </div>
  );
};

export default Tabs;
