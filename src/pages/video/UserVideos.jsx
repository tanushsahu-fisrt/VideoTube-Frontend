import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { apiCall } from '../../utils/ApiCall';
import { useNavigate } from 'react-router-dom';



const UserVideos = () => {

    const[videos,setVideo] = useState([]);
    const navigate = useNavigate();

    useEffect( () => {
        const getAllVideo = async () => {
            const getVideos = await apiCall('/api/videos','GET')

            if(getVideos.success){
                setVideo(getVideos.data);
            }
        }
        getAllVideo();
    },[])

    const {username} = JSON.parse(sessionStorage.getItem("user")); 
  
  return (
    <>
      <Header />
      <div className=" flex min-h-157">
        <Sidebar />
          
        <main className="p-3 w-full">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">{username} Video's</h1> 

          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 
            max-h-[600px] overflow-y-scroll overflow-x-hidden 
            scroll-smooth hide-scrollbar">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition "
                  onClick={() => navigate(`/user/video/${video._id}`, { state: { video : video , isIconOpen : true} })}
                >
                  <img
                  src={video?.thumbnail}
                  alt={video?.title}
                  className="w-full h-40 object-cover rounded-md"
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-semibold mb-1 truncate">
                      {video?.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {video?.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round(video?.duration)} sec • {video?.views} views
                    </p>
                  </div>
                    <p className="text-sm text-gray-500 mt-1 font-bold p-1">
                       Public : {video.ispublished ? "true" : "false"}
                    </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-600 mt-10">No videos uploaded yet.</p>
          )}
        </main>

      </div>
    </>
  );
};

export default UserVideos;
