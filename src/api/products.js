import { axiosRequest } from "./client";

export async function getProducts(params = {}) {
  const { data } = await axiosRequest.get("/Product", { params });
  return data.data;
}

export async function getProductById(id) {
  const { data } = await axiosRequest.get(`/Product/${id}`);
  return data.data;
}

export async function getRelatedProducts(id) {
  const { data } = await axiosRequest.get(`/Product/${id}/related`);
  return data.data; // массив
}

export async function createProduct(formData) {
  const { data } = await axiosRequest.post("/Product", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
}

export async function deleteProduct(id) {
  const { data } = await axiosRequest.delete(`/Product/${id}`);
  return data.data;
}

export async function updateProductStatus(id, isActive) {
  const { data } = await axiosRequest.patch(`/Product/${id}/status`, {
    isActive,
  });
  return data.data;
}

export async function updateProduct(id, formData) {
  const { data } = await axiosRequest.put(`/Product/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
}
