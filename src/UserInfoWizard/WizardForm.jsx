import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form1 from "./Form 1/Form1";
import Form2 from "./Form 2/Form2";
import Form3 from "./Form 3/Form3";
import LoadingPopup from "../components/LoadingPopup/LoadingPopup";
import workoutDietService from "../services/workoutDiet/workoutDietService";
import authService from "../services/auth/authService";
import "./WizardForm.css";

const WizardForm = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    diet_preference: "",
    workout: "",
  });

  const navigate = useNavigate();

  const steps = [
    { number: 1, title: "Basic Info", description: "Name, Age, Gender" },
    { number: 2, title: "Physical", description: "Height & Weight" },
    { number: 3, title: "Preferences", description: "Goal & Experience" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateCurrentStep = () => {
    switch (step) {
      case 1:
        return formData.name && formData.age && formData.gender;
      case 2:
        return formData.height && formData.weight;
      case 3:
        return formData.goal && formData.diet_preference && formData.workout;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setStep((prev) => prev + 1);
    } else {
      alert("Please fill in all required fields before proceeding to the next step.");
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const validateForm = () => {
    const requiredFields = ['name', 'age', 'gender', 'height', 'weight', 'goal', 'diet_preference', 'workout'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    // Additional validation
    if (formData.age < 13 || formData.age > 100) {
      alert("Age must be between 13 and 100");
      return false;
    }

    if (formData.height < 100 || formData.height > 250) {
      alert("Height must be between 100cm and 250cm");
      return false;
    }

    if (formData.weight < 30 || formData.weight > 300) {
      alert("Weight must be between 30kg and 300kg");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      
      // Prepare the data for the API
      const apiData = {
        ...formData,
        age: parseInt(formData.age),
        height: parseInt(formData.height),
        weight: parseFloat(formData.weight)
      };
      
      console.log("Submitting form data:", apiData);
      
      // Call the API to generate workout and diet plan
      const response = await workoutDietService.generatePlan(apiData);
      
      console.log("Plan generated successfully:", response);
      console.log("Response type:", typeof response);
      console.log("Response structure:", JSON.stringify(response, null, 2));
      
      // Validate that we have the required data structure
      if (!response || !response.workout_plan || !response.diet_plan) {
        console.error("Invalid response structure:", response);
        throw new Error("Generated plan does not have the expected structure");
      }
      
      // Save the generated plan to the database
      try {
        const token = authService.getToken();
        if (token) {
          console.log("Saving plan to database with data:", {
            workout_plan: response.workout_plan,
            diet_plan: response.diet_plan
          });
          
          console.log("Saving original generated plan to database");
          const saveResponse = await workoutDietService.savePlan(response, token);
          console.log("Plan saved to database:", saveResponse);
          
          // Store the plan ID for future reference
          localStorage.setItem('userPlanId', saveResponse.plan_id);
        }
      } catch (saveError) {
        console.error("Error saving plan to database:", saveError);
        console.error("Save error details:", saveError.response?.data);
        // Don't block the user flow if saving fails, just log the error
      }
      
      // Store the generated plan data in localStorage for use in dashboard
      localStorage.setItem('userPlan', JSON.stringify(response));
      
      // Navigate to dashboard after successful response
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Error generating plan:", error);
      alert("Failed to generate plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wizard-form-container">
      <div className="wizard-header">
        <h1 className="wizard-title">Personalize Your Experience</h1>
        <p className="wizard-subtitle">Let's get to know you better</p>
      </div>
      
      <div className="step-indicator">
        {steps.map((stepInfo, index) => (
          <div key={stepInfo.number} className="step-item">
            <div className={`step-dot ${step >= stepInfo.number ? 'active' : ''} ${step > stepInfo.number ? 'completed' : ''}`}>
              {step > stepInfo.number ? '✓' : stepInfo.number}
            </div>
            <div className="step-info">
              <div className="step-title">{stepInfo.title}</div>
              <div className="step-description">{stepInfo.description}</div>
            </div>
            {index < steps.length - 1 && (
              <div className={`step-line ${step > stepInfo.number ? 'completed' : ''}`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="wizard-form-content">
        {step === 1 && <Form1 formData={formData} handleChange={handleChange} />}
        {step === 2 && <Form2 formData={formData} handleChange={handleChange} />}
        {step === 3 && <Form3 formData={formData} handleChange={handleChange} />}
      </div>

      <div className="wizard-buttons">
        {step > 1 && (
          <button className="wizard-btn wizard-btn-prev" onClick={prevStep}>
            Previous
          </button>
        )}
        {step < 3 && (
          <button 
            className="wizard-btn wizard-btn-next" 
            onClick={nextStep}
            disabled={!validateCurrentStep()}
          >
            Next
          </button>
        )}
        {step === 3 && (
          <button 
            className="wizard-btn wizard-btn-submit" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>

      <LoadingPopup isVisible={isLoading} />
    </div>
  );
};

export default WizardForm;
