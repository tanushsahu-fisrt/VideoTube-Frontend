import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { apiCall } from "../../utils/ApiCall";
import VideoCard from "../../components/VideoCard";
import Header from "../../components/Header";

const Dashboard = () => {

    const[video , setVideo] = useState(null);
    
    useEffect( () => {
            const getVideo =  async () => {
    
                const response = await apiCall('/api/guestUser');
                setVideo(response.data);
            }
            getVideo();
        },[])
  return (
    <>
    <Header />
    <div className="flex min-h-157">
      <Sidebar />
      <main className="p-3 w-full">
        <div
        className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 
        max-h-[600px] overflow-y-scroll overflow-x-hidden 
        scroll-smooth hide-scrollbar">
        {video &&
        video.map((video, idx) => 
        <VideoCard key={idx} video={video} />)
        }
        </div>
      </main>
    </div>
    </>
  );
};

export default Dashboard;
