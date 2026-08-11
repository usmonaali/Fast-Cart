import { axiosRequest } from "./client";

export async function addToCart(productId, quantity = 1, selectedOptions = "") {
  const { data } = await axiosRequest.post("/Cart/items", {
    productId,
    quantity,
    selectedOptions,
  });
  return data.data;
}

export async function getCart() {
  const { data } = await axiosRequest.get("/Cart");
  return data.data;
}

export async function updateCartItem(itemId, quantity) {
  const { data } = await axiosRequest.put(`/Cart/items/${itemId}`, { quantity });
  return data.data;
}

export async function removeCartItem(itemId) {
  const { data } = await axiosRequest.delete(`/Cart/items/${itemId}`);
  return data.data;
}

export async function clearCart() {
  const { data } = await axiosRequest.delete("/Cart");
  return data.data;
}