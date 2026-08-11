import { axiosRequest } from "./client";

export async function getTags(params = {}) {
  const { data } = await axiosRequest.get("/Tag", { params });
  return data.data;
}