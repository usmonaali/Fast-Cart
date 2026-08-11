import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "../../api/wishlist";
import { addToCart } from "../../api/cart";
import ProductCard from "../../MarketComponents/ProductCard/ProductCard";
import { useTranslation } from "react-i18next";

const WishlistPage = () => {
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadWishlist = () => {
    setIsLoading(true);
    getWishlist()
      .then((data) => {
        setItems(data.items);
        setTotalCount(data.totalCount);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleMoveAllToCart = async () => {
    try {
      await Promise.all(items.map((item) => addToCart(item.id, 1)));
      alert("Все товары добавлены в корзину!");
    } catch (err) {
      console.error(err);
      alert("Не удалось добавить некоторые товары.");
    }
  };
const {t} = useTranslation()
  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);
      loadWishlist();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading)
    return <div className="max-w-[1170px] mx-auto px-4 py-10">{t('wishlist.loading')}</div>;

  

  return (
    <div className="max-w-[1170px] mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-[600] text-[20px] dark:text-white text-[#111927]">
          {t('wishlist.title')} ({totalCount})
        </h1>
        {items.length > 0 && (
          <button
            onClick={handleMoveAllToCart}
            className="border border-[#E5E7EB] dark:text-white text-[14px] px-4 py-2 rounded"
          >
            {t('wishlist.moveAllToBag')}
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#6C737F] mb-4">{t('wishlist.empty')}</p>
          <Link to="/products" className="text-[#F04438] underline">
            {t('wishlist.goToCatalog')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="relative">
              <ProductCard product={item} />
              <button
                onClick={() => handleRemove(item.id)}
                className="absolute top-3 right-14 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow z-10"
                title={t('wishlist.removeFromWishlist')}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
