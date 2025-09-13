import React, { useState } from 'react';
import './FoodScanner.css';
import { FaCamera, FaUpload, FaSpinner } from 'react-icons/fa';
import foodAnalysisService from '../services/foodAnalysis/foodAnalysisService';
import FoodAnalysisModal from './FoodAnalysisModal';

const FoodScanner = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate the file
      const validation = foodAnalysisService.validateImageFile(file);
      if (!validation.isValid) {
        setError(validation.error);
        return;
      }

      // Clear any previous errors
      setError(null);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setSelectedFile(file);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Call the real API
      const result = await foodAnalysisService.analyzeFoodImage(selectedFile);
      
      setAnalysisResult(result);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      setError(error.message);
    } finally {
      setIsAnalyzing(false);
    }
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

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
        </div>

      </div>

      {/* Analysis Results Modal */}
      <FoodAnalysisModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        analysisData={analysisResult}
        imagePreview={selectedImage}
      />
    </div>
  );
};

export default FoodScanner;
