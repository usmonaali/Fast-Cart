import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../../api/client";

const HeroSlider = ({ slides }) => {
  if (slides.length === 0) return null;

  return (
    <div className="relative bg-black rounded-md overflow-hidden mb-16 h-[350px] flex items-center px-10">
      <img
        src={getImageUrl(slides[0].url)}
        alt={slides[0].title}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="relative z-10 text-white">
        <h2 className="text-[32px] font-[600] mb-2">{slides[0].title}</h2>
        <p className="text-[18px] mb-4">{slides[0].subtitle}</p>
        {slides[0].linkUrl && (
          <Link to={slides[0].linkUrl} className="underline text-[14px]">
            Shop Now →
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeroSlider;