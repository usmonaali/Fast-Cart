import React, { useEffect, useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  DISCOUNT_TYPE,
} from "../../../api/coupons";
import { useTranslation } from "react-i18next";

const emptyForm = {
  code: "",
  discountType: 1,
  value: "",
  minOrderAmount: "",
  maxDiscountAmount: "",
  startsAt: "",
  expiresAt: "",
  usageLimit: "",
  isActive: true,
};

const CouponsTab = () => {
  const [coupons, setCoupons] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const load = () => {
    getCoupons({ page: 1, pageSize: 50 })
      .then((d) => setCoupons(d.items))
      .catch(console.error);
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [field]: value });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const startEdit = (coupon) => {
    setEditingId(coupon.id);
    setForm({
      code: coupon.code ?? "",
      discountType: coupon.discountType ?? 1,
      value: coupon.value ?? "",
      minOrderAmount: coupon.minOrderAmount ?? "",
      maxDiscountAmount: coupon.maxDiscountAmount ?? "",
      startsAt: coupon.startsAt ? coupon.startsAt.slice(0, 16) : "",
      expiresAt: coupon.expiresAt ? coupon.expiresAt.slice(0, 16) : "",
      usageLimit: coupon.usageLimit ?? "",
      isActive: coupon.isActive ?? true,
    });
  };

  const handleSave = async () => {
    if (!form.code || !form.startsAt || !form.expiresAt) return;
    setIsSubmitting(true);
    try {
      const payload = {
        code: form.code,
        discountType: Number(form.discountType),
        value: Number(form.value) || 0,
        minOrderAmount: Number(form.minOrderAmount) || 0,
        maxDiscountAmount: Number(form.maxDiscountAmount) || 0,
        startsAt: new Date(form.startsAt).toISOString(),
        expiresAt: new Date(form.expiresAt).toISOString(),
        usageLimit: Number(form.usageLimit) || 0,
        isActive: form.isActive,
      };

      if (editingId) {
        await updateCoupon(editingId, payload);
      } else {
        await createCoupon(payload);
      }

      resetForm();
      load();
    } catch (err) {
      console.error(err.response?.data);
      alert("Не удалось сохранить купон.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить купон?")) return;
    try {
      await deleteCoupon(id);
      if (editingId === id) resetForm();
      load();
    } catch (err) {
      console.error(err.response?.data);
      alert("Не удалось удалить купон.");
    }
  };
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-[1.4fr_1fr] gap-8">
      <div className="border border-[#E5E7EB] rounded-md">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-[#E5E7EB]">
              <th className="p-3 dark:text-white text-[13px] text-[#6C737F]">
                {t("coupon.code")}
              </th>
              <th className="p-3 dark:text-white text-[13px] text-[#6C737F]">
                {t("coupon.type")}
              </th>
              <th className="p-3 dark:text-white text-[13px] text-[#6C737F]">
                {t("coupon.value")}
              </th>
              <th className="p-3 dark:text-white text-[13px] text-[#6C737F]">
                {t("coupon.used")}
              </th>
              <th className="p-3 dark:text-white text-[13px] text-[#6C737F]">
                {t("coupon.status")}
              </th>
              <th className="p-3 dark:text-white text-[13px] text-[#6C737F]">
                {t("coupon.action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.id} className="border-b border-[#F2F4F7]">
                <td className="p-3 text-[14px] dark:text-white font-[500]">
                  {c.code}
                </td>
                <td className="p-3 text-[13px] dark:text-white text-[#6C737F]">
                  {DISCOUNT_TYPE[c.discountType]}
                </td>
                <td className="p-3 dark:text-white text-[14px]">
                  {c.discountType === 1 ? `${c.value}%` : `$${c.value}`}
                </td>
                <td className="p-3 dark:text-white text-[13px] text-[#6C737F]">
                  {c.usedCount}/{c.usageLimit || "∞"}
                </td>
                <td className="p-3">
                  {c.isExpired ? (
                    <span className="text-[12px] px-2 py-1 rounded bg-[#F2F4F7] text-[#6C737F]">
                      {t("coupon.expired")}
                    </span>
                  ) : c.isActive ? (
                    <span className="text-[12px] px-2 py-1 rounded bg-[#ECFDF3] text-[#22C55E]">
                      {t("coupon.active")}
                    </span>
                  ) : (
                    <span className="text-[12px] px-2 py-1 rounded bg-[#FEF3F2] text-[#F04438]">
                      {t("coupon.inactive")}
                    </span>
                  )}
                </td>
                <td className="p-3 flex gap-3">
                  <button onClick={() => startEdit(c)}>
                    <Pencil className="w-4 h-4 text-[#6C737F]" />
                  </button>
                  <button onClick={() => handleDelete(c.id)}>
                    <Trash2 className="w-4 h-4 text-[#F04438]" />
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-[13px] text-[#6C737F]"
                >
                  {t("coupon.noCoupons")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border border-[#E5E7EB] rounded-md p-4 h-fit">
        <h3 className="font-[600] dark:text-white text-[16px] mb-4">
          {editingId ? `${t("coupon.editCoupon")}` : `${t("coupon.addCoupon")}`}
        </h3>

        <input
          placeholder={t("coupon.codePlaceholder")}
          value={form.code}
          onChange={handleChange("code")}
          className="w-full border dark:text-white border-[#E5E7EB] rounded px-3 py-2 text-[14px] mb-3"
        />

        <select
          value={form.discountType}
          onChange={handleChange("discountType")}
          className="w-full border border-[#E5E7EB] dark:text-white rounded px-3 py-2 text-[14px] mb-3"
        >
          <option className={`dark:bg-[green]`} value={1}>
            {t("coupon.percentage")} (%)
          </option>
          <option className={`dark:bg-[green]`} value={2}>
            {t("coupon.fixedAmount")} ($)
          </option>
        </select>

        <input
          type="number"
          placeholder={
            form.discountType == 1
              ? `${t("coupon.discountPercent")}`
              : `${t("coupon.discountAmount")}`
          }
          value={form.value}
          onChange={handleChange("value")}
          className="w-full border border-[#E5E7EB] rounded px-3 py-2 text-[14px] mb-3 dark:text-white"
        />

        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            type="number"
            placeholder={t("coupon.minOrder")}
            value={form.minOrderAmount}
            onChange={handleChange("minOrderAmount")}
            className="border border-[#E5E7EB] rounded dark:text-white px-3 py-2 text-[14px]"
          />
          <input
            type="number"
            placeholder={t("coupon.maxDiscount")}
            value={form.maxDiscountAmount}
            onChange={handleChange("maxDiscountAmount")}
            className="border dark:text-white border-[#E5E7EB] rounded px-3 py-2 text-[14px]"
          />
        </div>

        <label className="text-[12px] dark:text-white text-[#6C737F] block mb-1">
          {t("coupon.startsAt")}
        </label>
        <input
          type="datetime-local"
          value={form.startsAt}
          onChange={handleChange("startsAt")}
          className="w-full border dark:text-white border-[#E5E7EB] rounded px-3 py-2 text-[14px] mb-3"
        />

        <label className="text-[12px] text-[#6C737F] dark:text-white block mb-1">
          {t("coupon.expiresAt")}
        </label>
        <input
          type="datetime-local"
          value={form.expiresAt}
          onChange={handleChange("expiresAt")}
          className="w-full border border-[#E5E7EB] rounded px-3 py-2 dark:text-white text-[14px] mb-3"
        />

        <input
          type="number"
          placeholder={t("coupon.usageLimit")}
          value={form.usageLimit}
          onChange={handleChange("usageLimit")}
          className="w-full border border-[#E5E7EB] rounded px-3 py-2 text-[14px] mb-3 dark:text-white"
        />

        <label className="flex items-center gap-2 text-[13px] mb-4 dark:text-white">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={handleChange("isActive")}
          />
          {t("coupon.activeCheckbox")}
        </label>

        <div className="flex gap-2">
          {editingId && (
            <button
              onClick={resetForm}
              className="flex items-center justify-center gap-1 border dark:text-white border-[#E5E7EB] text-[14px] px-4 py-2 rounded"
            >
              <X className="w-4 h-4" /> {t("coupon.cancel")}
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className="flex-1 bg-[#2f6fed] text-white text-[14px] py-2 rounded disabled:opacity-50"
          >
            {isSubmitting
              ? `${t("coupon.saving")}`
              : editingId
                ? `${t("coupon.saveChanges")}`
                : `${t("coupon.save")}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponsTab;
