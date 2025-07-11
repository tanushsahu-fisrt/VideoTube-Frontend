import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { apiCall } from '../../utils/ApiCall';
import { useAuth } from '../../context/AuthContext';
import { Search } from 'lucide-react';

const UserSubscribed = () => {
  const [activeTab, setActiveTab] = useState('subscribedTo');
  const [channels, setChannels] = useState([]);
  const [userId, setUserId] = useState('');
  
  const { userData } = useAuth();
  
  useEffect( () => {
    const getuser  = async () => {
      const currUser = await apiCall(`/api/users/current-user`)

      if(currUser?.success)
          setUserId(currUser.data._id)
    }

    getuser()
  } )
  
  useEffect(() => {

  if (!userId) return; // prevent fetch if not ready

  const fetchData = async () => {
    const endpoint =
      activeTab === 'subscribedTo'
        ? `/api/subscriptions/u/${userId}`
        : `/api/subscriptions/c/${userId}`;

    try {
      const res = await apiCall(endpoint, 'GET');
      setChannels(res?.data || []);
    } catch (err) {
      console.error('Error fetching data', err);
    }
  };

  fetchData();
}, [userData?.data?.user?._id, activeTab]);


  return (
    <>
      <Header />
      <div className="flex min-h-161 bg-gray-50">
        <Sidebar />

        <main className="p-3 w-full">

          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {activeTab === 'subscribedTo'
              ? 'Users I Subscribed To'
              : 'My Subscribers'}
          </h2>

          {/* Toggle Tabs */}
          <div className="flex gap-4 mb-6">
            {['subscribedTo', 'mySubscribers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                }`}
              >
                {tab === 'subscribedTo'
                  ? 'Users I Subscribed To'
                  : 'My Subscribers'}
              </button>
            ))}
          </div>

          <div className="relative w-full max-w-md mb-6">
            {/* Search Icon */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search channels..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-2xl 
               shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 
               focus:border-blue-500 transition-all duration-300 
               placeholder-gray-400 text-gray-800"
            />
          </div>

          {/* Channel Cards */}
          {channels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-6  gap-6">
              {channels.map((obj) => (
                <div
                  key={obj?._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={obj?.avatar || '/default.jpg'}
                    alt={obj?.fullName}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {obj?.username}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {obj?.fullName}
                    </p>
                    <button className="mt-3 w-full py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-full transition">
                      {activeTab == 'subscribedTo' ? 'Subscribed' : (<p className='text-black'>Subscriber</p>)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-lg mt-12">
              No data to show in this tab.
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default UserSubscribed;
