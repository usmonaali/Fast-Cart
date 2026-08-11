import React from "react";
import MainSlidersPanel from "./MainSlidersPanel/MainSlidersPanel";
import BannerPanel from "./BannerPanel/BannerPanel";

const BannersTab = () => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <MainSlidersPanel />
      <BannerPanel />
    </div>
  );
};

export default BannersTab;