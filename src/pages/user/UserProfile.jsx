import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";

const UserProfile = () => {
  const { userData } = useAuth();
  const [userValue, setUserValue] = useState(userData?.data?.user);

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <div className="ml-64 px-8 py-6 w-full">
          <div className="relative bg-white rounded-xl shadow overflow-hidden">
            {/* Cover Image */}
            <div className="w-full h-56 bg-gray-200">
              {userValue?.coverImage && (
                <img
                  src={userValue.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Avatar + User Info */}
            <div className="px-6 py-4">
              <div className="flex items-center gap-6">
                <div className="w-28 h-28 rounded-full border-4 border-white -mt-16 overflow-hidden shadow-lg">
                  {userValue?.avatar && (
                    <img
                      src={userValue.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {userValue?.fullName || "Full Name"}
                  </h2>
                  <p className="text-gray-600">@{userValue?.username || "username"}</p>
                </div>
              </div>

              {/* Optional Info Section */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <div>
                  <p className="font-medium">Email</p>
                  <p>{userValue?.email || "your@email.com"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
