import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "../../../api/client";
import Countdown from "../../Countdown/Countdown";

const PromoBanner = ({ banners }) => {
  const [index, setIndex] = useState(0);
  const banner = banners[index];

  if (!banner) return null;

  const prev = () => setIndex((i) => (i === 0 ? banners.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === banners.length - 1 ? 0 : i + 1));

  return (
    <section className="relative bg-black rounded-md p-10 mb-16 flex items-center justify-between text-white">
      {banners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </>
      )}

      <div>
        <h2 className="text-[28px] font-[600] mb-4">{banner.title}</h2>
        {banner.endsAtUtc && (
          <div className="mb-4">
            <Countdown endsAtUtc={banner.endsAtUtc} />
          </div>
        )}
        <Link
          to={banner.categoryId ? `/products?categoryIds=${banner.categoryId}` : "/products"}
          className="bg-[#22C55E] text-white text-[14px] font-[500] px-6 py-2 rounded inline-block"
        >
          Buy Now
        </Link>
      </div>
      {banner.url && (
        <img src={getImageUrl(banner.url)} alt={banner.title} className="h-[200px] object-contain" />
      )}
    </section>
  );
};

export default PromoBanner;