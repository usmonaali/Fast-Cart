import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../api/categories";
import { getImageUrl } from "../../../api/client";
import { useTranslation } from "react-i18next";

const CategoriesTab = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const load = () => {
    getCategories({ page: 1, pageSize: 50 })
      .then((d) => setCategories(d.items))
      .catch(console.error);
  };

  useEffect(() => {
    load();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setName("");
    setImage(null);
    setPreview(null);
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingId(cat.id);
    setName(cat.name);
    setImage(null);
    setPreview(cat.imageUrl ? getImageUrl(cat.imageUrl) : null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!name) return;

    setIsSubmitting(true);

    try {
      const fd = new FormData();

      fd.append("Name", name);

      if (image) {
        fd.append("Image", image);
      }

      if (editingId) {
        await updateCategory(editingId, fd);
      } else {
        await createCategory(fd);
      }

      setModalOpen(false);
      load();
    } catch (err) {
      console.error(err.response?.data);
      alert("Не удалось сохранить категорию.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить категорию?")) return;

    try {
      await deleteCategory(id);
      load();
    } catch (err) {
      console.error(err.response?.data);

      alert(
        err.response?.data?.message ||
          "Не удалось удалить — возможно, в категории есть товары.",
      );
    }
  };
  const {t} = useTranslation()
  return (
    <div className="text-[#111927] dark:text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-[700] text-[24px]">{t('categories.categories')}</h1>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-[#2f6fed] text-white text-[14px] px-4 py-2 rounded"
        >
          <Plus className="w-4 h-4" />
          {t('categories.addNew')}
        </button>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="w-[170px] h-[145px] rounded-[4px] border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#111927] overflow-hidden relative group"
          >
            <button
              onClick={() => openEditModal(cat)}
              className="absolute top-2 right-2 bg-white/90 dark:bg-[#111927]/90 rounded-full p-1 opacity-0 group-hover:opacity-100 z-10"
            >
              <Pencil className="w-3 h-3 text-[#6C737F] dark:text-slate-400" />
            </button>

            <button
              onClick={() => handleDelete(cat.id)}
              className="absolute top-2 right-9 bg-white/90 dark:bg-[#111927]/90 rounded-full p-1 opacity-0 group-hover:opacity-100 z-10"
            >
              <Trash2 className="w-3 h-3 text-[#F04438]" />
            </button>

            {cat.imageUrl ? (
              <img
                src={getImageUrl(cat.imageUrl)}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#F5F5F5] dark:bg-[#1F2937]" />
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[13px] text-center py-1.5">
              {cat.name}
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#111927] text-[#111927] dark:text-white rounded-md p-6 w-[360px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-[600] text-[16px]">
                {editingId ? `${t('categories.editCategory')}` : `${t('categories.addCategory')}`}
              </h3>

              <button
                onClick={() => setModalOpen(false)}
                className="text-[#6C737F] dark:text-slate-400"
              >
                ✕
              </button>
            </div>

            <input
              placeholder={t('categories.categoryName')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#1F2937] text-[#111927] dark:text-white placeholder:text-[#6C737F] dark:placeholder:text-slate-400 rounded px-3 py-2 text-[14px] mb-4 outline-none"
            />

            <label className="border-2 border-dashed border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#1F2937] rounded-md flex flex-col items-center justify-center h-[100px] cursor-pointer mb-4 overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[13px] text-[#2f6fed] underline">
                  {t('categories.clickToUpload')}
                </span>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="border border-[#E5E7EB] dark:border-[#1F2937] text-[#111927] dark:text-white text-[14px] px-4 py-2 rounded"
              >
                {t('categories.cancel')}
              </button>

              <button
                onClick={handleSave}
                disabled={isSubmitting}
                className="bg-[#2f6fed] text-white text-[14px] px-4 py-2 rounded disabled:opacity-50"
              >
                {isSubmitting ? `${t('categories.saving')}` : editingId ? `${t('categories.save')}` : `${t('categories.create')}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesTab;
