import React, { useState } from "react";
import Form1 from "./Form 1/Form1";
import Form2 from "./Form 2/Form2";
import Form3 from "./Form 3/Form3";
import "./WizardForm.css";

const WizardForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal:"",
    diet_preference:"",
    workout: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    alert("Form submitted: " + JSON.stringify(formData));
  };

  return (
    <div className="wizard-form-container">
      <div className="wizard-header">
        <h1 className="wizard-title">Personalize Your Experience</h1>
        <p className="wizard-subtitle">Let's get to know you better</p>
      </div>
      
      <div className="step-indicator">
        <div className={`step-dot ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}></div>
        <div className={`step-dot ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}></div>
        <div className={`step-dot ${step >= 3 ? 'active' : ''}`}></div>
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
          <button className="wizard-btn wizard-btn-next" onClick={nextStep}>
            Next
          </button>
        )}
        {step === 3 && (
          <button className="wizard-btn wizard-btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default WizardForm;
