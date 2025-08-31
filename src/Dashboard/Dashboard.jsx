import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import workoutDietService from "../services/workoutDiet/workoutDietService";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("workout");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationMessage, setGenerationMessage] = useState("");

  // Fake data for workout
  const workoutData = [
    { id: 1, name: "Push-ups", sets: 3, reps: 15, completed: true },
    { id: 2, name: "Squats", sets: 4, reps: 20, completed: true },
    { id: 3, name: "Pull-ups", sets: 3, reps: 8, completed: false },
    { id: 4, name: "Plank", sets: 3, duration: "60s", completed: false },
    { id: 5, name: "Burpees", sets: 3, reps: 10, completed: true },
  ];

  // Fake data for diet
  const dietData = [
    { id: 1, meal: "Breakfast", food: "Oatmeal with berries", calories: 320, time: "8:00 AM" },
    { id: 2, meal: "Snack", food: "Greek yogurt", calories: 150, time: "10:30 AM" },
    { id: 3, meal: "Lunch", food: "Grilled chicken salad", calories: 450, time: "1:00 PM" },
    { id: 4, meal: "Snack", food: "Almonds", calories: 160, time: "3:30 PM" },
    { id: 5, meal: "Dinner", food: "Salmon with vegetables", calories: 520, time: "7:00 PM" },
  ];

  // Function to generate new workout and diet plan
  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    setGenerationMessage("Generating your personalized plan...");
    
    try {
      const userProfile = {
        name: "Tushar Rajput",
        age: 23,
        gender: "Male",
        goal: "Muscle Gain",
        height: 178,
        weight: 72,
        diet_preference: "High Protein Vegetarian"
      };
      
      const result = await workoutDietService.generatePlan(userProfile);
      setGenerationMessage("Plan generated successfully! Check your workout and diet tabs.");
      console.log("Generated plan:", result);
    } catch (error) {
      setGenerationMessage("An error occurred while generating the plan.");
      console.error("Error generating plan:", error);
    } finally {
      setIsGenerating(false);
      // Clear message after 5 seconds
      setTimeout(() => setGenerationMessage(""), 5000);
    }
  };

  return (
    <div className="dashboard">
      {/* Charts Section */}
      <div className="charts-section">
        <div className="charts-placeholder">
          <h2>CHARTS</h2>
          <p>Charts and graphs will be displayed here</p>
          <button 
            className="generate-plan-btn"
            onClick={handleGeneratePlan}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate New Plan"}
          </button>
          {generationMessage && (
            <div className="generation-message">
              {generationMessage}
            </div>
          )}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs-section">
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === "workout" ? "active" : ""}`}
            onClick={() => setActiveTab("workout")}
          >
            WORKOUT
          </button>
          <div className="tab-divider"></div>
          <button 
            className={`tab-btn ${activeTab === "diet" ? "active" : ""}`}
            onClick={() => setActiveTab("diet")}
          >
            DIET
          </button>
          <div className="tab-arrow">→</div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {activeTab === "workout" ? (
            <div className="workout-content">
              <h3>Today's Workout Plan</h3>
              <div className="workout-list">
                {workoutData.map((exercise) => (
                  <div key={exercise.id} className={`workout-item ${exercise.completed ? "completed" : ""}`}>
                    <div className="exercise-info">
                      <h4>{exercise.name}</h4>
                      <p>{exercise.sets} sets × {exercise.reps || exercise.duration}</p>
                    </div>
                    <div className="status">
                      {exercise.completed ? "✓" : "○"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="diet-content">
              <h3>Today's Meal Plan</h3>
              <div className="diet-list">
                {dietData.map((meal) => (
                  <div key={meal.id} className="diet-item">
                    <div className="meal-info">
                      <h4>{meal.meal}</h4>
                      <p>{meal.food}</p>
                      <span className="time">{meal.time}</span>
                    </div>
                    <div className="calories">
                      {meal.calories} cal
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
