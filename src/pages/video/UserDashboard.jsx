import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const UserDashboard = () => {

    return(
        <>
        <Header/>
        <div className="flex min-h-157 bg-gray-50">
        <Sidebar />
        </div>

        </>
    )
}

export default UserDashboard;