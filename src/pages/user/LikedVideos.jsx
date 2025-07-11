import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Check } from "lucide-react";

const LikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllLikedVideos = async () => {
      try {
        const response = await axios.get(`/api/likes/videos`);
        if (response.data.success) {
          setLikedVideos(response.data.data);
        }
       
      } catch (error) {
        console.error("Error fetching liked videos:", error);
      }
    };

    getAllLikedVideos();
  }, []);

  return (
    <>
    <Header />
      <div className="flex min-h-161 bg-gray-50">
        <Sidebar/>
      <div className="px-8 py-6 w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Liked Videos</h2>
      {likedVideos.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {likedVideos.map( (obj) => (
            <div
              key={obj?._id}
              onClick={() => navigate(`/user/video/${obj?.video?._id}`, { state: { video : obj.video } })}
              className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
            > 
              <img
                src={obj?.video?.thumbnail}
                alt={obj?.video?.title}
                className="rounded-t-xl w-full h-40 object-cover"
              />
              <div className="p-4 flex">
                <h3 className="text-sm font-semibold mb-1 truncate">
                <img
                  src={obj?.video?.owner?.avatar}
                  alt={obj?.video?.owner?._id}
                  className="w-10 h-10 rounded-full border-1 border-cyan-300"
                />
                <p className="text-sm flex  gap-1 items-center">
                  {obj?.video?.owner?.username}
                  <span className="bg-blue-500 p-0.5 rounded-full flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </span>
                </p>
                </h3>
                <div className="mx-5">
                <h3 className="font-semibold text-gray-900 truncate">{obj?.video?.title}</h3>
                <p className="text-sm text-gray-500 mt-1 truncate">{obj?.video?.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {obj?.video?.views} views •{" "}
                  {new Date(obj?.video?.createdAt).toLocaleDateString()}
                </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-10">No liked videos</p>
      )}
    </div>
    </div>
    </>
  );
};

export default LikedVideos;
