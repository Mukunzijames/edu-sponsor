"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  logout: () => void;
  checkAuthStatus: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = useCallback(() => {
    try {
      const currentUser = authService.getCurrentUser();
      const token = authService.getToken();
      
      console.log("🔍 Auth Check - User:", currentUser, "Token:", !!token);
      
      if (currentUser && token) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshUser = useCallback(() => {
    try {
      const currentUser = authService.getCurrentUser();
      const token = authService.getToken();
      
      console.log("🔄 Refreshing User:", currentUser);
      
      if (currentUser && token) {
        // Force a new object reference to trigger re-renders
        setUser({ ...currentUser, _refreshed: Date.now() });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("User refresh error:", error);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  }, [router]);

  useEffect(() => {
    // Initial auth check
    checkAuthStatus();

    // Set up polling to check for cookie changes every 2 seconds
    const pollInterval = setInterval(() => {
      refreshUser();
    }, 2000);

    // Listen for storage changes (when cookies are updated in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      console.log("🔄 Storage changed:", e.key);
      refreshUser();
    };

    // Listen for focus events to refresh user data when user returns to tab
    const handleFocus = () => {
      console.log("🔄 Window focused, refreshing user");
      refreshUser();
    };

    // Listen for visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("🔄 Tab became visible, refreshing user");
        refreshUser();
      }
    };

    // Custom event for manual auth refresh
    const handleAuthRefresh = () => {
      console.log("🔄 Manual auth refresh triggered");
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('auth-refresh', handleAuthRefresh);

    return () => {
      clearInterval(pollInterval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('auth-refresh', handleAuthRefresh);
    };
  }, [checkAuthStatus, refreshUser]);

  const value = {
    user,
    isAuthenticated,
    logout,
    checkAuthStatus,
    refreshUser
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