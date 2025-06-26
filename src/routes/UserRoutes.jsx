import { Routes , Route } from "react-router-dom";
import LoginForm from "../pages/user/LoginForm"
import SignupForm from "../pages/user/SignupForm"
import GuestHome from "../pages/home/home";
import Dashboard from "../pages/LoggedInUser/LoggedInLayout";

const UserRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<GuestHome />} />
            <Route path="/user/login" element={<LoginForm />} />
            <Route path="/user/signup" element={<SignupForm />} />
            <Route path="/user" element={<Dashboard />} />
        </Routes>
    )

}

export default UserRoutes;