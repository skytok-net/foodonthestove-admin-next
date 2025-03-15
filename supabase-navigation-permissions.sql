-- Grant anonymous access to navigation tables
-- This script should be run in the Supabase SQL editor

-- Enable row level security on the navigation table
ALTER TABLE navigation ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anonymous users to read navigation data
CREATE POLICY "Allow anonymous read access to navigation" 
ON navigation
FOR SELECT 
TO anon
USING (true);

-- Enable row level security on the navigation_items table
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anonymous users to read navigation items
CREATE POLICY "Allow anonymous read access to navigation items" 
ON navigation_items
FOR SELECT 
TO anon
USING (true);

-- If you have a junction table for navigation items relationships, add permissions for that too
-- Uncomment and modify as needed
-- ALTER TABLE navigation_item_relationships ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow anonymous read access to navigation item relationships" 
-- ON navigation_item_relationships
-- FOR SELECT 
-- TO anon
-- USING (true);

-- Grant usage on the schema to anonymous users if needed
GRANT USAGE ON SCHEMA public TO anon;

-- Grant select permissions on the tables
GRANT SELECT ON navigation TO anon;
GRANT SELECT ON navigation_items TO anon;
-- GRANT SELECT ON navigation_item_relationships TO anon; -- Uncomment if needed
