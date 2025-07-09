import React, { useState } from 'react';
import {
  XCircle,
  Upload,
  FileText,
  ImageIcon,
  VideoIcon,
} from 'lucide-react';
import axios from 'axios';

const PublishModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null,
    thumbnail: null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePublish = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('videoFile', formData.videoFile);
      formDataToSend.append('thumbnail', formData.thumbnail);

      const uploadVideo = await axios.post('/api/videos', formDataToSend);
      console.log(uploadVideo);
      if (uploadVideo.status === 200) {
        setFormData({ title: '', description: '', videoFile: null, thumbnail: null });
        onClose();
      }
    } catch (err) {
      console.error('Error publishing video:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center px-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 relative animate-fade-in-up">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition"
        >
          <XCircle size={24} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center gap-2">
          <Upload size={22} className="text-blue-600" /> Publish Video
        </h2>

        <div className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
              <div className="px-3 text-gray-400">
                <FileText size={18} />
              </div>
              <input
                type="text"
                name="title"
                placeholder="Enter video title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-2 py-2 outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Enter video description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none text-gray-800"
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail
            </label>
            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition">
              <ImageIcon size={18} className="text-blue-600" />
              <span className="text-sm text-gray-700 truncate">
                {formData.thumbnail ? formData.thumbnail.name : 'Choose image'}
              </span>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    thumbnail: e.target.files[0],
                  }))
                }
              />
            </label>
          </div>

          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video File
            </label>
            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition">
              <VideoIcon size={18} className="text-blue-600" />
              <span className="text-sm text-gray-700 truncate">
                {formData.videoFile ? formData.videoFile.name : 'Choose video'}
              </span>
              <input
                type="file"
                name="videoFile"
                accept="video/*"
                className="hidden"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    videoFile: e.target.files[0],
                  }))
                }
              />
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={handlePublish}
            disabled={
              !formData.title.trim() ||
              !formData.description.trim() ||
              !formData.videoFile
            }
            className={`w-full py-2.5 rounded-md text-white font-medium transition ${
              formData.title.trim() &&
              formData.description.trim() &&
              formData.videoFile
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            🚀 Publish Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
