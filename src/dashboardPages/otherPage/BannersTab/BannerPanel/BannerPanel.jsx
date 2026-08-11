import React, { useEffect, useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../../../../api/banner";
import { getCategories } from "../../../../api/categories";
import { getImageUrl } from "../../../../api/client";
import { useTranslation } from "react-i18next";

const BannerPanel = () => {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);

  const [editingBannerId, setEditingBannerId] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerCategoryId, setBannerCategoryId] = useState("");
  const [bannerEndsAt, setBannerEndsAt] = useState("");
  const [bannerIsActive, setBannerIsActive] = useState(true);
  const [isSubmittingBanner, setIsSubmittingBanner] = useState(false);

  const load = () => {
    getAllBanners().then(setBanners).catch(console.error);
    getCategories({ page: 1, pageSize: 100 })
      .then((d) => setCategories(d.items))
      .catch(console.error);
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setEditingBannerId(null);
    setBannerImage(null);
    setBannerPreview(null);
    setBannerTitle("");
    setBannerCategoryId("");
    setBannerEndsAt("");
    setBannerIsActive(true);
  };

  const startEdit = (banner) => {
    setEditingBannerId(banner.id);
    setBannerImage(null);
    setBannerPreview(banner.url ? getImageUrl(banner.url) : null);
    setBannerTitle(banner.title || "");
    setBannerCategoryId(banner.categoryId || "");
    setBannerEndsAt(banner.endsAtUtc ? banner.endsAtUtc.slice(0, 16) : "");
    setBannerIsActive(banner.isActive);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBannerImage(file);
    if (file) setBannerPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!bannerEndsAt) return;
    setIsSubmittingBanner(true);
    try {
      const fd = new FormData();
      if (bannerImage) fd.append("Image", bannerImage);
      fd.append("Title", bannerTitle);
      if (bannerCategoryId) fd.append("CategoryId", bannerCategoryId);
      fd.append("EndsAtUtc", new Date(bannerEndsAt).toISOString());
      fd.append("IsActive", bannerIsActive);

      if (editingBannerId) {
        await updateBanner(editingBannerId, fd);
      } else {
        if (!bannerImage) {
          alert("Выберите картинку.");
          setIsSubmittingBanner(false);
          return;
        }
        await createBanner(fd);
      }

      resetForm();
      load();
    } catch (err) {
      console.error(err.response?.data);
      alert("Не удалось сохранить баннер.");
    } finally {
      setIsSubmittingBanner(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить баннер?")) return;
    try {
      await deleteBanner(id);
      if (editingBannerId === id) resetForm();
      load();
    } catch (err) {
      console.error(err.response?.data);
      alert("Не удалось удалить баннер.");
    }
  };
  const {t} = useTranslation();

  return (
    <div className="border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#111927] rounded-md p-4 h-fit">
      <h3 className="font-[600] text-[14px] mb-3 text-[#111927] dark:text-white">
        Banner
      </h3>

      <label className="border-2 border-dashed border-[#E5E7EB] dark:border-[#1F2937] rounded-md flex items-center justify-center h-[90px] cursor-pointer mb-3 overflow-hidden">
        {bannerPreview ? (
          <img src={bannerPreview} alt="" className="h-full object-contain" />
        ) : (
          <span className="text-[13px] text-[#2f6fed] underline">
            {t('banner.clickToUpload')}
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      <div className="space-y-2 mb-3">
        {banners.map((b) => (
          <div
            key={b.id}
            className={`flex items-center gap-3 border rounded px-3 py-2 ${
              editingBannerId === b.id
                ? "border-[#2f6fed]"
                : "border-[#E5E7EB] dark:border-[#1F2937]"
            }`}
          >
            <img
              src={getImageUrl(b.url)}
              alt=""
              className="w-10 h-8 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-[#111927] dark:text-white truncate">
                {b.title}
              </p>
              {!b.isActive && (
                <p className="text-[11px] text-[#F04438]">Inactive</p>
              )}
            </div>
            <button onClick={() => startEdit(b)}>
              <Pencil className="w-4 h-4 text-[#6C737F] dark:text-slate-400" />
            </button>
            <button onClick={() => handleDelete(b.id)}>
              <Trash2 className="w-4 h-4 text-[#F04438]" />
            </button>
          </div>
        ))}
      </div>

      <input
        placeholder={t('banner.title')}
        value={bannerTitle}
        onChange={(e) => setBannerTitle(e.target.value)}
        className="w-full border border-[#E5E7EB] dark:border-[#1F2937] bg-[#F5F5F5] dark:bg-[#1F2937] text-[#111927] dark:text-white rounded px-3 py-2 text-[14px] mb-2"
      />

      <select
        value={bannerCategoryId}
        onChange={(e) => setBannerCategoryId(e.target.value)}
        className="w-full border border-[#E5E7EB] dark:border-[#1F2937] bg-[#F5F5F5] dark:bg-[#1F2937] text-[#111927] dark:text-white rounded px-3 py-2 text-[14px] mb-2"
      >
        <option value="">No category link</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="datetime-local"
        value={bannerEndsAt}
        onChange={(e) => setBannerEndsAt(e.target.value)}
        className="w-full border border-[#E5E7EB] dark:border-[#1F2937] bg-[#F5F5F5] dark:bg-[#1F2937] text-[#111927] dark:text-white rounded px-3 py-2 text-[14px] mb-2"
      />

      <label className="flex items-center gap-2 text-[13px] mb-3 text-[#111927] dark:text-white">
        <input
          type="checkbox"
          checked={bannerIsActive}
          onChange={(e) => setBannerIsActive(e.target.checked)}
        />
        {t('banner.active')}
      </label>

      <div className="flex gap-2">
        {editingBannerId && (
          <button
            onClick={resetForm}
            className="flex items-center justify-center gap-1 border border-[#E5E7EB] dark:border-[#1F2937] text-[#111927] dark:text-white text-[14px] px-4 py-2 rounded"
          >
            <X className="w-4 h-4" /> {t('banner.cancel')}
          </button>
        )}
        <button
          onClick={handleSave}
          disabled={isSubmittingBanner}
          className="flex-1 bg-[#2f6fed] text-white text-[14px] py-2 rounded disabled:opacity-50"
        >
          {isSubmittingBanner
            ? `${t('banner.saving')}`
            : editingBannerId
              ? `${t('banner.saveChanges')}`
              : `${t('banner.save')}`}
        </button>
      </div>
    </div>
  );
};

export default BannerPanel;
