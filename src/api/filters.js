import { axiosRequest } from "./client";

export async function getProductFilters(categoryId) {
  const { data } = await axiosRequest.get("/Product/filters", {
    params: categoryId ? { categoryId } : {},
  });
  return data.data; 
}
