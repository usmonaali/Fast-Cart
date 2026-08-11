import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import ProductCard from "../../MarketComponents/ProductCard/ProductCard";
import ProductFilters from "../../MarketComponents/ProductFilters/ProductFilters";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "popular", label: "Popularity" },
  { value: "rating", label: "Rating" },
  { value: "name", label: "Name" },
];

const CatalogPage = () => {
  const [searchParams] = useSearchParams();
  const initialCategoryId = searchParams.get("categoryIds");

  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState(
    initialCategoryId ? { categoryIds: [initialCategoryId] } : {},
  );
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    getProducts({ page, pageSize, sortBy, ...filters })
      .then((data) => {
        setProducts(data.items);
        setTotalCount(data.totalCount);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [filters, sortBy, page]);

  const handleFiltersChange = (next) => {
    setFilters(next);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="max-w-[1170px] mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-[700] text-[24px] dark:text-white text-[#111927]">
          {t("catalog.title")}
        </h1>

        <div className="flex items-center gap-3">
          <span className="text-[13px] text-[#6C737F]">
            {t("catalog.showing")} {products.length} {t("catalog.of")}{" "}
            {totalCount} {t("catalog.results")}
          </span>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border border-[#E5E7EB] rounded px-3 py-2 text-[13px] outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-10">
        <ProductFilters selected={filters} onChange={handleFiltersChange} />

        <div className="flex-1">
          {isLoading ? (
            <p>{t("catalog.loading")}</p>
          ) : products.length === 0 ? (
            <p className="text-[#6C737F]">Товары не найдены.</p>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-x-6 gap-y-10 mb-10">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1.5 border border-[#E5E7EB] rounded text-[13px] disabled:opacity-40"
                >
                  {t("catalog.prev")}
                </button>
                {Array.from(
                  { length: Math.min(totalPages, 6) },
                  (_, i) => i + 1,
                ).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-[32px] h-[32px] rounded text-[13px] ${
                      p === page
                        ? "bg-[#F04438] text-white"
                        : "text-[#6C737F] hover:bg-slate-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1.5 border border-[#E5E7EB] rounded text-[13px] disabled:opacity-40"
                >
                  {t("catalog.next")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
