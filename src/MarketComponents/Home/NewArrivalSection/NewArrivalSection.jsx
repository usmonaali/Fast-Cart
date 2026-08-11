import React from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "../../ProductCard/ProductCard";

const NewArrivalSection = ({ products }) => {
  const { t } = useTranslation();

  if (products.length === 0) return null;

  return (
    <section>
      <p className="text-[#F04438] font-[600] text-[14px] mb-2">
        {t("newArrival.featured")}
      </p>
      <h2 className="font-[700] text-[28px] dark:text-white text-[#111927] mb-6">
        {t("newArrival.title")}
      </h2>
      <div className="grid grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivalSection;
