import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Register a new user
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/register`, userData);
  return response.data;
};

// Login user
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/login`, credentials);
  return response.data;
};

// Get user profile
export const getProfile = async () => {
  const response = await axios.get(`${API_BASE_URL}/profile`, {
    withCredentials: true,
  });
  return response.data;
};

// Update user profile
export const updateProfile = async (userData: {
  name?: string;
  bio?: string;
  avatar?: string;
}) => {
  const response = await axios.put(`${API_BASE_URL}/profile`, userData, {
    withCredentials: true,
  });
  return response.data;
};
