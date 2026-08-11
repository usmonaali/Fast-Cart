import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Eye, Star } from "lucide-react";
import { getImageUrl } from "../../api/client";
import { addToCart } from "../../api/cart";
import { getToken } from "../../api/account";
import { addToWishlist } from "../../api/wishlist";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const {
    id,
    name,
    mainImageUrl,
    price,
    effectivePrice,
    discountPercent,
    isNew,
    colors,
    averageRating,
    reviewCount,
    inStock,
    brandName,
  } = product;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user = getToken();
    if (!user) {
      navigate("/NewLoginPage");
      return;
    }

    setIsAdding(true);
    try {
      await addToCart(id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch (err) {
      console.error(err.response?.data);
      if (err.response?.status === 409) {
        alert(err.response.data?.message || "Недостаточно товара на складе.");
      } else {
        alert("Не удалось добавить в корзину.");
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative">
      <div className="relative bg-[#F5F5F5] rounded-md h-[250px] flex items-center justify-center overflow-hidden">
        {discountPercent > 0 && (
          <span className="absolute top-3 left-3 bg-[#F04438] text-white text-[12px] font-[600] px-2 py-1 rounded">
            -{discountPercent}%
          </span>
        )}
        {isNew && (
          <span className="absolute top-3 left-3 bg-[#22C55E] text-white text-[12px] font-[600] px-2 py-1 rounded">
            NEW
          </span>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              const user = getToken();
              if (!user) {
                navigate("/NewLoginPage");
                return;
              }
              try {
                await addToWishlist(id);
              } catch (err) {
                console.error(err);
              }
            }}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
          >
            <Heart className="w-4 h-4 text-[#111927]" />
          </button>
          <Link
            to={`/products/${id}`}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
          >
            <Eye className="w-4 h-4 text-[#111927]" />
          </Link>
        </div>

        {mainImageUrl ? (
          <img
            src={getImageUrl(mainImageUrl)}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-slate-400 text-sm">No image</span>
        )}

        {!inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-[13px] font-[600] text-[#111927]">
              Out of Stock
            </span>
          </div>
        )}

        {inStock && (
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="absolute bottom-0 left-0 right-0 bg-[#111927] text-white text-[13px] font-[500] py-2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-70"
          >
            {added ? "Added ✓" : isAdding ? "Добавляем..." : "Add To Cart"}
          </button>
        )}
      </div>

      <div className="mt-3">
        {brandName && <p className="text-[12px] text-slate-400">{brandName}</p>}
        <h3 className="text-[14px] font-[500] text-[#111927] dark:text-white truncate">
          {name}
        </h3>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-[14px] font-[600] text-[#F04438]">
            ${effectivePrice}
          </span>
          {discountPercent > 0 && (
            <span className="text-[13px] text-slate-400 line-through">
              ${price}
            </span>
          )}
        </div>

        {colors && colors.length > 0 && (
          <div className="flex gap-1 mt-2">
            {colors.map((c) => (
              <span
                key={c.id}
                className="w-3 h-3 rounded-full border border-slate-200"
                style={{ backgroundColor: c.hexCode }}
                title={c.name}
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-1 mt-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.round(averageRating || 0)
                  ? "fill-[#FFAD33] text-[#FFAD33]"
                  : "text-slate-300"
              }`}
            />
          ))}
          <span className="text-[12px] text-slate-400 ml-1">
            ({reviewCount || 0})
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
