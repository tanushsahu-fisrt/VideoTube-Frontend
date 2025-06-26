import { Routes , Route } from "react-router-dom";
import LoginForm from "../pages/user/LoginForm"
import SignupForm from "../pages/user/SignupForm"

const UserRoutes = () => {
    
    return (
        <Routes>
            <Route path="/user/login" element={<LoginForm />} />
            <Route path="/user/signup" element={<SignupForm />} />
        </Routes>
    )

}

export default UserRoutes;