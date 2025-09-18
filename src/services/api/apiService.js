import authService from '../auth/authService.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.isRefreshing = false;
    this.failedQueue = [];
    console.log('ApiService baseURL:', this.baseURL);
  }

  // Helper method to get headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Process failed queue after token refresh
  processQueue(error, token = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    
    this.failedQueue = [];
  }

  // Generic request method with automatic token refresh
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    // Debug the options object
    console.log('Options object:', options);
    console.log('Options.headers:', options.headers);
    console.log('Options.headers type:', typeof options.headers);
    console.log('Options.headers keys:', options.headers ? Object.keys(options.headers) : 'none');
    
    // If custom headers are provided, use them; otherwise use default headers
    let headers;
    if (options.headers && typeof options.headers === 'object' && Object.keys(options.headers).length > 0) {
      headers = { 'Content-Type': 'application/json', ...options.headers };
      console.log('Using custom headers:', headers);
    } else {
      headers = this.getHeaders();
      console.log('Using default headers:', headers);
    }
    
    console.log('API Request headers:', headers); // Debug log
    console.log('Custom headers provided:', !!(options.headers && typeof options.headers === 'object' && Object.keys(options.headers).length > 0)); // Debug log
    
    const config = {
      headers,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // If token is expired (401), try to refresh
      if (response.status === 401 && authService.isAuthenticated()) {
        // If we're already refreshing, queue this request
        if (this.isRefreshing) {
          return new Promise((resolve, reject) => {
            this.failedQueue.push({ resolve, reject });
          }).then(token => {
            // Retry the original request with new token
            config.headers['Authorization'] = `Bearer ${token}`;
            return fetch(url, config).then(res => {
              if (!res.ok) {
                const errorData = res.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
              }
              return res.json();
            });
          });
        }

        this.isRefreshing = true;

        try {
          await authService.refreshToken();
          this.isRefreshing = false;
          this.processQueue(null, authService.getToken());
          
          // Retry the original request with new token
          config.headers['Authorization'] = `Bearer ${authService.getToken()}`;
          const retryResponse = await fetch(url, config);
          
          if (!retryResponse.ok) {
            const errorData = await retryResponse.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${retryResponse.status}`);
          }

          return await retryResponse.json();
        } catch (refreshError) {
          this.isRefreshing = false;
          this.processQueue(refreshError, null);
          throw refreshError;
        }
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // PATCH request
  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
