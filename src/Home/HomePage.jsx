import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth/authService";
import './HomePage.css'

const HomePage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if (authService.isAuthenticated()) {
            // User is logged in, navigate to wizard page
            console.log("Navigate to AI wizard");
            navigate('/wizard');
        } else {
            // User is not logged in, navigate to signin page
            console.log("Navigate to signin page");
            navigate('/signin');
        }
    };

    return(
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background">
                    <div className="gradient-overlay"></div>
                    <div className="floating-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                    </div>
                </div>
                
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Transform Your Fitness Journey
                            <span className="highlight"> with AI</span>
                        </h1>
                        <p className="hero-subtitle">
                            Get personalized workout plans and nutrition guidance powered by artificial intelligence. 
                            Answer a few questions and let our AI create your perfect fitness roadmap.
                        </p>
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">10K+</span>
                                <span className="stat-label">Active Users</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">95%</span>
                                <span className="stat-label">Success Rate</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">24/7</span>
                                <span className="stat-label">AI Support</span>
                            </div>
                        </div>
                        <button className="cta-button" onClick={handleGetStarted}>
                            <span>Start Your AI Fitness Journey</span>
                            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div className="hero-visual">
                        <div className="phone-mockup">
                            <div className="phone-screen">
                                <div className="app-preview">
                                    <div className="preview-header">
                                        <div className="preview-dots">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                    <div className="preview-content">
                                        <div className="preview-card">
                                            <div className="preview-icon">💪</div>
                                            <div className="preview-text">
                                                <h4>AI Workout Plan</h4>
                                                <p>Personalized for you</p>
                                            </div>
                                        </div>
                                        <div className="preview-card">
                                            <div className="preview-icon">🥗</div>
                                            <div className="preview-text">
                                                <h4>Smart Nutrition</h4>
                                                <p>Tailored diet plan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Wizard Section */}
            <section className="ai-wizard-section">
                <div className="container">
                    <h2 className="section-title">AI-Powered Fitness Wizard</h2>
                    <p className="section-subtitle">Answer simple questions and get your personalized fitness plan in minutes</p>
                    
                    <div className="wizard-showcase">
                        <div className="wizard-content">
                            <h3>Your Personal AI Fitness Coach</h3>
                            <p>Our advanced AI analyzes your goals, fitness level, preferences, and lifestyle to create a comprehensive plan that works for you.</p>
                            
                            <div className="wizard-steps">
                                <div className="wizard-step">
                                    <div className="step-number">1</div>
                                    <div className="step-content">
                                        <h4>Answer Questions</h4>
                                        <p>Tell us about your goals, current fitness level, and preferences</p>
                                    </div>
                                </div>
                                <div className="wizard-step">
                                    <div className="step-number">2</div>
                                    <div className="step-content">
                                        <h4>AI Analysis</h4>
                                        <p>Our AI processes your answers and creates personalized recommendations</p>
                                    </div>
                                </div>
                                <div className="wizard-step">
                                    <div className="step-number">3</div>
                                    <div className="step-content">
                                        <h4>Get Your Plan</h4>
                                        <p>Receive your customized workout and nutrition plan instantly</p>
                                    </div>
                                </div>
                            </div>
                            
                            <button className="wizard-cta-button" onClick={handleGetStarted}>
                                Start AI Wizard Now
                            </button>
                        </div>
                        
                        <div className="wizard-visual">
                            <div className="wizard-mockup">
                                <div className="wizard-screen">
                                    <div className="question-demo">
                                        <div className="question-header">
                                            <div className="ai-avatar">🤖</div>
                                            <div className="question-text">What's your primary fitness goal?</div>
                                        </div>
                                        <div className="answer-options">
                                            <div className="option">💪 Build Muscle</div>
                                            <div className="option active">⚖️ Lose Weight</div>
                                            <div className="option">🏃‍♂️ Improve Endurance</div>
                                            <div className="option">🧘‍♀️ Stay Healthy</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Why Choose FitBuzz AI?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🤖</div>
                            <h3>AI-Powered Personalization</h3>
                            <p>Our advanced AI analyzes your goals, fitness level, and preferences to create truly personalized plans.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Quick & Easy Setup</h3>
                            <p>Answer a few simple questions and get your customized workout and nutrition plan in minutes.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Progress Tracking</h3>
                            <p>Monitor your fitness journey with detailed analytics and progress reports.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3>Goal-Oriented Plans</h3>
                            <p>Whether you want to lose weight, build muscle, or improve endurance, we've got you covered.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔄</div>
                            <h3>Adaptive Updates</h3>
                            <p>Your plans evolve with your progress, ensuring continuous improvement and motivation.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🏆</div>
                            <h3>Proven Results</h3>
                            <p>Join thousands of users who have achieved their fitness goals with our AI-powered approach.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Features Showcase Section */}
            <section className="ai-showcase-section">
                <div className="container">
                    <h2 className="section-title">Advanced AI Features</h2>
                    <p className="section-subtitle">Experience the future of fitness with cutting-edge AI technology</p>
                    
                    <div className="ai-features-grid">
                        <div className="ai-feature-card">
                            <div className="ai-feature-visual">
                                <div className="food-scan-demo">
                                    <div className="camera-icon">📸</div>
                                    <div className="food-image">🍎</div>
                                    <div className="calorie-result">120 calories</div>
                                </div>
                            </div>
                            <div className="ai-feature-content">
                                <h3>AI Food Scanner</h3>
                                <p>Simply take a photo of your food and get instant calorie and nutrition information. Our AI recognizes thousands of foods and provides accurate nutritional data.</p>
                                <ul className="feature-list">
                                    <li>Instant calorie counting</li>
                                    <li>Nutritional breakdown</li>
                                    <li>Portion size detection</li>
                                    <li>Meal suggestions</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="ai-feature-card">
                            <div className="ai-feature-visual">
                                <div className="dashboard-demo">
                                    <div className="chart-container">
                                        <div className="chart-bar" style={{height: '80px'}}></div>
                                        <div className="chart-bar" style={{height: '120px'}}></div>
                                        <div className="chart-bar" style={{height: '60px'}}></div>
                                        <div className="chart-bar" style={{height: '100px'}}></div>
                                        <div className="chart-bar" style={{height: '90px'}}></div>
                                        <div className="chart-bar" style={{height: '140px'}}></div>
                                        <div className="chart-bar" style={{height: '70px'}}></div>
                                    </div>
                                    <div className="progress-ring">
                                        <div className="ring-progress">75%</div>
                                    </div>
                                </div>
                            </div>
                            <div className="ai-feature-content">
                                <h3>Smart Dashboard</h3>
                                <p>Visualize your progress with interactive charts and analytics. Track your workouts, nutrition, and overall fitness journey with beautiful, easy-to-understand graphs.</p>
                                <ul className="feature-list">
                                    <li>Progress charts</li>
                                    <li>Goal tracking</li>
                                    <li>Performance analytics</li>
                                    <li>Trend analysis</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="ai-feature-card">
                            <div className="ai-feature-visual">
                                <div className="logging-demo">
                                    <div className="log-entry">
                                        <div className="log-icon">💪</div>
                                        <div className="log-text">Bench Press: 3x8 @ 135lbs</div>
                                    </div>
                                    <div className="log-entry">
                                        <div className="log-icon">🥗</div>
                                        <div className="log-text">Grilled Chicken Salad: 450 cal</div>
                                    </div>
                                    <div className="log-entry">
                                        <div className="log-icon">📏</div>
                                        <div className="log-text">Weight: 165lbs (-2lbs this week)</div>
                                    </div>
                                </div>
                            </div>
                            <div className="ai-feature-content">
                                <h3>Smart Logging</h3>
                                <p>Easily log your workouts and meals with AI assistance. Our smart logging system learns your patterns and provides intelligent suggestions.</p>
                                <ul className="feature-list">
                                    <li>Workout logging</li>
                                    <li>Food diary</li>
                                    <li>Progress tracking</li>
                                    <li>AI suggestions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Transform Your Fitness?</h2>
                        <p>Join thousands of users who have already started their AI-powered fitness journey</p>
                        <button className="cta-button-secondary" onClick={handleGetStarted}>
                            Get Started Now - It's Free!
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage;