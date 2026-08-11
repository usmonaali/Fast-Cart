import { axiosRequest } from "./client";

export async function getCategories(params = {}) {
  const { data } = await axiosRequest.get("/Category", { params });
  return data.data;
}

export async function createCategory(formData) {
  const { data } = await axiosRequest.post("/Category", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
}

export async function deleteCategory(id) {
  const { data } = await axiosRequest.delete(`/Category/${id}`);
  return data.data;
}



export async function updateCategory(id, formData) {
  const { data } = await axiosRequest.put(`/Category/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
}