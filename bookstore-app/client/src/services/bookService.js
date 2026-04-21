import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "/api"}/books`;

export const getBooks = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const getBookById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createBook = async (bookData, token) => {
  const response = await axios.post(API_URL, bookData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateBook = async (id, bookData, token) => {
  const response = await axios.put(`${API_URL}/${id}`, bookData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteBook = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
