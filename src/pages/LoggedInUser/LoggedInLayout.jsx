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
    <div className=" flex min-h-157">
      <Sidebar />
      <main className="p-8 w-full ">
            <div className="flex flex-wrap gap-6">
            {   
                video && video.map( (video, idx) => (
                    <VideoCard key={idx} video={video} />
                ))
            }
            </div>
      </main>
    </div>
    </>
  );
};

export default Dashboard;
