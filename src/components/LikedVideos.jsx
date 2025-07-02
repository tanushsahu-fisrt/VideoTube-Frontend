import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

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
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar/>
    <div className="ml-64 px-8 py-6 w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Liked Videos</h2>
      {likedVideos.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {likedVideos.map((video) => (
            <div
              key={video._id}
              onClick={() => navigate(`/user/video/${video._id}`, { state: { video } })}
              className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="rounded-t-xl w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 truncate">{video.title}</h3>
                <p className="text-sm text-gray-500 mt-1 truncate">{video.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {video.views} views •{" "}
                  {new Date(video.createdAt).toLocaleDateString()}
                </p>
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
