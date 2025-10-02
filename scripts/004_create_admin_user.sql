-- Create admin user account
-- This script creates the admin user with email: thossam099@gmail.com
-- Password: Talal6500a
-- 
-- Note: This uses Supabase's auth.users table
-- The password will be hashed automatically by Supabase

-- Insert admin user into auth.users
-- You need to run this from Supabase SQL Editor or use Supabase Auth API
-- This is a reference script - actual user creation should be done via Supabase Dashboard or Auth API

-- To create the user, go to Supabase Dashboard > Authentication > Users > Add User
-- Email: thossam099@gmail.com
-- Password: Talal6500a
-- Auto Confirm User: Yes

-- Alternatively, you can use the sign-up page at /admin/signup (if created)
-- or use this SQL to manually insert (not recommended for production):

/*
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'thossam099@gmail.com',
  crypt('Talal6500a', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  '',
  '',
  ''
);
*/

-- For now, please create the user manually via Supabase Dashboard:
-- 1. Go to your Supabase project dashboard
-- 2. Click on "Authentication" in the left sidebar
-- 3. Click on "Users" tab
-- 4. Click "Add user" button
-- 5. Enter email: thossam099@gmail.com
-- 6. Enter password: Talal6500a
-- 7. Check "Auto Confirm User"
-- 8. Click "Create user"
