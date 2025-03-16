"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// import {
//   login as apiLogin,
//   register as apiRegister,
//   logout as apiLogout,
//   getCurrentUser,
// } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
  contentCount?: number;
  draftCount?: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      //   try {
      //     const userData = await getCurrentUser();
      //     setUser(userData);
      //   } catch (error) {
      //     setUser(null);
      //   } finally {
      //     setIsLoading(false);
      //   }
    };

    initAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    // setIsLoading(true);
    // try {
    //   const userData = await apiLogin(credentials);
    //   setUser(userData);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    // setIsLoading(true);
    // try {
    //   await apiRegister(userData);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const logout = async () => {
    // setIsLoading(true);
    // try {
    //   await apiLogout();
    //   setUser(null);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
