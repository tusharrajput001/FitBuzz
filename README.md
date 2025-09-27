# 🏋️‍♂️ FitBuzz - AI-Powered Fitness Platform

> Transform your fitness journey with personalized AI-driven workout plans and nutrition guidance.

![FitBuzz Preview](https://img.shields.io/badge/FitBuzz-AI%20Fitness-blue?style=for-the-badge&logo=react)

## 🌟 Features

### 🤖 AI-Powered Personalization
- **Smart Workout Plans**: Get customized exercise routines based on your goals, fitness level, and preferences
- **Personalized Nutrition**: Receive tailored meal plans with accurate calorie and macro calculations
- **AI Food Scanner**: Simply take a photo of your food to get instant nutritional information
- **Progress Tracking**: Monitor your fitness journey with detailed analytics and insights

### 🎯 Goal-Oriented Approach
- **Build Muscle**: Strength training programs designed for muscle growth
- **Lose Weight**: Cardio and diet plans for effective weight loss
- **Improve Endurance**: Training routines to boost stamina and cardiovascular health
- **Stay Healthy**: Balanced wellness programs for overall fitness

### 🚀 User Experience
- **Quick Setup**: Answer a few simple questions and get your plan in minutes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Intuitive Interface**: Clean, modern UI with smooth animations
- **Real-time Updates**: Your plans evolve with your progress

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern UI library with latest features
- **Vite 7.1.2** - Lightning-fast build tool and dev server
- **React Router DOM 7.8.2** - Client-side routing
- **Axios 1.11.0** - HTTP client for API requests
- **React Icons 5.5.0** - Comprehensive icon library
- **React Toastify 11.0.5** - Beautiful toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js 5.1.0** - Web application framework
- **Supabase** - Backend-as-a-Service for authentication and database
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 17.2.1** - Environment variable management

### Development Tools
- **ESLint 9.33.0** - Code linting and formatting
- **Nodemon 3.1.10** - Development server auto-restart
- **Lottie React 0.17.0** - Beautiful animations

## 📱 Screenshots

### Homepage
- Modern landing page with AI fitness wizard
- Interactive phone mockups showcasing app features
- Responsive design for all device sizes

### AI Wizard
- Step-by-step questionnaire for personalized plans
- Beautiful UI with smooth transitions
- Real-time plan generation

### Dashboard
- Comprehensive fitness tracking
- Progress visualization
- Goal monitoring

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Supabase account for backend services

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fitbuzz.git
   cd fitbuzz
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment Setup**
   ```bash
   # Create .env file in backend directory
   cd backend
   cp .env.example .env
   # Add your Supabase credentials to .env
   ```

5. **Start the development servers**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## 📁 Project Structure

```
fitbuzz/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── LoadingPopup/
│   │   ├── ProtectedRoute/
│   │   └── TokenRefreshTest/
│   ├── services/          # API and business logic
│   │   ├── api/
│   │   ├── auth/
│   │   ├── foodAnalysis/
│   │   └── workoutDiet/
│   ├── AuthContext/       # Authentication context
│   ├── Dashboard/         # User dashboard
│   ├── FoodScanner/       # AI food scanning feature
│   ├── Home/             # Landing page
│   ├── Layout/           # App layout components
│   ├── Navbar/           # Navigation bar
│   ├── Profile/          # User profile management
│   ├── Sidebar/          # Side navigation
│   ├── SignIn/           # Authentication pages
│   ├── Signup/
│   └── UserInfoWizard/   # Onboarding flow
├── backend/              # Express.js backend
│   ├── middleware/       # Custom middleware
│   ├── routes/          # API routes
│   ├── db.js            # Database configuration
│   └── server.js        # Server entry point
└── README.md
```

## 🔧 Available Scripts

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Scripts
```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: #00a2ff
- **Secondary Blue**: #4fc3f7
- **Dark Background**: #0a0a0a, #1a1a2e, #16213e
- **Text**: #ffffff, rgba(255, 255, 255, 0.9)

### Typography
- **Headings**: Clamp-based responsive scaling
- **Body Text**: Optimized for readability across devices
- **Font Weights**: 400, 500, 600, 700

### Responsive Breakpoints
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: 360px - 479px

## 🔐 Authentication

The app uses Supabase for authentication with:
- Email/password signup and login
- Protected routes
- Token refresh handling
- User session management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the lightning-fast build tool
- Supabase for the backend infrastructure
- All contributors and testers

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Built with ❤️ by the FitBuzz Team**

*Transform your fitness journey with AI today!*