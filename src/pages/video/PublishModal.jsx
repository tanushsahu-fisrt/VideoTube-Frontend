import React, { useState } from 'react';
import { Circle } from 'lucide-react';
import axios from 'axios';

const PublishModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile : null,
    thumbnail : null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePublish = () => {
      const upload = async () => {
        
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title); 
        formDataToSend.append("description", formData.description);
        formDataToSend.append("videoFile", formData.videoFile); 
        formDataToSend.append("thumbnail", formData.thumbnail); 

        const uploadVideo = await axios.post('/api/videos',formDataToSend)
        console.log(uploadVideo);
        if (uploadVideo.status) {
          setFormData({ title: '', description: '' });
          onClose();
        }
      };

      upload();

  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          <Circle color="red" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Publish Video</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Video Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            placeholder="Video Description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="font-bold gap-4 py-2">
            <label htmlFor="thumbnail">thumbnail </label>
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              className="bg-gray-300 w-50 px-1 border-2 rounded-md cursor-pointer"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  thumbnail : e.target.files[0],
                }))
              }
            />
            <br />
            <label htmlFor="video">video </label>
            <input
              type="file"
              name="videoFile"
              accept="video/*"
              className="bg-gray-300 w-50 px-1 border-2 rounded-md cursor-pointer mt-4"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  videoFile : e.target.files[0],
                }))
              }
            />
          </div>

          <button
            onClick={handlePublish}
            disabled={!formData.title.trim() || !formData.description.trim()
                 || !formData.videoFile ||!formData.thumbnail}
            className="w-full bg-blue-600 text-white py-2 rounded-md disabled:bg-blue-400 hover:bg-blue-700 transition"
          >
            🚀 Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
