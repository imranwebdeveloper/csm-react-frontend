import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/content"; // Update this with your backend URL

// Fetch all public contents
export const getContents = async () => {
  const response = await axios.get(`${API_BASE_URL}/`);
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
export const createContent = async (contentData: {
  title: string;
  url: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/`, contentData, {
    withCredentials: true,
  });
  return response.data;
};

// Update content by ID (Requires authentication)
export const updateContent = async (
  id: string,
  contentData: { title?: string; url?: string }
) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, contentData, {
    withCredentials: true,
  });
  return response.data;
};

// Delete content by ID (Requires authentication)
export const deleteContent = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
