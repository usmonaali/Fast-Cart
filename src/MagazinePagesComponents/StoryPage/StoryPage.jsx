import React from "react";
import portraittwoafricanfemalesholdingshoppingbagswhilereactingsomethingtheirsmartphone1 from '../../assets/portraittwoafricanfemalesholdingshoppingbagswhilereactingsomethingtheirsmartphone1.png'
import { useTranslation } from "react-i18next";

const StoryPage = () => {
  const {t} = useTranslation()
  return (
    <div>
      <section className={`flex items-center`}>
        <div className={`w-[525px]`}>
          <h1 className={`font-[600] dark:text-white text-[54px]`}>{t('about.title')}</h1>
          <p className={`font-[400] text-[16px] mt-[20px] dark:text-white text-[#000000]`}>
            {t('about.paragraph1')}
          </p>
          <p className={`font-[400] dark:text-white text-[16px] text-[#000000] mt-[40px]`}>
            {t('about.paragraph2')}
          </p>
        </div>
        <div className={`ml-[100px]`}>
            <img className={`rounded-[4px]`} src={portraittwoafricanfemalesholdingshoppingbagswhilereactingsomethingtheirsmartphone1} alt="" />
        </div>
      </section>
    </div>
  );
};

export default StoryPage;
