import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../../api/cart";
import { checkout } from "../../api/orders";
import { axiosRequest } from "../../api/client";
import { getImageUrl } from "../../api/client";
import { useTranslation } from "react-i18next";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    apartment: "",
    town: "",
    phoneNumber: "",
    email: "",
    paymentMethod: 1,
  });

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const {t} = useTranslation()

  useEffect(() => {
    getCart()
      .then((data) => {
        if (!data.items || data.items.length === 0) {
          navigate("/cart");
          return;
        }
        setCart(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [navigate]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleApplyCoupon = async () => {
    setCouponError("");
    try {
      await axiosRequest.post("/Cart/apply-coupon", { code: couponCode });
      const data = await getCart();
      setCart(data);
    } catch (err) {
      setCouponError(err.response?.data?.message || `${t('checkout.couponInvalid')}`);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const order = await checkout(form);
      navigate("/", { state: { orderPlaced: order.orderNumber } });
    } catch (err) {
      console.error(err.response?.data);
      const serverErrors = err.response?.data?.errors;
      if (serverErrors) {
        const firstMessage = Object.values(serverErrors).flat()[0];
        setError(firstMessage || `${t('checkout.checkFields')}`);
      } else if (err.response?.status === 409) {
        setError(
          err.response.data?.message ||
            `${t('checkout.notEnoughStock')}`,
        );
      } else {
        setError(`${t('checkout.orderFailed')}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading)
    return <div className="max-w-[1170px] mx-auto px-4 py-10">{t('checkout.loading')}</div>;
  if (!cart) return null;
    
  return (
    <div className="max-w-[1170px] mx-auto px-4 py-10">
      <p className="text-[13px] dark:text-white text-[#6C737F] mb-8">
        <Link to="/products">{t('checkout.breadcrumbProduct')}</Link> / <Link to="/cart">{t('checkout.breadcrumbViewCart')}</Link>{" "}
        / <span className="text-[#111927] dark:text-white">{t('checkout.breadcrumbCheckout')}</span>
      </p>

      <h1 className="font-[600] text-[28px] text-[#111927] dark:text-white mb-8">
        {t('checkout.billingDetails')}
      </h1>

      <div className="grid grid-cols-2 gap-16">
        <form onSubmit={handlePlaceOrder} id="checkout-form">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              placeholder={t('checkout.firstName')}
              value={form.firstName}
              onChange={handleChange("firstName")}
              required
              className="border border-[#E5E7EB] rounded px-4 py-3 text-[14px] outline-none"
            />
            <input
              placeholder={t('checkout.lastName')}
              value={form.lastName}
              onChange={handleChange("lastName")}
              required
              className="border border-[#E5E7EB] rounded px-4 py-3 text-[14px] outline-none"
            />
          </div>

          <input
            placeholder={t('checkout.streetAddress')}
            value={form.streetAddress}
            onChange={handleChange("streetAddress")}
            required
            className="w-full border border-[#E5E7EB] rounded px-4 py-3 text-[14px] outline-none mb-4"
          />

          <input
            placeholder={t('checkout.apartment')}
            value={form.apartment}
            onChange={handleChange("apartment")}
            className="w-full border border-[#E5E7EB] rounded px-4 py-3 text-[14px] outline-none mb-4"
          />

          <input
            placeholder={t('checkout.townCity')}
            value={form.town}
            onChange={handleChange("town")}
            required
            className="w-full border border-[#E5E7EB] rounded px-4 py-3 text-[14px] outline-none mb-4"
          />

          <input
            placeholder={t('checkout.phoneNumber')}
            value={form.phoneNumber}
            onChange={handleChange("phoneNumber")}
            required
            className="w-full border border-[#E5E7EB] rounded px-4 py-3 text-[14px] outline-none mb-4"
          />

          <input
            type="email"
            placeholder={t('checkout.emailAddress')}
            value={form.email}
            onChange={handleChange("email")}
            required
            className="w-full border border-[#E5E7EB] rounded px-4 py-3 text-[14px] outline-none mb-6"
          />

          <label className="flex items-center gap-2 text-[13px] text-[#6C737F]">
            <input type="checkbox" defaultChecked />
            {t('checkout.saveInformation')}
          </label>
        </form>

        <div>
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] bg-[#F5F5F5] rounded flex items-center justify-center overflow-hidden">
                  {item.productImageUrl && (
                    <img
                      src={getImageUrl(item.productImageUrl)}
                      alt={item.productName}
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>
                <span className="text-[14px] dark:text-white text-[#111927]">
                  {item.productName}
                </span>
              </div>
              <span className="text-[14px] text-[#111927] dark:text-white">
                ${item.lineTotal}
              </span>
            </div>
          ))}

          <div className="border-t border-[#E5E7EB] pt-4 mt-4">
            <div className="flex justify-between text-[14px] mb-2">
              <span className="text-[#6C737F] dark:text-white">{t('checkout.subtotal')}</span>
              <span className={`dark:text-white`}>${cart.subtotal}</span>
            </div>
            <div className="flex justify-between text-[14px] mb-2">
              <span className="text-[#6C737F] dark:text-white">{t('checkout.shipping')}</span>
              <span className={`dark:text-white`}>
                {cart.shippingCost > 0 ? `$${cart.shippingCost}` : "Free"}
              </span>
            </div>
            <div className="flex justify-between text-[16px] font-[600] pt-2 border-t border-[#E5E7EB]">
              <span className={`dark:text-white`}>{t('checkout.total')}</span>
              <span className={`dark:text-white`}>${cart.total}</span>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <label className="flex items-center gap-2 text-[14px]">
              <input
                type="radio"
                checked={form.paymentMethod === 1}
                onChange={() => setForm({ ...form, paymentMethod: 1 })}
              />
              {t('checkout.bank')}
            </label>
            <label className="flex items-center gap-2 text-[14px]">
              <input
                type="radio"
                checked={form.paymentMethod === 2}
                onChange={() => setForm({ ...form, paymentMethod: 2 })}
              />
              {t('checkout.cashOnDelivery')}
            </label>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <input
              type="text"
              placeholder={t('checkout.couponCode')}
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border border-[#E5E7EB] rounded px-4 py-2.5 text-[14px] flex-1 outline-none"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="border border-[#F04438] text-[#F04438] text-[14px] font-[500] px-6 py-2.5 rounded"
            >
              {t('checkout.apply')}
            </button>
          </div>
          {couponError && (
            <p className="text-[13px] text-red-500 mt-2">{couponError}</p>
          )}

          {error && <p className="text-[13px] text-red-500 mt-4">{error}</p>}

          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="w-full bg-[#F04438] hover:bg-[#D92D20] text-white text-[14px] font-[500] py-3 rounded mt-6 disabled:opacity-50"
          >
            {isSubmitting ? `${t('checkout.placingOrder')}` : `${t('checkout.placeOrder')}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
