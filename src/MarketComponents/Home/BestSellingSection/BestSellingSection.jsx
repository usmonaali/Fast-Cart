import React from "react";
import ProductCard from "../../ProductCard/ProductCard";
import { useTranslation } from "react-i18next";

const BestSellingSection = ({ products }) => {
  if (products.length === 0) return null;
  const { t } = useTranslation()

  return (
    <section className="mb-16">
      <p className="text-[#F04438] font-[600] text-[14px] mb-2">{t('bestSelling.thisMonth')}</p>
      <h2 className="font-[700] text-[28px] text-[#111927] dark:text-white mb-6">{t('bestSelling.title')}</h2>
      <div className="grid grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default BestSellingSection;