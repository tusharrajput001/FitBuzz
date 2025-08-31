import React from "react";
import "./Form3.css";

const Form3 = ({ formData, handleChange }) => {
  return (
    <div className="form3-container">
      <div className="form-field">
        <h2>Goal <span className="required">*</span></h2>
        <select 
          name="goal" 
          value={formData.goal} 
          onChange={handleChange} 
          required
          className={formData.goal ? "filled" : ""}
        >
          <option value="">Select Goal</option>
          <option value="muscleGain">Muscle Gain</option>
          <option value="fatLoss">Fat Loss</option>
          <option value="maintenance">Maintenance</option>
          <option value="endurance">Endurance</option>
        </select>
      </div>
      <div className="form-field">
        <h2>Diet Preference <span className="required">*</span></h2>
        <select 
          name="diet_preference" 
          value={formData.diet_preference} 
          onChange={handleChange} 
          required
          className={formData.diet_preference ? "filled" : ""}
        >
          <option value="">Select Diet Preference</option>
          <option value="veg">Vegetarian</option>
          <option value="nonVeg">Non-Vegetarian</option>
        </select>
      </div>
      <div className="form-field">
        <h2>Workout Experience <span className="required">*</span></h2>
        <select 
          name="workout" 
          value={formData.workout} 
          onChange={handleChange} 
          required
          className={formData.workout ? "filled" : ""}
        >
          <option value="">Select Workout Experience</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
    </div>
  );
};

export default Form3;
