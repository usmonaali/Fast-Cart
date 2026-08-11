import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../ProductCard/ProductCard";
import Countdown from "../../Countdown/Countdown";
import { useTranslation } from "react-i18next";

const FlashSalesSection = ({ products, endsAtUtc }) => {
    const { t }  = useTranslation()
  if (products.length === 0) return null;

  return (
    <section className="mb-16 dark:text-white">
      <p className="text-[#F04438] font-[600]  text-[14px] mb-2">
        {t("flashSales.todays")}
      </p>
      <div className="flex items-center dark:text-white justify-between mb-6">
        <h2 className="font-[700] text-[28px] dark:text-white text-[#111927]">
          {t('flashSales.title')}
        </h2>
        {endsAtUtc && <Countdown endsAtUtc={endsAtUtc} dark />}
      </div>
      <div className="grid grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link
          to="/products"
          className="bg-[#F04438] text-white text-[14px] font-[500] px-8 py-3 rounded"
        >
          {t('flashSales.viewAllProducts')}
        </Link>
      </div>
    </section>
  );
};

export default FlashSalesSection;
