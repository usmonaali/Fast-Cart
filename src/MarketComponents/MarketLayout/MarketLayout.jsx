import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const MarketLayout = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-[#0F1729]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};


export default MarketLayout;