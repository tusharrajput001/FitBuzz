const express = require('express');
const supabase = require('../db');

const router = express.Router();

// Helper function to sync user to custom users table
async function syncUserToCustomTable(userData) {
    try {
        const { data, error } = await supabase
            .from('users')
            .upsert({
                id: userData.id,
                email: userData.email,
                full_name: userData.user_metadata?.full_name || userData.email,
                password_hash: 'synced_from_auth', // Placeholder since we don't store actual passwords
                created_at: userData.created_at,
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'id',
                ignoreDuplicates: false
            });

        if (error) {
            console.error('Error syncing user to custom table:', error);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error in syncUserToCustomTable:', error);
        return false;
    }
}

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

        // Auto-sync user to custom users table
        if (data.user) {
            const syncSuccess = await syncUserToCustomTable(data.user);
            if (!syncSuccess) {
                console.warn('Warning: Failed to sync user to custom table, but auth signup succeeded');
            }
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

        // Auto-sync user to custom users table (in case they were created before this sync was implemented)
        if (data.user) {
            const syncSuccess = await syncUserToCustomTable(data.user);
            if (!syncSuccess) {
                console.warn('Warning: Failed to sync user to custom table, but login succeeded');
            }
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
        // Extract token from Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ error: 'Access token required' });
        }

        // Set the auth token for this request
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
        // Extract token from Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ error: 'Access token required' });
        }

        // Get user with the provided token
        const { data: { user }, error } = await supabase.auth.getUser(token);
        
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