import React from 'react';
import './Form2.css';

const Form2 = ({ formData, handleChange }) => {
  return (
    <div className="form2-container">
      <div className="form-field">
        <h2>Height</h2>
        <input
          type="number"
          name="height"
          placeholder="Enter height in cm"
          value={formData.height}
          onChange={handleChange}
          min="100"
          max="250"
          required
        />
      </div>
      <div className="form-field">
        <h2>Weight</h2>
        <input
          type="number"
          name="weight"
          placeholder="Enter weight in kg"
          value={formData.weight}
          onChange={handleChange}
          min="30"
          max="300"
          step="0.1"
          required
        />
      </div>
    </div>
  );
};

export default Form2;
