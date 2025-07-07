import { useEffect, useState } from "react"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { apiCall } from "../../utils/ApiCall"


const UserSubscribed = () =>  {

    const [subscribedChannel , setSubscribedChannel] = useState(null)

    useEffect( () => {
        const fetchSubscriber = async () => {
            const response = await apiCall(`/api/subscriptions/c/:channelId`)
        }
    },[])
  return (
    <>
        <Header />
      <div className="flex min-h-157 bg-gray-50">
        <Sidebar/>
      <div className="px-8 py-6 w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Subscribed Channels</h2>
      {subscribedChannel.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {subscribedChannel.map( (obj) => (
            <div
              key={obj?._id}
              className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={obj?.video?.thumbnail}
                alt={obj?.video?.title}
                className="rounded-t-xl w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 truncate">{obj?.video?.title}</h3>
                <p className="text-sm text-gray-500 mt-1 truncate">{obj?.video?.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {obj?.video?.views} views •{" "}
                  {new Date(obj?.video?.createdAt).toLocaleDateString()}
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
  )
}


export default UserSubscribed
