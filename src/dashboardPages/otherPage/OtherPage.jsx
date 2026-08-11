import React, { useState } from "react";
import CategoriesTab from "./CategoriesTab/CategoriesTab";
import BrandsTab from "./BrandsTab/BrandsTab";
import BannersTab from "./BannersTab/BannersTab";
import CouponsTab from "./CouponsTab/CouponsTab";

const TABS = ["Categories", "Brands", "Banners", "Coupons"];

const OtherPage = () => {
  const [activeTab, setActiveTab] = useState("Categories");

  return (
    <div className="p-6">
      <div className="flex gap-6 border-b border-[#E5E7EB] mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-[14px] font-[500] ${
              activeTab === tab
                ? "text-[#2f6fed] border-b-2 border-[#2f6fed]"
                : "text-[#6C737F]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Categories" && <CategoriesTab />}
      {activeTab === "Brands" && <BrandsTab />}
      {activeTab === "Banners" && <BannersTab />}
      {activeTab === "Coupons" && <CouponsTab />}
    </div>
  );
};

export default OtherPage;
