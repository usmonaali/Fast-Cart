import { axiosRequest } from "./client";

export async function getOrders(params = {}) {
  const { data } = await axiosRequest.get("/Order", { params });
  return data.data;
}

export const ORDER_STATUS = {
  1: { label: "Received", color: "#2f6fed", bg: "#EFF6FF" },
  2: { label: "Ready", color: "#F79009", bg: "#FFFAEB" },
  3: { label: "Shipped", color: "#7A5AF8", bg: "#F4F3FF" },
  4: { label: "Cancelled", color: "#F04438", bg: "#FEF3F2" },
};

export const PAYMENT_STATUS = {
  1: { label: "Pending", color: "#6C737F", bg: "#F2F4F7" },
  2: { label: "Paid", color: "#10B981", bg: "#ECFDF3" },
};

export async function updateOrderStatus(id, status) {
  const { data } = await axiosRequest.patch(`/Order/${id}/status`, { status });
  return data.data;
}

export async function checkout(payload) {
  const { data } = await axiosRequest.post("/Order/checkout", payload);
  return data.data;
}
