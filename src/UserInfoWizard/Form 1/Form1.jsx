import React from "react";
import "./Form1.css";

const Form1 = ({ formData, handleChange }) => {
  return (
    <div className="form1-container">
      <div className="form-field">
        <h2>Name <span className="required">*</span></h2>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
          className={formData.name ? "filled" : ""}
        />
      </div>
      <div className="form-field">
        <h2>Age <span className="required">*</span></h2>
        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          value={formData.age}
          onChange={handleChange}
          min="13"
          max="100"
          required
          className={formData.age ? "filled" : ""}
        />
      </div>
      <div className="form-field">
        <h2>Gender <span className="required">*</span></h2>
        <select 
          name="gender" 
          value={formData.gender} 
          onChange={handleChange} 
          required
          className={formData.gender ? "filled" : ""}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
    </div>
  );
};

export default Form1;
