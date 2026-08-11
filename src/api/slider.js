import { axiosRequest } from "./client";

export async function getSlides() {
  const { data } = await axiosRequest.get("/Slider");
  return data.data; // массив
}

export async function createSlide(formData) {
  const { data } = await axiosRequest.post("/Slider", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
}

export async function updateSlide(id, formData) {
  const { data } = await axiosRequest.put(`/Slider/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
}

export async function deleteSlide(id) {
  const { data } = await axiosRequest.delete(`/Slider/${id}`);
  return data.data;
}