import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../DashboardComponents/Header/Header";
import SideBar from "../../DashboardComponents/SideBar/SideBar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0F1729] transition-colors">
      <SideBar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
