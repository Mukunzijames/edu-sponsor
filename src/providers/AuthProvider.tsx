"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  logout: () => void;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = () => {
    try {
      const currentUser = authService.getCurrentUser();
      const token = authService.getToken();
      
      if (currentUser && token) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        // Clear any corrupted data if user or token is missing
        if (!currentUser || !token) {
          authService.clearStoredData();
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
      // Clear any corrupted data
      authService.clearStoredData();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    user,
    isAuthenticated,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 