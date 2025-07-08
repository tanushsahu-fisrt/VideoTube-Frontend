import {  useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Edit } from 'lucide-react';
import UpdateModal from '../../components/UpdateAvatar';
import UpdateuserDetail from '../../components/UserUpdatePopUp';
import { apiCall } from '../../utils/ApiCall';

const UserProfile = () => {

  const [userValue, setUserValue] = useState(null);
  const [showUpadetPopUpAvatar, setShowUpadetPopUpAvatar] = useState(false);
  const [userDetail, setUserDetail] = useState(false);
  const [image, setImage] = useState('');


  useEffect( () => {
    const getuser  = async () => {
      const currUser = await apiCall(`/api/users/current-user`)

      if(currUser?.success)
          setUserValue(currUser.data)
    }

    getuser();
  })

  const UpdateImage = (img) => {
    setShowUpadetPopUpAvatar(true);
    setImage(img);
  };

  const updatUserDetail = () => {
    setUserDetail(true);
  }

  return (
    <>
      <Header />
      <div className="flex min-h-161">
        <Sidebar />
        <main className="p-3 w-full">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden relative">
            {/* Cover Image */}
            <div className="relative h-56 bg-gray-200 group">
              {userValue?.coverImage && (
                <img
                  src={userValue.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              )}

              <button
                className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition duration-300"
                onClick={() => UpdateImage('coverImage')}
              >
                <Edit size={20} />
              </button>
            </div>

            {/* Avatar + Info */}
            <div className="px-6 py-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-28 h-28 rounded-full border-4 border-white -mt-16 overflow-hidden shadow-md group">
                  {userValue?.avatar && (
                    <img
                      src={userValue.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition duration-300"
                    onClick={() => UpdateImage('avatar')}
                  >
                    <Edit size={18} />
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {userValue?.username || 'username'}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
                <button 
                className='mr-3 mt-5'
                onClick={updatUserDetail}
                >
                  <Edit size={18} className="text-gray-500 hover:text-gray-700" />
                </button>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700 ">
                <div className="flex  justify-between items-center bg-gray-50 px-4 py-3 rounded-md shadow-sm">
                  <div>
                    <p className=" font-semibold text-gray-500 text-xl">Email</p>
                    <p>{userValue?.email || 'your@email.com'}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md shadow-sm">
                  <div>
                    <p className=" font-semibold text-gray-500 text-xl">Username</p>
                    <p>{userValue?.fullName || 'Full Name'}</p>
                  </div>
                </div>
                
                {/* Add more fields here as needed */}
              </div>
            </div>
          </div>
        </main>
      </div>

      {showUpadetPopUpAvatar && (
        <UpdateModal
          onClose={() => setShowUpadetPopUpAvatar(false)}
          identifier={image}
        />
      )}
      
      {userDetail && (
        <UpdateuserDetail
          onClose={() => setUserDetail(false)}
        />
      )}
    </>
  );
};

export default UserProfile;
