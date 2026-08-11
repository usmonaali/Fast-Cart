import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/categories";
import { getProductFilters } from "../../api/filters";
import { useTranslation } from "react-i18next";

const ProductFilters = ({ selected, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 0,
    brands: [],
    colors: [],
    tags: [],
  });
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    getCategories({ page: 1, pageSize: 50 })
      .then((data) => setCategories(data.items))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getProductFilters(selected.categoryIds?.[0])
      .then((data) => {
        setFilters(data);
        setMinPrice(data.minPrice);
        setMaxPrice(data.maxPrice);
      })
      .catch((err) => console.error(err));
  }, [selected.categoryIds]);

  const toggleInArray = (key, id) => {
    const current = selected[key] || [];
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    onChange({ ...selected, [key]: next });
  };

  const applyPriceRange = () => {
    onChange({
      ...selected,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    });
  };
  const { t } = useTranslation();

  return (
    <aside className="w-[260px] shrink-0">
      <div className="mb-8">
        <h3 className="font-[600] text-[16px] text-[#111927] dark:text-white mb-3">
          {t("filters.category")}
        </h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.id}>
              <label className="flex dark:text-white items-center justify-between text-[14px] text-[#6C737F] cursor-pointer">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={(selected.categoryIds || []).includes(cat.id)}
                    onChange={() => toggleInArray("categoryIds", cat.id)}
                  />
                  {cat.name}
                </span>
                <span className="text-[12px] text-slate-400">
                  {cat.productCount}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {filters.brands.length > 0 && (
        <div className="mb-8">
          <h3 className="font-[600] text-[16px] dark:text-white text-[#111927] mb-3">
            {t("filters.brands")}
          </h3>
          <ul className="space-y-2">
            {filters.brands.map((brand) => (
              <li key={brand.id}>
                <label className="flex items-center dark:text-white justify-between text-[14px] text-[#6C737F] cursor-pointer">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={(selected.brandIds || []).includes(brand.id)}
                      onChange={() => toggleInArray("brandIds", brand.id)}
                    />
                    {brand.name}
                  </span>
                  <span className="text-[12px] text-slate-400">
                    {brand.productCount}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
      {filters.colors.length > 0 && (
        <div className="mb-8">
          <h3 className="font-[600] text-[16px] dark:text-white text-[#111927] mb-3">
            {t("filters.colors")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {filters.colors.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => toggleInArray("colorIds", color.id)}
                className={`w-6 h-6 rounded-full border-2 ${
                  (selected.colorIds || []).includes(color.id)
                    ? "border-[#2f6fed]"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color.hexCode }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {filters.tags.length > 0 && (
        <div className="mb-8">
          <h3 className="font-[600] text-[16px] dark:text-white text-[#111927] mb-3">
            {t("filters.features")}
          </h3>
          <ul className="space-y-2">
            {filters.tags.map((tag) => (
              <li key={tag.id}>
                <label className="flex items-center dark:text-white justify-between text-[14px] text-[#6C737F] cursor-pointer">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={(selected.tagIds || []).includes(tag.id)}
                      onChange={() => toggleInArray("tagIds", tag.id)}
                    />
                    {tag.name}
                  </span>
                  <span className="text-[12px] text-slate-400">
                    {tag.productCount}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-8">
        <h3 className="font-[600] text-[16px] text-[#111927] dark:text-white mb-3">
          {t("filters.priceRange")}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="number"
            placeholder={t("filters.min")}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border border-[#E5E7EB] dark:text-white rounded px-2 py-1 text-[13px]"
          />
          <span className="text-slate-400">—</span>
          <input
            type="number"
            placeholder={t("filters.max")}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border border-[#E5E7EB] rounded px-2 py-1 dark:text-white text-[13px]"
          />
        </div>
        <button
          onClick={applyPriceRange}
          className="w-full border border-[#F04438] text-[#F04438] text-[13px] font-[500] py-2 rounded"
        >
          {t("filters.apply")}
        </button>
      </div>
    </aside>
  );
};

export default ProductFilters;
