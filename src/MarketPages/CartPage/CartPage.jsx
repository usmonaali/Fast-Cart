import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import {
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../../api/cart";
import { axiosRequest, getImageUrl } from "../../api/client";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const loadCart = () => {
    setIsLoading(true);
    getCart()
      .then(setCart)
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleQuantityChange = async (itemId, quantity) => {
    if (quantity < 0) return;
    try {
      await updateCartItem(itemId, quantity);
      loadCart();
    } catch (err) {
      console.error(err.response?.data);
      if (err.response?.status === 409) {
        alert(err.response.data?.message || `${'cart.outOfStock'}`);
      }
    }
  };
  const {t} = useTranslation()
  const handleRemove = async (itemId) => {
    try {
      await removeCartItem(itemId);
      loadCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveAll = async () => {
    try {
      await clearCart();
      loadCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleApplyCoupon = async () => {
    setCouponError("");
    try {
      await axiosRequest.post("/Cart/apply-coupon", { code: couponCode });
      loadCart();
    } catch (err) {
      setCouponError(err.response?.data?.message || `${t('cart.couponInvalid')}`);
    }
  };

  if (isLoading)
    return <div className="max-w-[1170px] mx-auto px-4 py-10">Загрузка...</div>;

  const items = cart?.items || [];

  return (
    <div className="max-w-[1170px] mx-auto px-4 py-10">
      <p className="text-[13px] text-[#6C737F] mb-8">
        <Link className={`dark:text-white`} to="/">{t('cart.home')}</Link> / <span className="text-[#111927] dark:text-white">{t('cart.cart')}</span>
      </p>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#6C737F] dark:text-white mb-4">{t('cart.empty')}</p>
          <Link to="/products" className="text-[#F04438] underline">
            {t('cart.goToCatalog')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="border border-[#E5E7EB] rounded-md">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 border-b border-[#E5E7EB] text-[13px] text-[#6C737F]">
                <span className={`dark:text-white`}>{t('cart.product')}</span>
                <span className={`dark:text-white`}>{t('cart.price')}</span>
                <span className={`dark:text-white`}>{t('cart.quantity')}</span>
                <span className={`dark:text-white`}>{t('cart.subtotal')}</span>
                <span className={`dark:text-white`}>{t('cart.delete')}</span>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 items-center border-b border-[#E5E7EB] last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[50px] h-[50px] bg-[#F5F5F5] rounded overflow-hidden">
                      {item.productImageUrl && (
                        <img
                          src={getImageUrl(item.productImageUrl)}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <span className="dark:text-white text-[14px] text-[#111927]">
                      {item.productName}
                    </span>
                  </div>

                  <span className="text-[14px] text-[#6C737F] dark:text-white">
                    ${item.unitPrice}
                  </span>

                  <div className="flex items-center border border-[#E5E7EB] rounded w-fit">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="px-2 py-1"
                    >
                      −
                    </button>
                    <span className="px-3 text-[14px] dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="px-2 py-1"
                    >
                      +
                    </button>
                  </div>

                  <span className="dark:text-white text-[14px] text-[#111927]">
                    ${item.lineTotal}
                  </span>

                  <button onClick={() => handleRemove(item.id)}>
                    <Trash2 className="w-4 h-4 text-[#F04438]" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6">
              <Link
                to="/products"
                className="border border-[#E5E7EB] text-[14px] dark:text-white px-6 py-2.5 rounded"
              >
                {t('cart.returnToShop')}
              </Link>
              <button
                onClick={handleRemoveAll}
                className="border border-[#E5E7EB] text-[14px] px-6 py-2.5 dark:text-white rounded"
              >
                {t('cart.removeAll')}
              </button>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <input
                type="text"
                placeholder={t('cart.couponCode')}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="border border-[#E5E7EB] rounded px-4 py-2.5 text-[14px] w-[220px] outline-none"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-[#F04438] text-white text-[14px] font-[500] px-6 py-2.5 rounded"
              >
                {t('cart.applyCoupon')}
              </button>
            </div>
            {couponError && (
              <p className="text-[13px] dark:text-white text-red-500 mt-2">{couponError}</p>
            )}
          </div>

          <div className="border border-[#E5E7EB] rounded-md p-6 h-fit">
            <h3 className="font-[600] text-[18px] dark:text-white text-[#111927] mb-4">
              {t('cart.cartTotal')}
            </h3>

            <div className="flex justify-between text-[14px] py-3 border-b border-[#E5E7EB]">
              <span className="text-[#6C737F] dark:text-white">{t('cart.subtotal')}:</span>
              <span className="text-[#111927] dark:text-white">${cart.subtotal}</span>
            </div>

            {cart.discountAmount > 0 && (
              <div className="flex justify-between text-[14px] py-3 border-b border-[#E5E7EB]">
                <span className="text-[#6C737F] dark:text-white">{t('cart.discount')}:</span>
                <span className="text-[#22C55E] dark:text-white">-${cart.discountAmount}</span>
              </div>
            )}

            <div className="flex justify-between text-[14px]  py-3 border-b border-[#E5E7EB]">
              <span className="text-[#6C737F] dark:text-white">{t('cart.shipping')}:</span>
              <span className="text-[#111927] dark:text-white">
                {cart.shippingCost > 0 ? `$${cart.shippingCost}` : "Free"}
              </span>
            </div>

            <div className="flex justify-between text-[16px] font-[600] py-3">
              <span className={`dark:text-white`}>{t('cart.total')}:</span>
              <span className={`dark:text-white`}>${cart.total}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#F04438] hover:bg-[#D92D20] text-white text-[14px] font-[500] py-3 rounded mt-4"
            >
              {t('cart.proceedToCheckout')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
