import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import workoutDietService from "../services/workoutDiet/workoutDietService";
import authService from "../services/auth/authService";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("workout");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationMessage, setGenerationMessage] = useState("");
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDays, setExpandedDays] = useState(new Set());
  const [selectedMeals, setSelectedMeals] = useState({});

  // Fetch user's plans from database
  useEffect(() => {
    fetchUserPlans();
  }, []);

  const fetchUserPlans = async () => {
    try {
      setLoading(true);
      const token = authService.getToken();
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      const userPlans = await workoutDietService.getPlans(token);
      console.log("Fetched plans from API:", userPlans);
      setPlans(userPlans);
      
      // Set the most recent plan as current plan
      if (userPlans && userPlans.length > 0) {
        console.log("Setting current plan:", userPlans[0]);
        setCurrentPlan(userPlans[0]); // Most recent plan
        
        // Expand the first day by default for better UX
        if (userPlans[0].workout_days && userPlans[0].workout_days.length > 0) {
          setExpandedDays(new Set([userPlans[0].workout_days[0].id]));
        }
      }
      
      setError(null);
    } catch (err) {
      console.error("Error fetching plans:", err);
      setError("Failed to load your plans");
    } finally {
      setLoading(false);
    }
  };

 

  // Get workout data grouped by day
  const getWorkoutDataByDay = () => {
    if (!currentPlan || !currentPlan.workout_days) return [];
    
    console.log("Processing workout days:", currentPlan.workout_days);
    
    return currentPlan.workout_days.map(day => {
      console.log(`Processing day: ${day.day_name}, exercises:`, day.workout_exercises);
      
      const dayData = {
        id: day.id,
        dayName: day.day_name,
        dayNumber: day.day_number,
        focusArea: day.focus_area,
        isRestDay: !day.workout_exercises || day.workout_exercises.length === 0,
        exercises: []
      };
      
      if (day.workout_exercises && day.workout_exercises.length > 0) {
        dayData.exercises = day.workout_exercises.map(exercise => ({
          id: exercise.id,
          name: exercise.exercise_name,
          sets: exercise.sets,
          reps: exercise.reps,
          duration: exercise.duration_seconds ? `${exercise.duration_seconds}` : null,
          completed: false, // You can add completion tracking later
        }));
      } else {
        // Add a placeholder for rest days
        dayData.exercises = [{
          id: `rest-${day.id}`,
          name: "Rest Day",
          sets: 0,
          reps: "Complete Rest",
          duration: null,
          completed: false,
          isRestDay: true
        }];
      }
      
      return dayData;
    });
  };

  // Get diet data grouped by meal type
  const getDietDataByMeal = () => {
    if (!currentPlan || !currentPlan.meals) return [];
    
    console.log("Processing meals:", currentPlan.meals);
    
    // Group meals by type and create meal options
    const mealGroups = {};
    
    currentPlan.meals.forEach(meal => {
      const mealType = meal.meal_type.charAt(0).toUpperCase() + meal.meal_type.slice(1).toLowerCase();
      
      if (!mealGroups[mealType]) {
        mealGroups[mealType] = {
          id: meal.id,
          mealType: mealType,
          options: [],
          totalCalories: 0
        };
      }
      
      // Create meal option
      const mealOption = {
        id: meal.id,
        food: meal.meal_items?.map(item => item.food_name).join(", ") || "No items",
        calories: meal.meal_items?.reduce((sum, item) => sum + (item.calories || 0), 0) || 0,
        time: meal.meal_time || "Not specified",
        selected: false
      };
      
      mealGroups[mealType].options.push(mealOption);
      mealGroups[mealType].totalCalories += mealOption.calories;
    });
    
    const dietData = Object.values(mealGroups);
    console.log("Final diet data:", dietData);
    return dietData;
  };

  // Handle plan selection
  const handlePlanChange = (planId) => {
    const selectedPlan = plans.find(plan => plan.id === planId);
    setCurrentPlan(selectedPlan);
    
    // Expand the first day of the selected plan
    if (selectedPlan.workout_days && selectedPlan.workout_days.length > 0) {
      setExpandedDays(new Set([selectedPlan.workout_days[0].id]));
    }
  };

  // Toggle day expansion
  const toggleDayExpansion = (dayId) => {
    setExpandedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dayId)) {
        newSet.delete(dayId);
      } else {
        newSet.add(dayId);
      }
      return newSet;
    });
  };

  // Handle meal selection
  const handleMealSelection = (mealType, mealId) => {
    setSelectedMeals(prev => ({
      ...prev,
      [mealType]: mealId
    }));
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <h2>Loading your plans...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={fetchUserPlans} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const workoutDataByDay = getWorkoutDataByDay();
  const dietDataByMeal = getDietDataByMeal();

  return (
    <div className="dashboard">
      {/* Charts Section */}
      <div className="charts-section">
        <div className="charts-placeholder">
          <h2>CHARTS</h2>
          <p>Charts and graphs will be displayed here</p>
          

          
        </div>
      </div>

      {/* Fitness Plans Section */}
      {plans.length > 0 && (
        <div className="fitness-plans-section">
          <div className="plans-header">
            <h2>Fitness Plans</h2>
            <span className="plans-count">TOTAL: {plans.length}</span>
          </div>
          <div className="plans-container">
            {plans.map(plan => (
              <div 
                key={plan.id} 
                className={`plan-card ${currentPlan?.id === plan.id ? 'active' : ''}`}
                onClick={() => handlePlanChange(plan.id)}
              >
                <div className="plan-info">
                  <span className="plan-name">
                    {plan.name} - {new Date(plan.created_at).toLocaleDateString()}
                  </span>
                  {currentPlan?.id === plan.id && (
                    <span className="active-badge">ACTIVE</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
        </div>

        {/* Content Area */}
        <div className="content-area">
          {activeTab === "workout" ? (
            <div className="workout-content">
              <div className="workout-header">
                <h3>Your Workout Plan</h3>
                <div className="workout-controls">
                  <button 
                    className="expand-btn"
                    onClick={() => setExpandedDays(new Set(workoutDataByDay.map(day => day.id)))}
                  >
                    Expand All
                  </button>
                  <button 
                    className="collapse-btn"
                    onClick={() => setExpandedDays(new Set())}
                  >
                    Collapse All
                  </button>
                </div>
              </div>
              {workoutDataByDay.length > 0 ? (
                <div className="workout-days-list">
                  {workoutDataByDay.map((day) => (
                    <div key={day.id} className="workout-day">
                      <div 
                        className={`day-header ${day.isRestDay ? 'rest-day-header' : ''}`}
                        onClick={() => toggleDayExpansion(day.id)}
                      >
                        <div className="day-info">
                          <h4>{day.dayName}</h4>
                          <div className="day-meta">
                            <span className="focus-area">{day.focusArea}</span>
                            <span className="exercise-count">
                              {day.exercises.length} {day.exercises.length === 1 ? 'exercise' : 'exercises'}
                            </span>
                          </div>
                        </div>
                        <div className="day-toggle">
                          <span className="toggle-icon">
                            {expandedDays.has(day.id) ? '▼' : '▶'}
                          </span>
                        </div>
                      </div>
                      
                      {expandedDays.has(day.id) && (
                        <div className="day-exercises">
                          {day.exercises.map((exercise) => (
                            <div key={exercise.id} className={`workout-item ${exercise.completed ? "completed" : ""} ${exercise.isRestDay ? "rest-day" : ""}`}>
                              <div className="exercise-info">
                                <h5>{exercise.name}</h5>
                                {exercise.isRestDay ? (
                                  <p className="rest-day-text">Rest Day</p>
                                ) : (
                                  <p>
                                    {exercise.sets} sets × {exercise.duration ? `${exercise.duration}` : exercise.reps}
                                    {exercise.duration && <span className="duration-unit">s</span>}
                                  </p>
                                )}
                              </div>
                              <div className="status">
                                {exercise.isRestDay ? "😴" : (exercise.completed ? "✓" : "○")}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data">
                  <p>No workout plan found. Generate a new plan to get started!</p>
                </div>
              )}
            </div>
          ) : (
            <div className="diet-content">
              <div className="diet-header">
                <h3>Today's Meal Plan</h3>
                <div className="diet-controls">
                  <button 
                    className="select-all-btn"
                    onClick={() => {
                      const allSelected = {};
                      dietDataByMeal.forEach(mealGroup => {
                        if (mealGroup.options.length > 0) {
                          allSelected[mealGroup.mealType] = mealGroup.options[0].id;
                        }
                      });
                      setSelectedMeals(allSelected);
                    }}
                  >
                    Select All
                  </button>
                  <button 
                    className="clear-all-btn"
                    onClick={() => setSelectedMeals({})}
                  >
                    Clear All
                  </button>
                </div>
              </div>
              {dietDataByMeal.length > 0 ? (
                <div className="diet-meals-list">
                  {dietDataByMeal.map((mealGroup) => (
                    <div key={mealGroup.id} className="meal-group">
                      <div className="meal-group-header">
                        <h4>{mealGroup.mealType}</h4>
                        <span className="total-calories">{mealGroup.totalCalories} cal</span>
                      </div>
                      <div className="meal-options">
                        {mealGroup.options.map((option) => (
                          <div 
                            key={option.id} 
                            className={`meal-option ${selectedMeals[mealGroup.mealType] === option.id ? 'selected' : ''}`}
                            onClick={() => handleMealSelection(mealGroup.mealType, option.id)}
                          >
                            <div className="meal-option-info">
                              <p className="food-description">{option.food}</p>
                              <span className="meal-time">{option.time}</span>
                            </div>
                            <div className="meal-option-calories">
                              {option.calories} cal
                            </div>
                            <div className="selection-indicator">
                              {selectedMeals[mealGroup.mealType] === option.id ? '✓' : '○'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data">
                  <p>No meal plan found. Generate a new plan to get started!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
