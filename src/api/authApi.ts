import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Register a new user
export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return response.data;
};

// Login user
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return response.data;
};

// Get user profile
export const getProfile = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update user profile
export const updateProfile = async (
  userData: {
    username?: string;
  },
  token: string
) => {
  const response = await axios.put(`${API_BASE_URL}/auth/profile`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users?limit=100`);
  return response.data;
};
export const fetchUser = async (id: string | undefined) => {
  const response = await axios.get(`${API_BASE_URL}/users/${id}`);
  return response.data;
};
