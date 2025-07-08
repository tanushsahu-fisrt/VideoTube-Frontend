import React, { useState } from 'react';
import { XCircle, Upload, FileText, ImageIcon } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateVideoDetail = ({ onClose, video }) => {
  const [formData, setFormData] = useState({
    title: video.title,
    description: video.description,
    thumbnail: null,
  });

  const { videoId } = useParams();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('thumbnail', formData.thumbnail);

      const updateVideo = await axios.patch(
        `/api/videos/${videoId}`,
        formDataToSend
      );

      if (updateVideo.data.status) {
        setFormData({ title: '', description: '', thumbnail: null });
        onClose();
      }
    } catch (err) {
      console.error('Error updating video:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 relative animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        >
          <XCircle size={24} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
          <Upload className="text-blue-600" size={22} />
          Update Video Details
        </h2>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Title */}
          <div className="relative">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
              <div className="px-3 text-gray-400">
                <FileText size={18} />
              </div>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter video title"
                className="w-full px-2 py-2 outline-none text-gray-900"
              />
            </div>
          </div>

          {/* Description */}
          <div className="relative">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Write something about this video..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Thumbnail
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition">
                <ImageIcon size={18} className="text-blue-600" />
                <span className="text-sm text-gray-700">
                  {formData.thumbnail ? formData.thumbnail.name : 'Choose image'}
                </span>
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.files[0] })
                  }
                />
              </label>
            </div>
          </div>

          {/* Update Button */}
          <button
            onClick={handleUpdate}
            disabled={
              !formData.title || !formData.description || !formData.thumbnail
            }
            className={`w-full py-2.5 rounded-md text-white font-medium transition ${
              formData.title && formData.description && formData.thumbnail
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            🚀 Update Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateVideoDetail;
