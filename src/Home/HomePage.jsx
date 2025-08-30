import React from "react";
import './HomePage.css'

const HomePage = () => {
    const handleGetStarted = () => {
        // TODO: Navigate to the AI wizard page
        console.log("Navigate to AI wizard");
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