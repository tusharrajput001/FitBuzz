import axios from 'axios';


const rawBaseUrl = import.meta?.env?.VITE_N8N_URL;
const API_BASE_URL = rawBaseUrl.replace(/\/$/, ''); 

class FoodAnalysisService {
  /**
   * Analyze food image and get calorie information
   * @param {File} imageFile - The image file to analyze
   * @returns {Promise<Object>} - Analysis results with items and total calories
   */
  async analyzeFoodImage(imageFile) {
    try {
      // Create FormData to send the image file
      const formData = new FormData();
      formData.append('Image', imageFile);

      // Make the API call
      const response = await axios.post(
        `${API_BASE_URL}/webhook/getCalories`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000, // 30 second timeout for image analysis
        }
      );

      // Validate response structure
      if (!response.data || !response.data.parsed) {
        throw new Error('Invalid response structure from food analysis API');
      }

      return response.data.parsed;
    } catch (error) {
      console.error('Error analyzing food image:', error);
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        throw new Error(`Server error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Unable to connect to food analysis service. Please check your connection.');
      } else if (error.code === 'ECONNABORTED') {
        // Request timeout
        throw new Error('Analysis timed out. Please try with a smaller image or try again.');
      } else {
        // Something else happened
        throw new Error('Failed to analyze food image. Please try again.');
      }
    }
  }

  /**
   * Validate if the uploaded file is a valid image
   * @param {File} file - The file to validate
   * @returns {Object} - Validation result with isValid and error message
   */
  validateImageFile(file) {
    if (!file) {
      return { isValid: false, error: 'No file selected' };
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return { 
        isValid: false, 
        error: 'Please upload a valid image file (JPEG, PNG, WebP, or GIF)' 
      };
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return { 
        isValid: false, 
        error: 'Image file is too large. Please upload an image smaller than 10MB' 
      };
    }

    return { isValid: true, error: null };
  }
}

// Create and export a singleton instance
const foodAnalysisService = new FoodAnalysisService();
export default foodAnalysisService;
