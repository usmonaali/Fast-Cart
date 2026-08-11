import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../ProductCard/ProductCard";
import { useTranslation } from "react-i18next";

const ExploreProductsSection = ({ products }) => {
  if (products.length === 0) return null;
    const {t} = useTranslation()
  return (
    <section className="mb-16">
      <p className="text-[#F04438] font-[600] text-[14px] mb-2">{t('exploreProducts.ourProducts')}</p>
      <h2 className="font-[700] text-[28px] dark:text-white text-[#111927] mb-6">{t('exploreProducts.title')}</h2>
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
          {t('exploreProducts.viewAllProducts')}
        </Link>
      </div>
    </section>
  );
};

export default ExploreProductsSection;