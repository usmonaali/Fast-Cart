import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import { getProductById, getRelatedProducts } from "../../api/products";
import { addToCart } from "../../api/cart";
import { getToken } from "../../api/account";
import { getImageUrl } from "../../api/client";
import ProductCard from "../../MarketComponents/ProductCard/ProductCard";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeImage, setActiveImage] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data);
        const main = data.images?.find((img) => img.isMain) || data.images?.[0];
        setActiveImage(getImageUrl(main?.url));
        setSelectedColor(data.colors?.[0]?.id || null);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));

    getRelatedProducts(id)
      .then(setRelated)
      .catch((err) => console.error(err));
  }, [id]);

  const handleOptionSelect = (optionName, value) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  };

  const handleAddToCart = async () => {
    const user = getToken();
    if (!user) {
      navigate("/NewLoginPage");
      return;
    }

    setIsAdding(true);
    setMessage("");
    try {
      const optionsPayload = {
        ...(selectedColor && product?.colors
          ? { Colour: product.colors.find((c) => c.id === selectedColor)?.name }
          : {}),
        ...selectedOptions,
      };
      await addToCart(id, quantity, JSON.stringify(optionsPayload));
      setMessage("Добавлено в корзину!");
    } catch (err) {
      console.error(err.response?.data);
      if (err.response?.status === 409) {
        setMessage(
          err.response.data?.message || "Недостаточно товара на складе.",
        );
      } else {
        setMessage("Не удалось добавить в корзину.");
      }
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading)
    return <div className="max-w-[1170px] mx-auto px-4 py-10">Загрузка...</div>;
  if (!product)
    return (
      <div className="max-w-[1170px] mx-auto px-4 py-10">Товар не найден.</div>
    );

  const inStock = product.stockCount > 0;

  return (
    <div className="max-w-[1170px]  mx-auto px-4 py-10">
      <p className="text-[13px] text-[#6C737F] dark:text-white mb-8">
        <Link to="/">Home</Link> /{" "}
        <span  className="dark:text-white text-[#111927]">{product.name}</span>
      </p>

      <div className="grid grid-cols-2 gap-12 mb-16">
        {/* --- Галерея --- */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.images?.map((img) => (
              <button
                key={img.id}
                onClick={() => setActiveImage(getImageUrl(img.url))}
                className={`w-[80px] h-[80px] rounded-md border ${
                  activeImage === getImageUrl(img.url)
                    ? "border-[#F04438]"
                    : "border-[#E5E7EB]"
                } bg-[#F5F5F5] flex items-center justify-center`}
              >
                <img
                  src={getImageUrl(img.url)}
                  alt=""
                  className="max-w-full max-h-full object-contain"
                />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-[#F5F5F5] rounded-md flex items-center justify-center h-[450px]">
            {activeImage ? (
              <img
                src={activeImage}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <span className="text-slate-400">No image</span>
            )}
          </div>
        </div>

        <div>
          <h1 className="font-[600] text-[24px] dark:text-white text-[#111927] mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(product.averageRating || 0)
                      ? "fill-[#FFAD33] text-[#FFAD33] "
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-[13px] text-slate-400 dark:text-white">
              ({product.reviewCount} Reviews)
            </span>
            <span className="text-slate-300 dark:text-white">|</span>
            <span
              className={`text-[13px] font-[500] dark:text-white ${inStock ? "text-[#22C55E] dark:text-white" : "text-red-500"}`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-[24px] font-[600] text-[#111927] dark:text-white">
              ${product.effectivePrice}
            </span>
            {product.discountPercent > 0 && (
              <span className="text-[16px] text-slate-400 line-through dark:text-white">
                ${product.price}
              </span>
            )}
          </div>

          <p className="text-[14px] text-[#6C737F] mb-6 pb-6 border-b border-[#E5E7EB] dark:text-white">
            {product.description}
          </p>

          {product.colors?.length > 0 && (
            <div className="mb-6">
              <span className="text-[14px] font-[500] text-[#111927] mb-2 block dark:text-white">
                Colours:
              </span>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-7 h-7 rounded-full border-2 ${
                      selectedColor === color.id
                        ? "border-[#111927]"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.hexCode }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {product.options?.map((option) => (
            <div key={option.id} className="mb-6">
              <span className="text-[14px] font-[500] text-[#111927] mb-2 block">
                {option.name}:
              </span>
              <div className="flex gap-2">
                {option.values.map((val) => (
                  <button
                    key={val.id}
                    onClick={() => handleOptionSelect(option.name, val.value)}
                    className={`px-3 py-1.5 border rounded text-[13px] ${
                      selectedOptions[option.name] === val.value
                        ? "border-[#F04438] text-[#F04438]"
                        : "border-[#E5E7EB] text-[#111927]"
                    }`}
                  >
                    {val.value}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border border-[#E5E7EB] rounded">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-[16px]"
              >
                −
              </button>
              <span className="px-4 text-[14px]">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-[16px]"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!inStock || isAdding}
              className="bg-[#F04438] hover:bg-[#D92D20] text-white text-[14px] font-[500] px-8 py-3 rounded disabled:opacity-50"
            >
              {isAdding ? "Добавляем..." : "Buy Now"}
            </button>

            <button className="w-[44px] h-[44px] border border-[#E5E7EB] rounded flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {message && <p className="text-[13px] text-[#111927]">{message}</p>}
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <p className="text-[#F04438] font-[600] text-[14px] mb-2">
            Related Item
          </p>
          <div className="grid grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailsPage;
