import React, { createContext, useState, useEffect } from "react";
import authService from "../services/auth/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [user, setUser] = useState(authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);

  // Check token validity and refresh if needed
  const checkAuthStatus = async () => {
    if (!authService.isAuthenticated()) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      setIsLoading(true);
      // Try to refresh token to check if it's still valid
      await authService.refreshToken();
      setUser(authService.getCurrentUser());
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Auth check failed:', error);
      // If refresh fails, user is not authenticated
      authService.logout();
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check auth status on mount
    checkAuthStatus();

    // Set up periodic token refresh (every 50 minutes)
    const refreshInterval = setInterval(async () => {
      if (authService.isAuthenticated()) {
        try {
          await authService.refreshToken();
          setUser(authService.getCurrentUser());
        } catch (error) {
          console.error('Periodic token refresh failed:', error);
          authService.logout();
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    }, 50 * 60 * 1000); // 50 minutes

    // Listen for storage changes (logout from another tab)
    const handleStorage = () => {
      const authStatus = authService.isAuthenticated();
      setIsAuthenticated(authStatus);
      setUser(authStatus ? authService.getCurrentUser() : null);
    };

    window.addEventListener("storage", handleStorage);
    
    return () => {
      clearInterval(refreshInterval);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      setUser(authService.getCurrentUser());
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      setIsAuthenticated, 
      user, 
      setUser, 
      isLoading, 
      login, 
      logout,
      checkAuthStatus 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
