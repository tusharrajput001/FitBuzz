const express = require('express');
const supabase = require('../db');

const router = express.Router();

// Signup endpoint using Supabase Auth
router.post('/signup', async (req, res) => {
    try {
        const { email, password, fullName } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Use Supabase Auth for signup
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        });

        if (error) {
            console.error('Signup error:', error);
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({
            message: 'User created successfully. Please check your email for verification.',
            user: {
                id: data.user.id,
                email: data.user.email,
                fullName: data.user.user_metadata?.full_name
            }
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login endpoint using Supabase Auth
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Use Supabase Auth for login
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error('Login error:', error);
            return res.status(401).json({ error: error.message });
        }

        res.json({
            message: 'Login successful',
            user: {
                id: data.user.id,
                email: data.user.email,
                fullName: data.user.user_metadata?.full_name
            },
            session: data.session
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Logout endpoint
router.post('/logout', async (req, res) => {
    try {
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get current user
router.get('/me', async (req, res) => {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        res.json({
            user: {
                id: user.id,
                email: user.email,
                fullName: user.user_metadata?.full_name
            }
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;