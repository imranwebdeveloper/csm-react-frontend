import Spinner from "@/components/ui/spiner";
import {
  getUserFromStorage,
  removeUserFromStorage,
  saveUserToStorage,
} from "@/lib/storage";
import { AuthUser } from "@/types";
import { createContext, useEffect, useState } from "react";

interface AuthContextType {
  user: AuthUser | null;
  login: (credentials: AuthUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (user: AuthUser) => {
    saveUserToStorage(user);
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    removeUserFromStorage();
  };

  useEffect(() => {
    const user = getUserFromStorage();
    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
