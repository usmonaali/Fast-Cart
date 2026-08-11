import React, { useEffect, useState } from "react";
import { Pencil, Trash2, X, Check } from "lucide-react";
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../../../api/brands";
import { useTranslation } from "react-i18next";

const BrandsTab = () => {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const load = () => {
    getBrands({ page: 1, pageSize: 50 })
      .then((d) => setBrands(d.items))
      .catch(console.error);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    if (!name) return;
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("Name", name);
      await createBrand(fd);
      setName("");
      load();
    } catch (err) {
      console.error(err.response?.data);
      alert("Не удалось создать бренд.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`${t('brands.deleteBrand')}`)) return;
    try {
      await deleteBrand(id);
      load();
    } catch (err) {
      console.error(err.response?.data);
      alert(
        err.response?.data?.message ||
          `${t('brands.deleteBrandError')}`,
      );
    }
  };

  const startEdit = (brand) => {
    setEditingId(brand.id);
    setEditName(brand.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const saveEdit = async (id) => {
    if (!editName.trim()) return;
    setIsSaving(true);
    try {
      const fd = new FormData();
      fd.append("Name", editName);
      await updateBrand(id, fd);
      setEditingId(null);
      load();
    } catch (err) {
      console.error(err.response?.data);
      alert("Не удалось изменить бренд.");
    } finally {
      setIsSaving(false);
    }
  };
  const {t} = useTranslation();
  return (
    <div className="grid grid-cols-2 gap-8 max-w-[700px]">
      <div className="border border-[#E5E7EB] dark:text-white rounded-md">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b dark:text-white border-[#E5E7EB]">
              <th className="p-3 text-[13px]  dark:text-white text-[#6C737F]">{t('brands.brands')}</th>
              <th className="p-3 text-[13px]  dark:text-white text-[#6C737F]">{t('brands.action')}</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b) => (
              <tr key={b.id} className="border-b border-[#F2F4F7]">
                <td className="p-3 dark:text-white text-[14px]">
                  {editingId === b.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      autoFocus
                      className="border border-[#E5E7EB] rounded px-2 py-1 text-[14px] w-full"
                    />
                  ) : (
                    b.name
                  )}
                </td>
                <td className="p-3 flex gap-3">
                  {editingId === b.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(b.id)}
                        disabled={isSaving}
                      >
                        <Check className="w-4 h-4 text-[#22C55E]" />
                      </button>
                      <button onClick={cancelEdit}>
                        <X className="w-4 h-4 text-[#6C737F]" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(b)}>
                        <Pencil className="w-4 h-4 text-[#6C737F]" />
                      </button>
                      <button onClick={() => handleDelete(b.id)}>
                        <Trash2 className="w-4 h-4 text-[#F04438]" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border border-[#E5E7EB] rounded-md p-4 h-fit">
        <h3 className="font-[600] text-[14px] dark:text-white mb-3">{t('brands.addNewBrand')}</h3>
        <input
          placeholder={t('brands.brandName')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-[#E5E7EB] dark:text-white rounded px-3 py-2 text-[14px] mb-3"
        />
        <button
          onClick={handleCreate}
          disabled={isSubmitting}
          className="w-full bg-[#2f6fed] text-white text-[14px] py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? `${t('brands.creating')}` : `${t('brands.create')}`}
        </button>
      </div>
    </div>
  );
};

export default BrandsTab;
