import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';
import authService from '../../services/auth/authService';
import apiService from '../../services/api/apiService';
import './TokenRefreshTest.css';

const TokenRefreshTest = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addTestResult = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setTestResults(prev => [...prev, { message, type, timestamp }]);
  };

  const testTokenRefresh = async () => {
    if (!isAuthenticated) {
      addTestResult('Please login first to test token refresh', 'error');
      return;
    }

    setIsLoading(true);
    addTestResult('Starting token refresh test...', 'info');

    try {
      // Test 1: Manual token refresh
      addTestResult('Test 1: Manual token refresh', 'info');
      await authService.refreshToken();
      addTestResult('✅ Manual token refresh successful', 'success');

      // Test 2: API call that might trigger automatic refresh
      addTestResult('Test 2: API call to protected endpoint', 'info');
      const response = await apiService.get('/api/auth/me');
      addTestResult(`✅ API call successful: ${response.user?.email}`, 'success');

      // Test 3: Multiple concurrent requests
      addTestResult('Test 3: Multiple concurrent requests', 'info');
      const promises = [
        apiService.get('/api/auth/me'),
        apiService.get('/api/auth/me'),
        apiService.get('/api/auth/me')
      ];
      await Promise.all(promises);
      addTestResult('✅ All concurrent requests successful', 'success');

      addTestResult('🎉 All tests passed! Token refresh is working correctly.', 'success');

    } catch (error) {
      addTestResult(`❌ Test failed: ${error.message}`, 'error');
      console.error('Token refresh test failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const getTokenInfo = () => {
    const token = authService.getToken();
    const refreshToken = authService.getRefreshToken();
    
    console.log('Current token:', token ? token.substring(0, 20) + '...' : 'None', 'Length:', token?.length);
    console.log('Current refresh token:', refreshToken ? refreshToken.substring(0, 20) + '...' : 'None', 'Length:', refreshToken?.length);
    
    // Debug localStorage directly
    console.log('localStorage token:', localStorage.getItem('token')?.substring(0, 20) + '...', 'Length:', localStorage.getItem('token')?.length);
    console.log('localStorage refreshToken:', localStorage.getItem('refreshToken')?.substring(0, 20) + '...', 'Length:', localStorage.getItem('refreshToken')?.length);
    
    if (!token) return 'No token found';
    
    try {
      // Decode JWT token to get expiration info
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = new Date(payload.exp * 1000);
      const now = new Date();
      const timeLeft = Math.max(0, Math.floor((exp - now) / 1000 / 60)); // minutes
      
      return {
        expiresAt: exp.toLocaleString(),
        timeLeft: `${timeLeft} minutes`,
        hasRefreshToken: !!refreshToken
      };
    } catch (error) {
      return 'Invalid token format';
    }
  };

  const tokenInfo = getTokenInfo();

  return (
    <div className="token-refresh-test">
      <h2>Token Refresh Test</h2>
      
      {isAuthenticated ? (
        <div className="auth-info">
          <h3>Authentication Status</h3>
          <p><strong>User:</strong> {user?.email}</p>
          <p><strong>Token Expires:</strong> {typeof tokenInfo === 'object' ? tokenInfo.expiresAt : tokenInfo}</p>
          <p><strong>Time Left:</strong> {typeof tokenInfo === 'object' ? tokenInfo.timeLeft : 'Unknown'}</p>
          <p><strong>Has Refresh Token:</strong> {typeof tokenInfo === 'object' ? (tokenInfo.hasRefreshToken ? 'Yes' : 'No') : 'Unknown'}</p>
        </div>
      ) : (
        <div className="not-authenticated">
          <p>Please login to test token refresh functionality</p>
        </div>
      )}

      <div className="test-controls">
        <button 
          onClick={testTokenRefresh} 
          disabled={!isAuthenticated || isLoading}
          className="test-button"
        >
          {isLoading ? 'Testing...' : 'Run Token Refresh Test'}
        </button>
        
        <button 
          onClick={clearResults} 
          className="clear-button"
        >
          Clear Results
        </button>

        {isAuthenticated && (
          <button 
            onClick={logout} 
            className="logout-button"
          >
            Logout
          </button>
        )}
      </div>

      <div className="test-results">
        <h3>Test Results</h3>
        {testResults.length === 0 ? (
          <p>No test results yet. Click "Run Token Refresh Test" to start.</p>
        ) : (
          <div className="results-list">
            {testResults.map((result, index) => (
              <div key={index} className={`result-item ${result.type}`}>
                <span className="timestamp">[{result.timestamp}]</span>
                <span className="message">{result.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenRefreshTest;
