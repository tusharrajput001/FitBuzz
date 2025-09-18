const express = require('express');
const cors = require('cors');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const plansRoutes = require('./routes/plans');
const authenticateToken = require('./middleware/auth');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/plans', plansRoutes);

// Protected route 
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ 
        message: 'This is a protected route!',
        user: req.user 
    });
});




// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Fitbuzz Backend is running!' });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});