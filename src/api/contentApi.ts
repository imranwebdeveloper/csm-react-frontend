import config from "@/config/env";
import { IContent } from "@/types";
import axios from "axios";

const API_BASE_URL = `${config.env.API_URL}/contents`;

// Fetch all public contents
export const getContents = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/users?limit=100`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch a single content by ID
export const getContentById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Fetch logged-in user's contents (Requires authentication)
export const getUserContents = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`, {
    withCredentials: true,
  });
  return response.data;
};

// Create new content (Requires authentication)
export const createContent = async (
  contentData: Partial<IContent>,
  token: string
) => {
  const response = await axios.post(`${API_BASE_URL}/`, contentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update content by ID (Requires authentication)
export const updateContent = async (
  contentData: Partial<IContent>,
  id: string,
  token: string
) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, contentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete content by ID (Requires authentication)
export const deleteContent = async (id: string, token: string) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
