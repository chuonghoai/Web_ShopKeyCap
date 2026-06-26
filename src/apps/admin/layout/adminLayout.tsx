import React from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../components/sidebar/AdminSidebar";

const AdminLayout: React.FC = () => {
    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <AdminSidebar />
            
            <main className="flex-1 w-full h-full overflow-auto bg-slate-50/50">
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;