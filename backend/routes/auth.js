const express = require('express');
const { supabase, supabaseAdmin } = require('../db');

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
            },
            session: data.session,
            token: data.session?.access_token,
            refreshToken: data.session?.refresh_token
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

        console.log('Login successful, session data:', {
            hasSession: !!data.session,
            hasAccessToken: !!data.session?.access_token,
            hasRefreshToken: !!data.session?.refresh_token,
            accessTokenPreview: data.session?.access_token?.substring(0, 20) + '...',
            refreshTokenPreview: data.session?.refresh_token?.substring(0, 20) + '...',
            refreshTokenLength: data.session?.refresh_token?.length,
            refreshTokenType: typeof data.session?.refresh_token
        });

        res.json({
            message: 'Login successful',
            user: {
                id: data.user.id,
                email: data.user.email,
                fullName: data.user.user_metadata?.full_name
            },
            session: data.session,
            token: data.session.access_token,
            refreshToken: data.session.refresh_token
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

// Test endpoint to verify backend is working
router.get('/test', (req, res) => {
    console.log('Test endpoint hit!');
    res.json({ message: 'Backend is working!' });
});

// Refresh token endpoint
router.post('/refresh', async (req, res) => {
    console.log('=== REFRESH ENDPOINT HIT ===');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    
    try {
        // Extract token from Authorization header
        const authHeader = req.headers['authorization'];
        const refreshToken = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        console.log('Refresh endpoint called with token:', refreshToken ? refreshToken.substring(0, 20) + '...' : 'None');
        console.log('Refresh token length:', refreshToken?.length);
        console.log('Refresh token type:', typeof refreshToken);

        if (!refreshToken) {
            return res.status(401).json({ error: 'Refresh token required' });
        }

        // Try different approaches to refresh the session
        console.log('Attempting refresh with token:', refreshToken.substring(0, 20) + '...');
        
        // Method 1: Try with refreshSession object
        let { data, error } = await supabase.auth.refreshSession({
            refresh_token: refreshToken
        });

        console.log('Method 1 - refreshSession response:', { data, error });

        // If that fails, try Method 2: Set session first then refresh
        if (error) {
            console.log('Method 1 failed, trying Method 2...');
            supabase.auth.setSession({
                access_token: '', // Empty access token
                refresh_token: refreshToken
            });
            
            const refreshResult = await supabase.auth.refreshSession();
            data = refreshResult.data;
            error = refreshResult.error;
            
            console.log('Method 2 - setSession + refreshSession response:', { data, error });
        }

        // If still failing, try Method 3: Direct API call
        if (error) {
            console.log('Method 2 failed, trying Method 3...');
            const response = await fetch(`${process.env.SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': process.env.SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${refreshToken}`
                },
                body: JSON.stringify({
                    refresh_token: refreshToken
                })
            });
            
            const apiData = await response.json();
            console.log('Method 3 - Direct API response:', apiData);
            
            if (response.ok && apiData.access_token) {
                data = {
                    session: {
                        access_token: apiData.access_token,
                        refresh_token: apiData.refresh_token,
                        expires_in: apiData.expires_in,
                        token_type: apiData.token_type
                    },
                    user: apiData.user
                };
                error = null;
            } else {
                error = { message: apiData.error_description || 'API refresh failed' };
            }
        }

        if (error) {
            console.error('Token refresh error:', error);
            return res.status(401).json({ error: error.message || 'Invalid or expired refresh token' });
        }

        if (!data.session) {
            console.error('No session in refresh response');
            return res.status(401).json({ error: 'No session returned from refresh' });
        }

        res.json({
            message: 'Token refreshed successfully',
            user: {
                id: data.user.id,
                email: data.user.email,
                fullName: data.user.user_metadata?.full_name
            },
            session: data.session 
        });

    } catch (error) {
        console.error('Token refresh error:', error);
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