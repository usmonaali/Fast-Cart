import React from "react";
import Services5 from '../../assets/Services5.png'
import Services6 from '../../assets/Services6.png'
import Services7 from '../../assets/Services7.png'
import { useTranslation } from "react-i18next";

const StoryHelp = () => {
  const { t } = useTranslation()
  return (
    <div>
      <div className={`w-[1170px] h-[281px] gap-[190px] flex items-center mt-[40px]`}>
        <div className={`w-[249px] h-[161px]`}>
          <img className={`ml-[90px]`} src={Services5} alt="" />
          <h1 className={`font-[600] text-[20px] mt-[10px] dark:text-white text-[#000000] text-center`}>{t('storyHelp.freeFastDelivery')}</h1>
          <p className={`font-[400] text-[14px]  mt-[10px] dark:text-white text-center`}>{t('storyHelp.freeDeliveryDescription')}</p>
        </div>
        <div className={`w-[249px] h-[161px]`}>
          <img className={`ml-[90px]`} src={Services6} alt="" />
          <h1 className={`font-[600] dark:text-white text-[20px] mt-[10px] text-[#000000] text-center`}>{t('storyHelp.customerService')}</h1>
          <p className={`font-[400]  dark:text-white text-[14px] mt-[10px] text-center`}>{t('storyHelp.customerServiceDescription')}</p>
        </div>
        <div className={`w-[249px] h-[161px]`}>
          <img className={`ml-[90px]`} src={Services7} alt="" />
          <h1 className={`font-[600] dark:text-white text-[20px] mt-[10px] text-[#000000] text-center`}>{t('storyHelp.moneyBackGuarantee')}</h1>
          <p className={`font-[400]  dark:text-white text-[14px] mt-[10px] text-center`}>{t('storyHelp.moneyBackDescription')}</p>
        </div>
      </div>
    </div>
  );
};

export default StoryHelp;
