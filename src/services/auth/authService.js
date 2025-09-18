import apiService from '../api/apiService.js';

class AuthService {
  // User registration (signup)
  async signup(userData) {
    try {
      const response = await apiService.post('/signup', userData);
      
      // If signup is successful and returns a token, store it
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  }

  // User login
  async login(credentials) {
    try {
      const response = await apiService.post('/login', credentials);
      
      // Store token and user data on successful login
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // User logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Get current user data
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get auth token
  getToken() {
    return localStorage.getItem('token');
  }

  // Refresh token (if needed)
  async refreshToken() {
    try {
      const response = await apiService.post('/auth/refresh');
      
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Token refresh failed:', error);
      // If refresh fails, logout the user
      this.logout();
      throw error;
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await apiService.post('/forgot-password', { email });
      return response;
    } catch (error) {
      console.error('Forgot password failed:', error);
      throw error;
    }
  }

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      const response = await apiService.post('/reset-password', {
        token,
        newPassword
      });
      return response;
    } catch (error) {
      console.error('Reset password failed:', error);
      throw error;
    }
  }

  // Change password (for authenticated users)
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await apiService.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response;
    } catch (error) {
      console.error('Change password failed:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
