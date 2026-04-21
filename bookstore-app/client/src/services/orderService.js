import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "/api"}/orders`;

export const placeOrder = async (orderData, token) => {
  const response = await axios.post(API_URL, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getMyOrders = async (token) => {
  const response = await axios.get(`${API_URL}/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllOrders = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateOrderStatus = async (id, data, token) => {
  const response = await axios.put(`${API_URL}/${id}/status`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
