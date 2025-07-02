import React, { useState } from 'react';
import { Circle } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateVideoDetail = ({ onClose , video }) => {
  const [formData, setFormData] = useState({
    title: video.title,
    description: video.description,
    thumbnail : null,
  });

  const {videoId} = useParams();
  
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = () => {
      const update = async () => {
        
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title); 
        formDataToSend.append("description", formData.description);
        formDataToSend.append("thumbnail", formData.thumbnail);


        const updateVideo = await axios.patch(`/api/videos/${videoId}`,formDataToSend)
       
        if (updateVideo.data.status) {
          setFormData({ title: '', description: '' });
          onClose();
        }
      };

      update();

  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center px-4">
  <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 relative">
    <button
      onClick={onClose}
      className="absolute top-3 right-4 text-gray-400 hover:text-red-600"
    >
      <Circle />
    </button>

    <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Update Video</h2>

    <div className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Video Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        name="description"
        placeholder="Video Description"
        rows={4}
        value={formData.description}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      />

      <div className="font-medium">
        <label htmlFor="thumbnail" className="block text-sm mb-2">Upload Thumbnail</label>
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          className="block w-full border border-gray-300 rounded-md px-2 py-1 cursor-pointer"
          onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files[0] })}
        />
      </div>

      <button
        onClick={handleUpdate}
        disabled={!formData.title || !formData.description || !formData.thumbnail}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
      >
        🚀 Update
      </button>
    </div>
  </div>
</div>

  );
};

export default UpdateVideoDetail;
