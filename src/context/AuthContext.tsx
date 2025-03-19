import Spinner from "@/components/ui/spiner";
import {
  getUserFromStorage,
  removeUserFromStorage,
  saveUserToStorage,
} from "@/lib/storage";
import { AuthUser, IUser } from "@/types";
import { createContext, useEffect, useState } from "react";

interface AuthContextType {
  user: AuthUser | null;
  login: (credentials: AuthUser) => void;
  logout: () => void;
  updateUser: (user: IUser) => void;
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

  const updateUser = (user: IUser) => {
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setUser((pre: any) => {
        return {
          ...pre,
          user: {
            ...pre?.user,
            ...user,
          },
        };
      });
    }
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
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
