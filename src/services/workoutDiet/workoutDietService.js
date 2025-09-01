import axios from "axios";

const N8N_URL = import.meta.env.N8N_URL || "http://localhost:5678";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";


class WorkoutDietService {
  /**
   * Generate workout and diet plan based on user profile
   * @param {Object} userProfile - User profile data
   * @returns {Promise<Object>} API response
   */
  async generatePlan(userProfile) {
    try {
      const response = await axios.post(
        `${N8N_URL}/webhook/generate-plan`,
        userProfile,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error generating plan:", error);
      throw error;
    }
  }

  /**
   * Save generated workout and diet plan to database
   * @param {Object} planData - Generated plan data with workout_plan and diet_plan
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} API response
   */
  async savePlan(planData, token) {
    try {
      console.log("savePlan called with planData:", planData);
      console.log("planData type:", typeof planData);
      console.log("planData stringified:", JSON.stringify(planData, null, 2));
      
      // Ensure we have the required fields
      if (!planData || !planData.workout_plan || !planData.diet_plan) {
        throw new Error("Invalid plan data structure. Missing workout_plan or diet_plan");
      }
      
      console.log("Making axios POST request to:", `${BACKEND_URL}/api/plans`);
      console.log("Request payload:", planData);
      
      const response = await axios.post(
        `${BACKEND_URL}/api/plans`,
        planData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error saving plan:", error);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
      throw error;
    }
  }

  /**
   * Get all plans for the authenticated user
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} API response
   */
  async getPlans(token) {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/plans`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching plans:", error);
      throw error;
    }
  }

  /**
   * Get a specific plan by ID
   * @param {string} planId - Plan ID
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} API response
   */
  async getPlanById(planId, token) {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/plans/${planId}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching plan:", error);
      throw error;
    }
  }

  /**
   * Delete a plan
   * @param {string} planId - Plan ID
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} API response
   */
  async deletePlan(planId, token) {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/plans/${planId}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error deleting plan:", error);
      throw error;
    }
  }
}

const workoutDietService = new WorkoutDietService();
export default workoutDietService;
