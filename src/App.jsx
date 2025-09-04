import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./Home/HomePage";
import SignIn from "./SignIn/SignIn";
import Signup from "./Signup/Signup";
import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile/Profile";
import WizardForm from "./UserInfoWizard/WizardForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/wizard" 
              element={
                <ProtectedRoute>
                  <WizardForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-workout" 
              element={
                <ProtectedRoute>
                  <div className="page-container">
                    <h1>My Workout</h1>
                    <p>This is the My Workout page. Add your workout content here.</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-food" 
              element={
                <ProtectedRoute>
                  <div className="page-container">
                    <h1>My Food</h1>
                    <p>This is the My Food page. Add your food tracking content here.</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/log-food" 
              element={
                <ProtectedRoute>
                  <div className="page-container">
                    <h1>Log Food</h1>
                    <p>This is the Log Food page. Add your food logging form here.</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/log-workout" 
              element={
                <ProtectedRoute>
                  <div className="page-container">
                    <h1>Log Workout</h1>
                    <p>This is the Log Workout page. Add your workout logging form here.</p>
                  </div>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
