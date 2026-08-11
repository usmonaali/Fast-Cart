import { axiosRequest } from "./client";

export async function getBrands(params = {}) {
  const { data } = await axiosRequest.get("/Brand", { params });
  return data.data;
}

export async function createBrand(formData) {
  const { data } = await axiosRequest.post("/Brand", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
}

export async function deleteBrand(id) {
  const { data } = await axiosRequest.delete(`/Brand/${id}`);
  return data.data;
}

export async function updateBrand(id, formData) {
  const { data } = await axiosRequest.put(`/Brand/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
}