import { Mail, Phone } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const CallToUs = () => {
  const { t } = useTranslation();

  return (
    <div
      className={`w-[350px] h-[434px] rounded-[4px] pt-[40px] pl-[20px] dark:bg-[#1C2536] bg-[#FFFFFF] shadow-2xl`}
    >
      <div className={`flex items-center justify-start gap-[20px] ml-[20px]`}>
        <div className={`w-[40px] h-[40px] rounded-[50%] bg-[#DB4444]`}>
          {" "}
          <Phone />{" "}
        </div>

        <h1 className={`font-[500] text-[20px] dark:text-white text-[#000000]`}>
          {t("callToUs.callToUs")}
        </h1>
      </div>

      <h1
        className={`font-[400] text-[14px] dark:text-white ml-[20px] mt-[15px]`}
      >
        {t("callToUs.available")}
      </h1>

      <p
        className={`font-[400] text-[14px] dark:text-white ml-[20px] mt-[10px]`}
      >
        {t("callToUs.phone")} +8801611112222
      </p>

      <div
        className={`w-[270px] bg-[#0000004D] dark:text-white h-[0.5px] ml-[20px] mt-[40px]`}
      />

      <div
        className={`flex items-center justify-start mt-[30px] dark:text-white gap-[20px] ml-[20px]`}
      >
        <div className={`w-[40px] h-[40px] rounded-[50%] bg-[#DB4444]`}>
          <Mail />
        </div>

        <h1 className={`font-[500] text-[20px] dark:text-white text-[#000000]`}>
          {t("callToUs.writeToUs")}
        </h1>
      </div>

      <p
        className={`ml-[20px] dark:text-white font-[400] text-[14px] mt-[15px]`}
      >
        {t("callToUs.description")}
      </p>

      <p
        className={`ml-[20px] font-[400] dark:text-white text-[14px] mt-[15px]`}
      >
        {t("callToUs.emails")} customer@exclusive.com
      </p>

      <p
        className={`ml-[20px] font-[400] dark:text-white text-[14px] mt-[10px]`}
      >
        {t("callToUs.emails")} support@exclusive.com
      </p>
    </div>
  );
};

export default CallToUs;
