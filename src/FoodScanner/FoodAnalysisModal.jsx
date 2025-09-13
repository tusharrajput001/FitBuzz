import React from 'react';
import './FoodAnalysisModal.css';
import { FaTimes, FaUtensils, FaFire, FaWeight, FaEye } from 'react-icons/fa';

const FoodAnalysisModal = ({ isOpen, onClose, analysisData, imagePreview }) => {
  if (!isOpen || !analysisData) return null;

  const { items, totalCalories } = analysisData;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title">
            <FaUtensils className="title-icon" />
            <h2>Food Analysis Results</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="image-preview-section">
            <img src={imagePreview} alt="Analyzed food" className="modal-image" />
          </div>
        )}

        {/* Total Calories Summary */}
        <div className="total-calories-card">
          <div className="calories-icon">
            <FaFire />
          </div>
          <div className="calories-info">
            <span className="calories-label">Total Calories</span>
            <span className="calories-value">{totalCalories}</span>
          </div>
        </div>

        {/* Food Items List */}
        <div className="food-items-section">
          <h3 className="section-title">
            <FaEye className="section-icon" />
            Detected Food Items
          </h3>
          
          <div className="food-items-list">
            {items.map((item, index) => (
              <div key={index} className="food-item-card">
                <div className="food-item-header">
                  <h4 className="food-name">{item.name}</h4>
                  <span className="food-calories">{item.estimatedCalories} cal</span>
                </div>
                <div className="food-portion">
                  <FaWeight className="portion-icon" />
                  <span className="portion-text">{item.portionSize}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="close-modal-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodAnalysisModal;
