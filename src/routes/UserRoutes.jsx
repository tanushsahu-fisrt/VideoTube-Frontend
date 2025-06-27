import { Routes , Route } from "react-router-dom";
import LoginForm from "../pages/user/LoginForm"
import SignupForm from "../pages/user/SignupForm"
import GuestHome from "../pages/home/home";
import Dashboard from "../pages/LoggedInUser/LoggedInLayout";
import VideoPage from "../pages/video/Video";

const UserRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<GuestHome />} />
            <Route path="/user/login" element={<LoginForm />} />
            <Route path="/user/signup" element={<SignupForm />} />
            <Route path="/user" element={<Dashboard />} />
            <Route path="/user/video/:videoId" element={<VideoPage />} />
        </Routes>
    )

}

export default UserRoutes;