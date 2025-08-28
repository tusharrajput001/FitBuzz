-- CREATE TABLE users (
--     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--     email VARCHAR UNIQUE NOT NULL,
--     password_hash VARCHAR NOT NULL,
--     full_name VARCHAR,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- Enable Row Level Security
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- -- Create policy for users to read their own data
-- CREATE POLICY "Users can view own data" ON users
--     FOR SELECT USING (auth.uid() = id);