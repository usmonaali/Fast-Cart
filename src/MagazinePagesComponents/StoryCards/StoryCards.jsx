import React from "react";
import { useTranslation } from "react-i18next";
import Services from "../../assets/Services.png";
import Services1 from "../../assets/Services1.png";
import Services2 from "../../assets/Services2.png";
import Services3 from "../../assets/Services3.png";

const StoryCards = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className={`flex items-center w-[1170px] h-[430px] gap-[20px]`}>
        <div
          className={`w-[270px] h-[230px] rounded-[4px] border border-[1px]`}
        >
          <img className={`ml-[90px] mt-[30px]`} src={Services} alt="" />
          <h1
            className={`font-[700] text-[32px] dark:text-white mt-[10px] text-[#000000] text-center`}
          >
            10.5k{" "}
          </h1>
          <p
            className={`font-[400] text-[16px]  dark:text-white text-[#000000] text-center`}
          >
            {t("stats.sellersLabel")}
          </p>
        </div>
        <div
          className={`w-[270px] h-[230px] rounded-[4px] border border-[1px]`}
        >
          <img className={`ml-[90px] mt-[30px]`} src={Services1} alt="" />
          <h1
            className={`font-[700] dark:text-white text-[32px] mt-[10px] text-[#000000] text-center`}
          >
            33k{" "}
          </h1>
          <p
            className={`font-[400]  dark:text-white text-[16px] text-[#000000] text-center`}
          >
            {t("stats.monthlySalesLabel")}
          </p>
        </div>
        <div
          className={`w-[270px] h-[230px] rounded-[4px] border border-[1px]`}
        >
          <img className={`ml-[90px] mt-[30px]`} src={Services2} alt="" />
          <h1
            className={`font-[700] dark:text-white text-[32px] mt-[10px] text-[#000000] text-center`}
          >
            45.5k{" "}
          </h1>
          <p
            className={`font-[400]  dark:text-white text-[16px] text-[#000000] text-center`}
          >
            {t("stats.customersLabel")}
          </p>
        </div>
        <div
          className={`w-[270px] h-[230px] rounded-[4px] border border-[1px]`}
        >
          <img className={`ml-[90px] mt-[30px]`} src={Services3} alt="" />
          <h1
            className={`font-[700] dark:text-white text-[32px] mt-[10px] text-[#000000] text-center`}
          >
            25k{" "}
          </h1>
          <p
            className={`font-[400]  dark:text-white text-[16px] text-[#000000] text-center`}
          >
            {t("stats.grossSaleLabel")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryCards;
