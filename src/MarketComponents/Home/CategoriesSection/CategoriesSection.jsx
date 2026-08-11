import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../../api/client";
import { useTranslation } from "react-i18next";

const CategoriesSection = ({ categories }) => {
  if (categories.length === 0) return null;
  const { t } = useTranslation()

  return (
    <section className="mb-16">
      <p className="text-[#F04438] font-[600] text-[14px] mb-2">{t('categories.label')}</p>
      <h2 className="font-[700] dark:text-white text-[28px] text-[#111927] mb-6">
        {t('categories.title')}
      </h2>
      <div className="grid grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?categoryIds=${cat.id}`}
            className="w-[170px] h-[145px] rounded-[4px] border border-[#E5E7EB] flex flex-col items-center justify-center gap-3 hover:bg-[#F04438] hover:text-white transition-colors"
          >
            {cat.imageUrl && (
              <img
                src={getImageUrl(cat.imageUrl)}
                alt={cat.name}
                className="w-16 h-16 object-contain"
              />
            )}
            <span className="text-[14px] dark:text-white font-[500]">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
