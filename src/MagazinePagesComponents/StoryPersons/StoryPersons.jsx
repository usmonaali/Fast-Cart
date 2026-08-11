import React from "react";
import Frame877 from "../../assets/Frame877.png";
import Frame874 from "../../assets/Frame874.png";
import Frame875 from "../../assets/Frame875.png";
import Frame876 from "../../assets/Frame876.png";
const StoryPersons = () => {
  return (
    <div>
      <div className={`w-[1170px] h-[620px] flex items-center gap-[15px]`}>
        <div>
          <img src={Frame874} alt="" />
          <h1 className={`font-[500] text-[32px] dark:text-white text-[#000000] mt-[20px]`}>
            Tom Cruise
          </h1>
          <p className={`font-[400] dark:text-white text-[16px] text-[#000000] mt-[10px]`}>
            Founder & Chairman
          </p>
          <img src={Frame877} className={`mt-[10px]`} alt="" />
        </div>
        <div>
          <img src={Frame875} alt="" />
          <h1 className={`font-[500] dark:text-white text-[32px] text-[#000000] mt-[20px]`}>
            Emma Watson
          </h1>
          <p className={`font-[400] dark:text-white text-[16px] text-[#000000] mt-[10px]`}>
            Managing Director
          </p>
          <img src={Frame877} className={`mt-[10px]`} alt="" />
        </div>
        <div>
          <img src={Frame876} alt="" />
          <h1 className={`font-[500] dark:text-white text-[32px] text-[#000000] mt-[20px]`}>
            Will Smith
          </h1>
          <p className={`font-[400] dark:text-white text-[16px] text-[#000000] mt-[10px]`}>
            Product Designer
          </p>
          <img src={Frame877} className={`mt-[10px]`} alt="" />
        </div>
      </div>
    </div>
  );
};

export default StoryPersons;
