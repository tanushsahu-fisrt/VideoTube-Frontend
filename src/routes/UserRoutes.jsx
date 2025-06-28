import { Routes , Route } from "react-router-dom";
import LoginForm from "../pages/user/LoginForm"
import SignupForm from "../pages/user/SignupForm"
import GuestHome from "../pages/home/home";
import Dashboard from "../pages/LoggedInUser/LoggedInLayout";
import VideoPage from "../pages/video/Video";
import UserProfile from "../pages/user/UserProfile";
import UserVideos from "../pages/video/UserVideos";
import UserDashboard from "../pages/video/UserDashboard";

const UserRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<GuestHome />} />
            <Route path="/user/login" element={<LoginForm />} />
            <Route path="/user/signup" element={<SignupForm />} />
            <Route path="/user" element={<Dashboard />} />
            <Route path="/user/video/:videoId" element={<VideoPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/my-videos" element={<UserVideos />} />
            <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
    )

}

export default UserRoutes;