import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { apiCall } from '../../utils/ApiCall';
import VideoCard from '../../components/VideoCard';
import Header from '../../components/Header';
import Loader from '../../assets/Loader';

const Dashboard = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVideo = async () => {
      const response = await apiCall('/api/guestUser');
      
      if(Object.keys(response.data).length > 0){
        setVideo(response.data);
        setLoading(false);
      }
    };
    getVideo();
  }, []);

  return (
    <>
      <Header />
      <div className="flex min-h-161 bg-gradient-to-br from-white via-yellow-100 to-pink-300">
        <Sidebar />
        <main className="p-3 w-full">
          {loading ? 
          <Loader /> :
            <div
              className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 
            max-h-[600px] overflow-y-scroll overflow-x-hidden scroll-smooth hide-scrollbar
            rounded-xl bg-white p-4"
            >
              {video &&
                video.map((video, idx) => (
                  <VideoCard key={idx} video={video} />
                ))}
          </div>}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
