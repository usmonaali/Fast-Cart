import { axiosRequest } from "./client";

export async function getColors(params = {}) {
  const { data } = await axiosRequest.get("/Color", { params });
  return data.data;
}