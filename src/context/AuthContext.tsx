import { removeUserFromStorage, saveUserToStorage } from "@/lib/storage";
import { AuthUser } from "@/types";
import { createContext, useState } from "react";

interface AuthContextType {
  user: AuthUser | null;
  login: (credentials: AuthUser) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (user: AuthUser) => {
    saveUserToStorage(user);
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    removeUserFromStorage();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
