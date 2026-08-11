import React, { useEffect, useState } from "react";
import { getSlides } from "../../api/slider";
import { getActiveBanners } from "../../api/banner";
import { getProducts } from "../../api/products";
import { getCategories } from "../../api/categories";

import HeroSlider from "../../MarketComponents/Home/HeroSlider/HeroSlider";
import FlashSalesSection from "../../MarketComponents/Home/FlashSalesSection/FlashSalesSection";
import CategoriesSection from "../../MarketComponents/Home/CategoriesSection/CategoriesSection";
import BestSellingSection from "../../MarketComponents/Home/BestSellingSection/BestSellingSection";
import PromoBanner from "../../MarketComponents/Home/PromoBanner/PromoBanner";
import ExploreProductsSection from "../../MarketComponents/Home/ExploreProductsSection/ExploreProductsSection";
import NewArrivalSection from "../../MarketComponents/Home/NewArrivalSection/NewArrivalSection";
import StoryHelp from "../../MagazinePagesComponents/StoryHelp/StoryHelp";

const HomePage = () => {
  const [slides, setSlides] = useState([]);
  const [banners, setBanners] = useState([]);
  const [flashSales, setFlashSales] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [exploreProducts, setExploreProducts] = useState([]);

  useEffect(() => {
    getSlides().then(setSlides).catch(console.error);
    getActiveBanners().then(setBanners).catch(console.error);
    getCategories({ page: 1, pageSize: 12 })
      .then((d) => setCategories(d.items))
      .catch(console.error);
    getProducts({ page: 1, pageSize: 8, hasDiscount: true })
      .then((d) => setFlashSales(d.items))
      .catch(console.error);
    getProducts({ page: 1, pageSize: 8, sortBy: "popular" })
      .then((d) => setBestSelling(d.items))
      .catch(console.error);
    getProducts({ page: 1, pageSize: 8, sortBy: "newest" })
      .then((d) => setNewArrivals(d.items))
      .catch(console.error);
    getProducts({ page: 1, pageSize: 8, sortBy: "popular" })
      .then((d) => setExploreProducts(d.items))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-[1170px] mx-auto px-4 py-10 mt-[20px]">
      <HeroSlider slides={slides} />
      <FlashSalesSection
        products={flashSales}
        endsAtUtc={banners[0]?.endsAtUtc}
      />
      <CategoriesSection categories={categories} />
      <BestSellingSection products={bestSelling} />
      <PromoBanner banners={banners} />
      <ExploreProductsSection products={exploreProducts} />
      <NewArrivalSection products={newArrivals} />
      <StoryHelp className={`mt-[50px]`}/>
    </div>
  );
};

export default HomePage;
