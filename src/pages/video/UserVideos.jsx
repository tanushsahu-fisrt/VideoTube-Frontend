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
            const getVideos = await apiCall('/api/like/videos','GET')

            if(getVideos.data.success){
                setVideo(getVideos.data);
            }
        }
        getAllVideo();
    },[])


    console.log('hii')
  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar/>

        {/* <div className="flex-1 px-8 py-6"> */}
        <div className="px-8 py-6 w-full">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">Uploaded Videos</h1>

          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition"
                  onClick={() => navigate(`/user/video/${video._id}`, { state: { video : video , isIconOpen : true} })}
                >
                  <div 
                  className="aspect-video rounded-t-xl overflow-hidden"
                  >
                    <video
                      src={video.videofile}
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                      onMouseOver={(e) => e.target.play()}
                      onMouseOut={(e) => e.target.pause()}
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="font-semibold text-gray-800 text-lg truncate">{video.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 font-bold">
                       Public : {video.ispublished ? "true" : "false"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-600 mt-10">No videos uploaded yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserVideos;
