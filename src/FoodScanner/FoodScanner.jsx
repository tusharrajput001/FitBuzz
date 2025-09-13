import React, { useState } from 'react';
import './FoodScanner.css';
import { FaCamera, FaUpload, FaSpinner } from 'react-icons/fa';

const FoodScanner = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call for food analysis
    setTimeout(() => {
      setAnalysisResult({
        foodName: "Grilled Chicken Breast",
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        confidence: 92
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="food-scanner">
      <div className="scanner-header">
        <h1>Food Scanner</h1>
        <p>Upload an image of your food to get instant calorie information</p>
      </div>

      <div className="scanner-content">
        <div className="upload-section">
          <div className="upload-area">
            {selectedImage ? (
              <div className="image-preview">
                <img src={selectedImage} alt="Selected food" />
                <button 
                  className="change-image-btn"
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  <FaCamera /> Change Image
                </button>
              </div>
            ) : (
              <div className="upload-placeholder">
                <FaUpload className="upload-icon" />
                <h3>Upload Food Image</h3>
                <p>Click to select an image or drag and drop</p>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <button 
                  className="upload-btn"
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  <FaCamera /> Choose Image
                </button>
              </div>
            )}
          </div>

          {selectedImage && (
            <button 
              className="analyze-btn"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <FaSpinner className="spinning" /> Analyzing...
                </>
              ) : (
                <>
                  <FaCamera /> Analyze Food
                </>
              )}
            </button>
          )}
        </div>

        {analysisResult && (
          <div className="analysis-result">
            <h2>Analysis Results</h2>
            <div className="result-card">
              <div className="food-info">
                <h3>{analysisResult.foodName}</h3>
                <span className="confidence">Confidence: {analysisResult.confidence}%</span>
              </div>
              
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <span className="nutrition-label">Calories</span>
                  <span className="nutrition-value">{analysisResult.calories}</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Protein</span>
                  <span className="nutrition-value">{analysisResult.protein}g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Carbs</span>
                  <span className="nutrition-value">{analysisResult.carbs}g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Fat</span>
                  <span className="nutrition-value">{analysisResult.fat}g</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodScanner;
