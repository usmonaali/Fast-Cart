import { axiosRequest } from "./client";

export async function getCoupons(params = {}) {
  const { data } = await axiosRequest.get("/Coupon", { params });
  return data.data;
}

export async function createCoupon(payload) {
  const { data } = await axiosRequest.post("/Coupon", payload);
  return data.data;
}

export async function updateCoupon(id, payload) {
  const { data } = await axiosRequest.put(`/Coupon/${id}`, payload);
  return data.data;
}

export async function deleteCoupon(id) {
  const { data } = await axiosRequest.delete(`/Coupon/${id}`);
  return data.data;
}

export const DISCOUNT_TYPE = {
  1: "Percentage",
  2: "Fixed Amount",
};