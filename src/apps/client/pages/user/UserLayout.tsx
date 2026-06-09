import { Outlet } from "react-router-dom";
import { UserSidebar } from "./components/UserSidebar";

const UserLayout = () => {
    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8">
            <UserSidebar />
            <div className="flex-1 min-w-0">
                <Outlet />
            </div>
        </div>
    );
};

export default UserLayout;
