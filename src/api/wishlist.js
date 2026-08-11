import { axiosRequest } from "./client";

export async function getWishlist(params = {}) {
  const { data } = await axiosRequest.get("/Wishlist", { params });
  return data.data; 
}

export async function addToWishlist(productId) {
  const { data } = await axiosRequest.post(`/Wishlist/${productId}`);
  return data.data;
}

export async function removeFromWishlist(productId) {
  const { data } = await axiosRequest.delete(`/Wishlist/${productId}`);
  return data.data;
}