import { apiCall } from "../../utils/ApiCall";
import Header from "../../components/Header";
import VideoCard from "../../components/VideoCard";
import { useEffect, useState } from "react";

const GuestHome = () => {
    
    const[video,setVideo] = useState(null);


    useEffect( () => {
        const getVideo =  async () => {

            const response = await apiCall('/api/guestUser');
            setVideo(response.data);
        }
        getVideo();
    },[])

    return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-6">Explore Trending Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {
           video && video.map( (video, idx) => (
            <VideoCard key={idx} video={video} />
          ))
          }
        </div>
      </main>
    </div>
  );
};

export default GuestHome;
