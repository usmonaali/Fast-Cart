import { axiosRequest } from "./client";

export async function getActiveBanners() {
  const { data } = await axiosRequest.get("/Banner/active");
  return data.data; // массив
}

export async function createBanner(formData) {
  const { data } = await axiosRequest.post("/Banner", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
}

export async function getAllBanners() {
  const { data } = await axiosRequest.get("/Banner");
  return data.data;
}

export async function updateBanner(id, formData) {
  const { data } = await axiosRequest.put(`/Banner/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
}

export async function deleteBanner(id) {
  const { data } = await axiosRequest.delete(`/Banner/${id}`);
  return data.data;
}