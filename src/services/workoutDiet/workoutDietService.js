import axios from "axios";

const N8N_URL = import.meta.env.N8N_URL || "http://localhost:5678";


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
}

const workoutDietService = new WorkoutDietService();
export default workoutDietService;
