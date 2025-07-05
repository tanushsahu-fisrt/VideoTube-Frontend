import React, { useState } from 'react';
import { Circle } from 'lucide-react';
import axios from 'axios';


const UpdateModal = ({ onClose, identifier }) => {
  const [image, setImage] = useState({
    coverImage: null,
    avatar: null,
  });
  


  const updateIdentifier = async (identify) => {
    try {
      const formData = new FormData();
      let uploadImage;

      if (identify === 'avatar') {
        formData.append('avatar', image.avatar);
        uploadImage = await axios.patch('/api/users/avatar', formData);
      } else {
        formData.append('coverImage', image.coverImage);
        uploadImage = await axios.patch('/api/users/cover-image', formData);
      }

      if (uploadImage?.data?.success) {
        console.log('Image updated successfully');

        sessionStorage.removeItem('user');
        sessionStorage.setItem('user', JSON.stringify(uploadImage.data.data));

        onClose();
      }
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          <Circle color="red" />
        </button>

        <h2 className="text-2xl text-center font-bold mb-4 text-gray-800">
          Update {identifier}
        </h2>

        <div className="space-y-6 ">
          <div className="font-bold gap-4 py-2">
            <label htmlFor="thumbnail">Choose file : </label>
            <input
              type="file"
              name={identifier}
              accept="image/*"
              className="bg-gray-300 w-50 px-1 border-2 rounded-md cursor-pointer"
              onChange={(e) =>
                setImage((prev) => ({
                  ...prev,
                  [identifier]: e.target.files[0],
                }))
              }
            />
          </div>

          <button
            onClick={() => updateIdentifier(identifier)}
            className="w-full bg-blue-600 text-white py-2 rounded-md disabled:bg-blue-400 hover:bg-blue-700 transition"
          >
            🚀 Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
