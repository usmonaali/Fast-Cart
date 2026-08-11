import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ChevronLeft, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getCategories } from "../../../api/categories";
import { getBrands } from "../../../api/brands";
import { getColors } from "../../../api/colors";
import { getTags } from "../../../api/tags";
import {
  createProduct,
  updateProduct,
  getProductById,
} from "../../../api/products";
import { getImageUrl } from "../../../api/client";

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`w-[40px] h-[22px] rounded-full transition-colors relative ${
      checked ? "bg-[#2f6fed]" : "bg-[#E5E7EB] dark:bg-[#374151]"
    }`}
  >
    <span
      className={`absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full transition-transform ${
        checked ? "translate-x-[20px]" : "translate-x-[2px]"
      }`}
    />
  </button>
);

const ProductFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { t } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [tags, setTags] = useState([]);

  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    categoryId: "",
    brandId: "",
    price: "",
    discountPercent: "0",
    stockCount: "",
    hasTax: false,
    taxRate: "0",
    condition: 1,
    isActive: true,
  });

  const [hasOptions, setHasOptions] = useState(false);
  const [selectedColorIds, setSelectedColorIds] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [options, setOptions] = useState([]);

  const [existingImages, setExistingImages] = useState([]);
  const [removedImageIds, setRemovedImageIds] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories({ page: 1, pageSize: 100 })
      .then((d) => setCategories(d.items))
      .catch(console.error);

    getBrands({ page: 1, pageSize: 100 })
      .then((d) => setBrands(d.items))
      .catch(console.error);

    getColors({ page: 1, pageSize: 100 })
      .then((d) => setColors(d.items))
      .catch(console.error);

    getTags({ page: 1, pageSize: 100 })
      .then((d) => setTags(d.items))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!isEditMode) return;

    getProductById(id)
      .then((data) => {
        setForm({
          name: data.name || "",
          code: data.code || "",
          description: data.description || "",
          categoryId: data.categoryId || "",
          brandId: data.brandId || "",
          price: data.price ?? "",
          discountPercent: String(data.discountPercent ?? "0"),
          stockCount: data.stockCount ?? "",
          hasTax: data.hasTax || false,
          taxRate: String(data.taxRate ?? "0"),
          condition: data.condition || 1,
          isActive: data.isActive ?? true,
        });

        setSelectedColorIds(data.colors?.map((c) => c.id) || []);
        setSelectedTagIds(data.tags?.map((t) => t.id) || []);
        setExistingImages(data.images || []);

        if (data.options?.length > 0) {
          setHasOptions(true);
          setOptions(
            data.options.map((opt) => ({
              name: opt.name,
              values: opt.values.map((v) => v.value),
            })),
          );
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [id, isEditMode]);

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const toggleColor = (colorId) => {
    setSelectedColorIds((prev) =>
      prev.includes(colorId)
        ? prev.filter((x) => x !== colorId)
        : [...prev, colorId],
    );
  };

  const toggleTag = (tagId) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((x) => x !== tagId)
        : [...prev, tagId],
    );
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);

    setImagePreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeNewImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imgId) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== imgId));
    setRemovedImageIds((prev) => [...prev, imgId]);
  };

  const addOption = () =>
    setOptions([...options, { name: "", values: [] }]);

  const removeOption = (i) =>
    setOptions(options.filter((_, idx) => idx !== i));

  const updateOptionName = (i, name) => {
    const next = [...options];
    next[i].name = name;
    setOptions(next);
  };

  const addOptionValue = (i, value) => {
    if (!value.trim()) return;

    const next = [...options];
    next[i].values.push(value.trim());
    setOptions(next);
  };

  const removeOptionValue = (i, j) => {
    const next = [...options];
    next[i].values = next[i].values.filter((_, idx) => idx !== j);
    setOptions(next);
  };

  const buildFormData = () => {
    const fd = new FormData();

    fd.append("Name", form.name);
    fd.append("Code", form.code);
    fd.append("Description", form.description);
    fd.append("CategoryId", form.categoryId);
    fd.append("BrandId", form.brandId);
    fd.append("Price", form.price);
    fd.append("DiscountPercent", form.discountPercent);
    fd.append("StockCount", form.stockCount);
    fd.append("HasTax", form.hasTax);
    fd.append("TaxRate", form.taxRate);
    fd.append("Condition", form.condition);

    if (!isEditMode) {
      fd.append("IsActive", form.isActive);
    }

    images.forEach((file) => fd.append("Images", file));
    selectedColorIds.forEach((cid) => fd.append("ColorIds", cid));
    selectedTagIds.forEach((tid) => fd.append("TagIds", tid));

    if (isEditMode) {
      removedImageIds.forEach((imgId) =>
        fd.append("RemoveImageIds", imgId),
      );
    }

    if (hasOptions) {
      options.forEach((opt, i) => {
        fd.append(`Options[${i}].Name`, opt.name);
        fd.append(`Options[${i}].SortOrder`, i);

        opt.values.forEach((v, j) => {
          fd.append(`Options[${i}].Values[${j}].Value`, v);
          fd.append(`Options[${i}].Values[${j}].SortOrder`, j);
        });
      });
    }

    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.stockCount) {
      setError("Заполните поле Count (количество на складе).");
      return;
    }

    setIsSubmitting(true);

    try {
      const fd = buildFormData();

      if (isEditMode) {
        await updateProduct(id, fd);
      } else {
        await createProduct(fd);
      }

      navigate("/admin/products");
    } catch (err) {
      console.error(err.response?.data);

      const serverErrors = err.response?.data?.errors;

      setError(
        serverErrors
          ? Object.values(serverErrors).flat()[0]
          : "Не удалось сохранить товар.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 text-[#111927] dark:text-white">
        {t("productsForm.loading")}
      </div>
    );
  }

  return (
    <div className="p-6 text-[#111927] dark:text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ChevronLeft
            className="w-5 h-5 cursor-pointer"
            onClick={() => navigate("/admin/products")}
          />

          <h1 className="font-[700] text-[24px]">
            {t("productsForm.productsSlash")} {isEditMode ? t("productsForm.edit") : t("productsForm.addNew")}
          </h1>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="border border-[#E5E7EB] dark:border-[#1F2937] text-[#111927] dark:text-white px-4 py-2 rounded"
        >
          {t("productsForm.cancel")}
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-[1.4fr_1fr] gap-10"
      >
        <div>
          <div className="border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#111927] rounded-md p-5 mb-6">
            <h2 className="font-[600] text-[16px] mb-4">
              {t("productsForm.information")}
            </h2>

            <div className="grid grid-cols-[2fr_1fr] gap-3 mb-3">
              <input
                placeholder={t("productsForm.productName")}
                value={form.name}
                onChange={handleChange("name")}
                required
                className="border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#1F2937] text-[#111927] dark:text-white placeholder:text-[#6C737F] dark:placeholder:text-slate-400 rounded px-3 py-2 text-[14px] outline-none"
              />

              <input
                placeholder={t("productsForm.code")}
                value={form.code}
                onChange={handleChange("code")}
                className="border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#1F2937] text-[#111927] dark:text-white placeholder:text-[#6C737F] dark:placeholder:text-slate-400 rounded px-3 py-2 text-[14px] outline-none"
              />
            </div>

            <textarea
              placeholder={t("productsForm.description")}
              value={form.description}
              onChange={handleChange("description")}
              rows={5}
              className="w-full border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#1F2937] text-[#111927] dark:text-white placeholder:text-[#6C737F] dark:placeholder:text-slate-400 rounded px-3 py-2 text-[14px] mb-3 outline-none"
            />

            <div className="grid grid-cols-2 gap-3">
              <select
                value={form.categoryId}
                onChange={handleChange("categoryId")}
                required
                className="border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#1F2937] text-[#111927] dark:text-white rounded px-3 py-2 text-[14px] outline-none"
              >
                <option value="">{t("productsForm.categories")}</option>

                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                value={form.brandId}
                onChange={handleChange("brandId")}
                required
                className="border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#1F2937] text-[#111927] dark:text-white rounded px-3 py-2 text-[14px] outline-none"
              >
                <option value="">{t("productsForm.brands")}</option>

                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#111927] rounded-md p-5 mb-6">
            <h2 className="font-[600] text-[16px] mb-4">
              {t("productsForm.price")}
            </h2>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <input
                type="number"
                placeholder={t("productsForm.productPrice")}
                value={form.price}
                onChange={handleChange("price")}
                required
                className="border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#1F2937] text-[#111927] dark:text-white placeholder:text-[#6C737F] dark:placeholder:text-slate-400 rounded px-3 py-2 text-[14px] outline-none"
              />

              <input
                type="number"
                placeholder={t("productsForm.discount")}
                value={form.discountPercent}
                onChange={handleChange("discountPercent")}
                className="border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#1F2937] text-[#111927] dark:text-white placeholder:text-[#6C737F] dark:placeholder:text-slate-400 rounded px-3 py-2 text-[14px] outline-none"
              />

              <input
                type="number"
                placeholder={t("productsForm.count")}
                value={form.stockCount}
                onChange={handleChange("stockCount")}
                required
                className="border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#1F2937] text-[#111927] dark:text-white placeholder:text-[#6C737F] dark:placeholder:text-slate-400 rounded px-3 py-2 text-[14px] outline-none"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-[14px]">
                {t("productsForm.addTax")}
              </span>

              <Toggle
                checked={form.hasTax}
                onChange={(v) => setForm({ ...form, hasTax: v })}
              />
            </div>

            {form.hasTax && (
              <input
                type="number"
                placeholder={t("productsForm.taxRate")}
                value={form.taxRate}
                onChange={handleChange("taxRate")}
                className="w-full border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#1F2937] text-[#111927] dark:text-white placeholder:text-[#6C737F] dark:placeholder:text-slate-400 rounded px-3 py-2 text-[14px] mt-2 outline-none"
              />
            )}

            {isEditMode && (
              <div className="flex items-center justify-between py-2 mt-2 border-t border-[#E5E7EB] dark:border-[#1F2937] pt-4">
                <span className="text-[14px]">
                  {t("productsForm.active")}
                </span>

                <Toggle
                  checked={form.isActive}
                  onChange={(v) =>
                    setForm({ ...form, isActive: v })
                  }
                />
              </div>
            )}
          </div>

          <div className="border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#111927] rounded-md p-5">
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="text-[14px] font-[500] block">
                  {t("productsForm.differentOptions")}
                </span>

                <span className="text-[12px] text-[#6C737F] dark:text-slate-400">
                  {t("productsForm.multipleOptions")}
                </span>
              </div>

              <Toggle
                checked={hasOptions}
                onChange={setHasOptions}
              />
            </div>

            {hasOptions && (
              <div className="mt-4 space-y-4">
                {options.map((opt, i) => (
                  <div
                    key={i}
                    className="border-t border-[#E5E7EB] dark:border-[#1F2937] pt-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        placeholder={`${t("productsForm.option")} ${i + 1} (${t("productsForm.size")})`}
                        value={opt.name}
                        onChange={(e) =>
                          updateOptionName(i, e.target.value)
                        }
                        className="flex-1 border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#1F2937] text-[#111927] dark:text-white placeholder:text-[#6C737F] dark:placeholder:text-slate-400 rounded px-3 py-1.5 text-[13px] outline-none"
                      />

                      <button
                        type="button"
                        onClick={() => removeOption(i)}
                        className="text-[#F04438] text-[13px]"
                      >
                        {t("productsForm.remove")}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                      {opt.values.map((v, j) => (
                        <span
                          key={j}
                          className="flex items-center gap-1 bg-[#F2F4F7] dark:bg-[#1F2937] text-[#111927] dark:text-white text-[13px] px-2 py-1 rounded"
                        >
                          {v}

                          <X
                            className="w-3 h-3 cursor-pointer"
                            onClick={() =>
                              removeOptionValue(i, j)
                            }
                          />
                        </span>
                      ))}

                      <input
                        placeholder={t("productsForm.enterValue")}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addOptionValue(i, e.target.value);
                            e.target.value = "";
                          }
                        }}
                        className="border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#1F2937] text-[#111927] dark:text-white placeholder:text-[#6C737F] dark:placeholder:text-slate-400 rounded px-2 py-1 text-[13px] w-[140px] outline-none"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addOption}
                  className="text-[#2f6fed] text-[13px]"
                >
                  {t("productsForm.addMore")}
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#111927] rounded-md p-5 mb-6">
            <h2 className="font-[600] text-[16px] mb-4">
              {t("productsForm.colour")}
            </h2>

            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => toggleColor(color.id)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColorIds.includes(color.id)
                      ? "border-[#2f6fed]"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.hexCode }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#111927] rounded-md p-5 mb-6">
            <h2 className="font-[600] text-[16px] mb-4">
              {t("productsForm.tags")}
            </h2>

            <div className="flex flex-wrap gap-2 mb-3">
              {selectedTagIds.map((tid) => {
                const tag = tags.find((t) => t.id === tid);

                if (!tag) return null;

                return (
                  <span
                    key={tid}
                    className="flex items-center gap-1 bg-[#EFF6FF] dark:bg-[#1F2937] text-[#2f6fed] text-[13px] px-2 py-1 rounded"
                  >
                    {tag.name}

                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => toggleTag(tid)}
                    />
                  </span>
                );
              })}
            </div>

            <input
              placeholder={t("productsForm.tagsName")}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="w-full border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#1F2937] text-[#111927] dark:text-white placeholder:text-[#6C737F] dark:placeholder:text-slate-400 rounded px-3 py-2 text-[14px] mb-2 outline-none"
            />

            <div className="flex flex-wrap gap-2">
              {tags
                .filter((t) =>
                  t.name
                    .toLowerCase()
                    .includes(tagInput.toLowerCase()),
                )
                .slice(0, 8)
                .map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`px-3 py-1 rounded-full text-[13px] border ${
                      selectedTagIds.includes(tag.id)
                        ? "bg-[#2f6fed] text-white border-[#2f6fed]"
                        : "border-[#E5E7EB] dark:border-[#1F2937] text-[#111927] dark:text-white"
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
            </div>
          </div>

          <div className="border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#111927] rounded-md p-5">
            <h2 className="font-[600] text-[16px] mb-4">
              {t("productsForm.images")}
            </h2>

            {existingImages.length > 0 && (
              <div className="space-y-2 mb-4">
                {existingImages.map((img) => (
                  <div
                    key={img.id}
                    className="flex items-center gap-3 border border-[#E5E7EB] dark:border-[#1F2937] rounded px-3 py-2"
                  >
                    <img
                      src={getImageUrl(img.url)}
                      alt=""
                      className="w-8 h-8 object-cover rounded"
                    />

                    <span className="text-[13px] text-[#111927] dark:text-white flex-1 truncate">
                      {img.isMain ? t("productsForm.mainImage") : t("productsForm.image")}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeExistingImage(img.id)
                      }
                    >
                      <X className="w-4 h-4 text-[#F04438]" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label className="border-2 border-dashed border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#1F2937] rounded-md flex flex-col items-center justify-center h-[110px] cursor-pointer mb-4">
              <span className="text-[13px] text-[#2f6fed] underline">
                {t("productsForm.clickToUpload")}
              </span>

              <span className="text-[12px] text-[#6C737F] dark:text-slate-400">
                {t("productsForm.dragAndDrop")}
              </span>

              <span className="text-[11px] text-[#6C737F] dark:text-slate-400">
                {t("productsForm.imageRequirements")}
              </span>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImagesChange}
                className="hidden"
              />
            </label>

            {imagePreviews.length > 0 && (
              <div className="space-y-2">
                {imagePreviews.map((src, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 border border-[#E5E7EB] dark:border-[#1F2937] rounded px-3 py-2"
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-8 h-8 object-cover rounded"
                    />

                    <span className="text-[13px] text-[#111927] dark:text-white flex-1 truncate">
                      {images[i]?.name}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeNewImage(i)}
                    >
                      <X className="w-4 h-4 text-[#F04438]" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {error && (
          <p className="col-span-2 text-[13px] text-red-500">
            {error}
          </p>
        )}

        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#2f6fed] text-white text-[14px] px-6 py-2 rounded disabled:opacity-50"
          >
            {isSubmitting ? t("productsForm.saving") : t("productsForm.save")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;