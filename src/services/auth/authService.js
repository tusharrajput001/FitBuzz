import apiService from '../api/apiService.js';

class AuthService {
  // User registration (signup)
  async signup(userData) {
    try {
      const response = await apiService.post('/api/auth/signup', userData);
      
      // If signup is successful and returns a token, store it
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
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
      const response = await apiService.post('/api/auth/login', credentials);
      
      console.log('Login response:', response); // Debug log
      
      // Store token, refresh token and user data on successful login
      if (response.token) {
        localStorage.setItem('token', response.token);
        console.log('Access token stored:', response.token.substring(0, 20) + '...', 'Length:', response.token.length);
        
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
          console.log('Refresh token stored:', response.refreshToken.substring(0, 20) + '...', 'Length:', response.refreshToken.length);
        } else {
          console.warn('No refresh token in response'); // Debug log
        }
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
    localStorage.removeItem('refreshToken');
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

  // Get refresh token
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  // Refresh token (if needed)
  async refreshToken() {
    try {
      const refreshToken = this.getRefreshToken();
      console.log('Attempting to refresh token, refresh token available:', !!refreshToken); // Debug log
      console.log('Refresh token retrieved:', refreshToken ? refreshToken.substring(0, 20) + '...' : 'None', 'Length:', refreshToken?.length);
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      console.log('Calling refresh endpoint with token:', refreshToken.substring(0, 20) + '...'); // Debug log
      
      const customHeaders = {
        'Authorization': `Bearer ${refreshToken}`
      };
      console.log('Custom headers being sent:', customHeaders); // Debug log
      
      const response = await apiService.post('/api/auth/refresh', {}, {
        headers: customHeaders
      });
      
      console.log('Refresh response:', response); // Debug log
      
      if (response.session) {
        localStorage.setItem('token', response.session.access_token);
        localStorage.setItem('refreshToken', response.session.refresh_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        console.log('Tokens updated successfully'); // Debug log
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
      const response = await apiService.post('/api/auth/forgot-password', { email });
      return response;
    } catch (error) {
      console.error('Forgot password failed:', error);
      throw error;
    }
  }

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      const response = await apiService.post('/api/auth/reset-password', {
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
      const response = await apiService.post('/api/auth/change-password', {
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
