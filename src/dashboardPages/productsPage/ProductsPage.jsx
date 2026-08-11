import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../api/products";
import { getImageUrl } from "../../api/client";
import { Pencil, Trash2, Search } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import { useTranslation } from "react-i18next";
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const pageSize = 10;
  const { t } = useTranslation();

  const loadProducts = () => {
    setIsLoading(true);

    getProducts({
      page,
      pageSize,
      search: search || undefined,
    })
      .then((data) => {
        setProducts(data.items);
        setTotalCount(data.totalCount);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, [page, search]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    setSelected((prev) =>
      prev.length === products.length ? [] : products.map((p) => p.id),
    );
  };

  const handleDeleteConfirm = async () => {
    try {
      await Promise.all(selected.map((id) => deleteProduct(id)));

      setSelected([]);
      setDeleteOpen(false);
      loadProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSingleDelete = async (id) => {
    setSelected([id]);
    setDeleteOpen(true);
  };

  return (
    <div className="p-6 text-[#111927] dark:text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-[700] text-[24px] text-[#111927] dark:text-white">
          {t("products.title")}
        </h1>

        <Link
          to="/admin/products/new"
          className="bg-[#2f6fed] hover:bg-[#2560d6] text-white text-sm font-[600] px-4 py-2 rounded-lg"
        >
          + {t("products.addProduct")}
        </Link>
      </div>

      <div className="bg-white dark:bg-[#111927] border border-[#E5E7EB] dark:border-[#1F2937] rounded-[4px]">
        <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB] dark:border-[#1F2937]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#6C737F] dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

              <input
                type="text"
                placeholder={t("products.search")}
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className="h-[36px] pl-9 pr-3 rounded-md bg-[#F9FAFB] dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#1F2937] outline-none w-[220px] text-sm text-[#111927] dark:text-white placeholder:text-[#6C737F] dark:placeholder:text-slate-400"
              />
            </div>

            <select className="h-[36px] px-3 rounded-md bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#1F2937] outline-none text-sm text-[#111927] dark:text-white">
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>

          {selected.length > 0 && (
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-md border border-[#E5E7EB] dark:border-[#1F2937] hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937]">
                <Pencil className="w-4 h-4 text-[#6C737F] dark:text-slate-400" />
              </button>

              <button
                onClick={() => setDeleteOpen(true)}
                className="p-2 rounded-md border border-[#E5E7EB] dark:border-[#1F2937] hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937]"
              >
                <Trash2 className="w-4 h-4 text-[#F04438]" />
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="p-6 text-center text-[#6C737F] dark:text-slate-400">
            {t("products.loading")}
          </div>
        ) : products.length === 0 ? (
          <div className="p-6 text-center text-[#6C737F] dark:text-slate-400">
            {t("products.empty")}
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-[#E5E7EB] dark:border-[#1F2937]">
                  <th className="p-4 w-[40px]">
                    <input
                      type="checkbox"
                      checked={
                        selected.length === products.length &&
                        products.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>

                  <th className="p-4 font-[400] text-[13px] text-[#6C737F] dark:text-slate-400">
                    {t("products.product")}
                  </th>

                  <th className="p-4 font-[400] text-[13px] text-[#6C737F] dark:text-slate-400">
                    {t("products.inventory")}
                  </th>

                  <th className="p-4 font-[400] text-[13px] text-[#6C737F] dark:text-slate-400">
                    {t("products.category")}
                  </th>

                  <th className="p-4 font-[400] text-[13px] text-[#6C737F] dark:text-slate-400">
                    {t("products.price")}
                  </th>

                  <th className="p-4 font-[400] text-[13px] text-[#6C737F] dark:text-slate-400">
                    {t("products.action")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-[#F2F4F7] dark:border-[#1F2937]"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selected.includes(p.id)}
                        onChange={() => toggleSelect(p.id)}
                      />
                    </td>

                    <td className="p-4 flex items-center gap-3">
                      <div className="w-[40px] h-[40px] bg-[#F5F5F5] dark:bg-[#1F2937] rounded overflow-hidden shrink-0">
                        {p.mainImageUrl && (
                          <img
                            src={getImageUrl(p.mainImageUrl)}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <span className="text-[14px] font-[500] text-[#111927] dark:text-white">
                        {p.name}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`text-[13px] ${
                          p.inStock
                            ? "text-[#6C737F] dark:text-slate-400"
                            : "text-[#F04438]"
                        }`}
                      >
                        {p.inStock ? "In stock" : "Out of Stock"}
                      </span>
                    </td>

                    <td className="p-4 text-[14px] text-[#6C737F] dark:text-slate-400">
                      {p.brandName || "—"}
                    </td>

                    <td className="p-4 text-[14px] text-[#111927] dark:text-white">
                      ${p.effectivePrice}
                    </td>

                    <td className="p-4 flex gap-3">
                      <Link to={`/admin/products/edit/${p.id}`}>
                        <Pencil className="w-4 h-4 text-[#6C737F] dark:text-slate-400" />
                      </Link>

                      <button onClick={() => handleSingleDelete(p.id)}>
                        <Trash2 className="w-4 h-4 text-[#F04438]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-1">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1.5 border border-[#E5E7EB] dark:border-[#1F2937] rounded text-[13px] text-[#111927] dark:text-white disabled:opacity-40"
                >
                  {t("products.previous")}
                </button>

                {Array.from(
                  { length: Math.min(totalPages, 6) },
                  (_, i) => i + 1,
                ).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-[28px] h-[28px] rounded text-sm ${
                      p === page
                        ? "bg-[#2f6fed] text-white"
                        : "text-[#6C737F] dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1F2937]"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1.5 border border-[#E5E7EB] dark:border-[#1F2937] rounded text-[13px] text-[#111927] dark:text-white disabled:opacity-40"
                >
                  {t("products.next")}
                </button>
              </div>

              <span className="text-[13px] text-[#6C737F] dark:text-slate-400">
                {totalCount} {t("products.results")}
              </span>
            </div>
          </>
        )}
      </div>

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          {t("products.deleteItems")}
        </DialogTitle>

        <DialogContent>
          {t("products.deleteConfirmation")}
          {selected.length > 1 ? "s" : ""}?
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setDeleteOpen(false)}
            variant="outlined"
            sx={{ textTransform: "none" }}
          >
            {t("products.cancel")}
          </Button>

          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
          >
            {t("products.delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
